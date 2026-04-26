# Astro as a pre-renderer for TanStack Router React application

This project demonstrates how to use [Astro](https://astro.build/) to pre-render a React web application that uses [TanStack Router](https://tanstack.com/router/latest) for client-side routing. In essence, Astro acts as the server-side of [TanStack Start](https://tanstack.com/start/latest).

I arrived at this Astro + TanStack Router hybrid approach while looking for a way to pre-render a React SPA that uses client-side routing. At the time of writing, I wasn’t ready to jump into TanStack Start due to its beta status. For most of my use cases, an SPA is sufficient—I just needed a way to generate the initial HTML payload for better initial load performance.

Astro’s [Islands architecture](https://docs.astro.build/en/concepts/islands/) makes it easy to pre-render simple React apps. However, once you introduce a client-side router, hydration becomes tricky. The router must handle its own internal data hand-off from server to client, which doesn’t work well with Astro’s default React hydration. (This may be specific to TanStack Router—I haven’t tested [React Router](https://reactrouter.com/) with Astro.)

---

### update (2026-04-26)

Tanstack router's [renderRouterToString](https://github.com/TanStack/router/blob/e085a0a6bdfe9aaf570f7df81b83f1941c0d86f7/packages/react-router/src/ssr/renderRouterToString.tsx#L5) seemed to have gone through a significant structural change, and so now we also need to add [\<Scripts /\>](https://tanstack.com/router/latest/docs/guide/document-head-management#scripts-) "as high up in the component tree as possible". So I placed it in `__root.tsx`. Make sure to include `<Script />` in your component tree otherwise the hydration would not work!

#### packages/react/src/routes/\_\_root.tsx

```diff
import { createRootRoute, Link, Outlet, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useAppContext } from "../AppContext";

export const Route = createRootRoute({
  component: RouteComponent,
});

function RouteComponent() {
  const { title, description } = useAppContext();
  return (
    <>
      <div className="p-4 bg-emerald-200">TanStack Router Root</div>
      <div className="p-4 bg-sky-200">
        <div>Title and description from Astro through React Context!</div>
        <h2 className="text-xl font-semibold mt-4">{title}</h2>
        <p className="text-gray-500">{description}</p>
      </div>
      <div className="p-4 bg-amber-200 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <div className="p-4 space-y-4 bg-zinc-100">
        <p>{`👆 when you interact with the <Link>s above, you're client-side navigating with TanStack Router! (snappy and fast ⚡️)`}</p>
        <p>{`🔁 when you click the browser refresh button (i.e., requesting the page to the server), Astro's pre-rendered html will be sent! (and then TanStack Router app will be hydrated)`}</p>
      </div>
      <hr />
      <Outlet />
++    <Scripts />
      <TanStackRouterDevtools />
    </>
  );
}

```

---

To make TanStack Router behave correctly on hydration, I needed to replicate its server-side logic inside an Astro component. Fortunately, TanStack provides a working example for [SSR with file-based routing](https://tanstack.com/router/latest/docs/framework/react/examples/basic-ssr-file-based). The Astro component that generates the initial HTML in this project—[`StartReactApp.astro`](https://github.com/sookmax/astro-tanstack-router/blob/main/packages/astro/src/components/StartReactApp.astro)—essentially mimics the behavior of `entry-server.tsx` in that example.

### entry-server.tsx

```tsx
// https://tanstack.com/router/latest/docs/framework/react/examples/basic-ssr-file-based?path=examples%2Freact%2Fbasic-ssr-file-based%2Fsrc%2Fentry-server.tsx

...

// Create a request handler
const handler = createRequestHandler({
  request,
  createRouter: () => {
    const router = createRouter();

    // Update each router instance with the head info from vite
    router.update({
      context: {
        ...router.options.context,
        head: head,
      },
    });
    return router;
  },
});

// Let's use the default stream handler to create the response
const response = await handler(({ responseHeaders, router }) =>
  renderRouterToString({
    responseHeaders,
    router,
    children: <RouterServer router={router} />,
  }),
);

...
```

### Equivalent in Astro: StartReactApp.astro

```tsx
---
import {
  createRequestHandler,
  RouterServer,
} from "@tanstack/react-router/ssr/server";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { createRouter, AppContext, StartClientApp } from "@package/react";

