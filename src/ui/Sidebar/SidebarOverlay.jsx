import React from "react";

export default function SidebarOverlay({ sidebarStatus, onClose }) {
  return (
    <div
      onClick={onClose}
      className={`${
        sidebarStatus
          ? "cursor-pointer fixed inset-0 bg-gray-700/85 dark:bg-black dark:opacity-30 opacity-25 z-40 blur-3xl w-full min-h-screen"
          : "hidden"
      }`}
    ></div>
  );
}
