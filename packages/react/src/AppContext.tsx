import { createContext, useContext } from "react";

export type AppContext = {
  title: string;
  description: string;
};

export const AppContext = createContext<AppContext>({
  title: "",
  description: "",
});

export function useAppContext() {
  return useContext(AppContext);
}
