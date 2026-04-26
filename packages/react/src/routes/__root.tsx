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
      <Scripts />
      <TanStackRouterDevtools />
    </>
  );
}
