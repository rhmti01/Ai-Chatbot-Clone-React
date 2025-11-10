/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const [sidebarStatus, setSidebarStatus] = useState(false);
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 1140) {
        setSidebarStatus(false);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  },[]);

  return (
    <SidebarContext.Provider value={{ sidebarStatus , setSidebarStatus }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}