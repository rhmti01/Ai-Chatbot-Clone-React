import React from "react";
import { useSidebar } from "../../context/SidebarContext";

export default function SidebarToggle() {
  const { sidebarOpen, setSidebarOpen } = useSidebar();

  return (
    <div
      onClick={() => setSidebarOpen(!sidebarOpen)}
      className="lg:hidden absolute top-4 left-4 cursor-pointer z-40"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="size-8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 9h16.5m-16.5 6.75h16.5"
        />
      </svg>
    </div>
  );
}
