import { createContext, useContext } from "react";

export const SidebarContext = createContext(null)

export function useSidebarContext() {
  return useContext(SidebarContext)
}