const appContext: AppContext = {
  title: "Astro as a pre-renderer for TanStack Router",
  description: "A TanStack Router app running in Astro",
};

// https://tanstack.com/router/latest/docs/framework/react/examples/basic-ssr-file-based
// Create a request handler
const handler = createRequestHandler({
  request: Astro.request,
  createRouter,
});

let appHtml = "";
let injectedHtml = "";

// https://github.com/TanStack/router/blob/e085a0a6bdfe9aaf570f7df81b83f1941c0d86f7/packages/react-router/src/ssr/renderRouterToString.tsx#L5
await handler(async ({ router }) => {
  appHtml = ReactDOMServer.renderToString(
    React.createElement(AppContext, {
      value: appContext,
      children: React.createElement(RouterServer, {
        router,
      }),
    }),
  );

  router.serverSsr!.setRenderFinished();

  injectedHtml = router.serverSsr!.takeBufferedHtml() ?? "";

  router.serverSsr?.cleanup();

  return new Response(); // not used
});
---

<div id="tsr-root" set:html={appHtml} />
<Fragment set:html={injectedHtml} />
<StartClientApp rootId="tsr-root" context={appContext} client:only="react" />
```

We can't use [renderRouterToString](https://github.com/TanStack/router/blob/8efac91d6d7d3e12ed5ef1964392241142492f6a/packages/react-router/src/ssr/renderRouterToString.tsx#L5) like in the SSR example
because our TanStack Router app is rendered inside Astro, which already manages `<html>` and `<body>` tags. Also, since [Astro components](https://docs.astro.build/en/basics/astro-components/#the-component-script) don’t support JSX in script blocks,
we use `React.createElement` syntax.

---

### Client-side Hydration: StartClientApp (packages/react/src/App.tsx)

This React component hydrates the pre-rendered HTML on the client:

```ts
import ReactDOM from "react-dom/client";
import { RouterClient } from "@tanstack/react-router/ssr/client";
import { useEffect } from "react";
import { createRouter } from "./router";
import { AppContext } from "./AppContext";

export function StartClientApp({
  rootId,
  context,
}: {
  rootId: string;
  context: AppContext;
}) {
  useEffect(() => {
    const tsrRoot = document.getElementById(rootId);
    if (tsrRoot) {
      const router = createRouter();
      if (!location.search) {
        ReactDOM.hydrateRoot(
          tsrRoot,
          <AppContext value={context}>
            <RouterClient router={router} />
          </AppContext>,
        );
      } else {
        // https://react.dev/reference/react-dom/client/createRoot#root-render-caveats
        // "The first time you call root.render, React will clear all the existing HTML content inside the React root before rendering the React component into it."
        // By letting the client side React take over "#tsr-root" div, the hydration error is no longer thrown.
        ReactDOM.createRoot(tsrRoot).render(
          <AppContext value={context}>
            <RouterClient router={router} />
          </AppContext>,
        );
      }
    }
  }, [rootId, context]);

  return null;
}
```

---

### Astro Page Routing (packages/astro/src/pages/[...path].astro)

We use Astro's [Rest parameters](https://docs.astro.build/en/guides/routing/#rest-parameters) to handle routing and pre-render specified paths:

```tsx
---
import type { GetStaticPaths } from "astro";
import Layout from "../layouts/Layout.astro";
import StartReactApp from "../components/StartReactApp.astro";

// https://docs.astro.build/en/guides/typescript/#infer-getstaticpaths-types
export const getStaticPaths = (() => {
  const contentPaths = [undefined, "about"].map((id) => ({
    params: { path: id },
  }));
  return contentPaths;
}) satisfies GetStaticPaths;
---

<Layout>
  <StartReactApp />
</Layout>
```

## Project Structure

This is a [pnpm workspace](https://pnpm.io/workspaces) monorepo with separate packages for the Astro and React apps.
Originally, this was to support [Storybook](https://storybook.js.org/) in the React package, but splitting the codebase like this turned out to be a helpful organizational decision.

- packages/astro (@package/astro)
- packages/react (@package/react)

### Common Commands

- `pnpm --filter astro dev`

  Run the Astro dev server (includes React).

- `pnpm --filter astro build`

  Build the Astro project (includes React build).

- `pnpm --filter astro preview`

  Serve the static output from `packages/astro/dist`. Useful for debugging.
