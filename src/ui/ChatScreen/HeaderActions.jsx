import React from "react";
import { useSidebar } from "../../context/SidebarContext";
import { useLocation } from "react-router";

function HeaderActions() {
  const { sidebarStatus, setSidebarStatus } = useSidebar();
  const {pathname} = useLocation()

  return (
    <div className={` 
    ${pathname==="/" ? "shadow-none" : "shadow-[0_2px_12px_-6px_rgba(0,0,0,0.2)]"}
    bg-main lg:bg-transparent  lg:shadow-none  
     p-2 lg:py-4 lg:px-8 flex justify-between lg:justify-end items-start w-full absolute z-20
    `}>
      <button
        onClick={() => setSidebarStatus(!sidebarStatus)}
        className="lg:hidden cursor-pointer  bg-amber-500/ animate-moveInLeft "
      >
        <svg
          stroke="currentColor"
          className="size-10 stroke-[0.25px] "
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="5"
            y="16.2"
            width="14"
            height="1.6"
            rx="0.8"
            fill="#0D0B26"
          />
          <rect x="5" y="11.2" width="8" height="1.6" rx="0.8" fill="#0D0B26" />
          <rect x="5" y="6.2" width="14" height="1.6" rx="0.8" fill="#0D0B26" />
        </svg>
      </button>

      <div className=" cursor-pointer lg:mt-0.5 mr-1 animate-moveInRight ">
        <img
          className="size-9 rounded-2xl  shadow-xl shadow-gray-200"
          src="/assets/profile-img.png"
          alt="profile image"
        />
      </div>
    </div>
  );
}

export default HeaderActions;
