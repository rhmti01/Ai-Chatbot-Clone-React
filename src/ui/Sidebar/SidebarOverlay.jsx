import React from "react";

export default function SidebarOverlay({ sidebarOpen, onClose }) {
  return (
    <div
      onClick={onClose}
      className={`${
        sidebarOpen
          ? "cursor-pointer fixed inset-0 bg-gray-700/85 opacity-25 z-40 blur-3xl w-full min-h-screen"
          : "hidden"
      }`}
    ></div>
  );
}
