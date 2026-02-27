import React from "react";
import { useSidebar } from "../../context/SidebarContext";
import { useLocation } from "react-router";
import { useUserStore } from "../../store/useUserStore";
import ThemeSwitch from "../Common/ThemeSwitch";

function HeaderActions() {
  const { sidebarStatus, setSidebarStatus } = useSidebar();
  const { pathname } = useLocation();
  const profileImage = useUserStore((state) => state.profileImage);

  return (
    <div
      className={` 
    ${
      pathname === "/"
        ? "shadow-none"
        : "shadow-[0_2px_12px_-6px_rgba(0,0,0,0.2)] dark:shadow-[0_2px_10px_-6px_#333c5f]"
    }
    bg-main lg:shadow-none  dark:lg:shadow-none
     p-2.5 lg:pt-4 lg:pb-0 lg:px-8 flex justify-between lg:justify-end 
     items-center gap-x-1 w-full lg:w-[98%] absolute z-20 
    `}
    >
      <button
        onClick={() => setSidebarStatus(!sidebarStatus)}
        className="lg:hidden cursor-pointer  bg-amber-500/ animate-moveInLeft "
      >
        <svg
          stroke="currentColor"
          className="size-10 stroke-[0.25px]  "
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            className=" fill-black text-black dark:fill-gray-400 dark:text-gray-400 "
            x="5"
            y="16.2"
            width="14"
            height="1.6"
            rx="0.8"
            fill="currentColor"
          />
          <rect
            x="5"
            y="11.2"
            width="8"
            height="1.6"
            rx="0.8"
            className=" fill-black text-black dark:fill-gray-400 dark:text-gray-400 "
          />
          <rect
            x="5"
            y="6.2"
            width="14"
            height="1.6"
            rx="0.8"
            className=" fill-black text-black dark:fill-gray-400 dark:text-gray-400 "
          />
        </svg>
      </button>

      <div className="flex justify-between items-center w-24 ">
        <div className=" cursor-pointer lg:mt-0.5  animate-moveInRight ">
          <img
            className="size-9 rounded-2xl  shadow-xl dark:shadow-md shadow-gray-200 dark:shadow-gray-900 object-cover"
            src={profileImage}
            alt="profile image"
          />
        </div>
        <ThemeSwitch />
      </div>
    </div>
  );
}

export default HeaderActions;
