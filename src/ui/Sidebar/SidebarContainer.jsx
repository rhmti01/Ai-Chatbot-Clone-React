import React from "react";

export default function SidebarContainer({ sidebarStatus, children }) {
  return (
    <div
      className={`
        fixed top-0 left-0 h-full w-full xx:w-[300px] lg:max-w-[330px] @min-[390px]:min-w-[350px]
        z-50 transform duration-300 lg:w-full shadow-sm  lg:shadow-none p-0 lg:p-5 lg:pr-0
         dark:shadow-black  scroll-auto animate-moveInLeft 
        ${
          sidebarStatus ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:block
      `}
    >
      <div className="relative flex flex-col justify-between h-full lg:rounded-3xl bg-surface ring-1 ring-gray-100 dark:ring-0
       pb-24 pt-[230px]  max-w-full   overflow-x-hidden shadow-lg shadow-gray-100  dark:shadow-none ">
        {children}
      </div>
    </div>
  );
}
