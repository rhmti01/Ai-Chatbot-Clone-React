import React from "react";

export default function SidebarContainer({ sidebarStatus, children }) {
  return (
    <div
      className={`
        fixed top-0 left-0 h-full w-full xx:w-[300px] lg:max-w-[330px] @min-[390px]:min-w-[350px]
        z-50 transform duration-300 lg:w-full shadow-2xl lg:shadow-none p-0 lg:p-5 lg:pr-0
        bg-surface lg:bg-main scroll-auto animate-moveInLeft
        ${
          sidebarStatus ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:block
      `}
    >
      <div className="relative flex flex-col justify-between h-full rounded-3xl shadow-md shadow-gray-200 bg-surface pb-24   max-w-full  overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}
