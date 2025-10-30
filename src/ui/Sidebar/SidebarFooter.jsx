import React from "react";

function SidebarFooter() {
  return (
    <div className="mb-8 lg:mb-6 w-[240px] mx-auto flex flex-col space-y-3">
      <div className="flex items-center justify-start gap-x-2 p-1.5 rounded-full ring-1 ring-gray-200/80 cursor-pointer hover:scale-105 duration-300 hover:bg-gray-100">
        <span className=" p-3 rounded-full bg-gray-200 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-4"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
              stroke="#111"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M2 12.88v-1.76c0-1.04.85-1.9 1.9-1.9 1.81 0 2.55-1.28 1.64-2.85-.52-.9-.21-2.07.7-2.59l1.73-.99c.79-.47 1.81-.19 2.28.6l.11.19c.9 1.57 2.38 1.57 3.29 0l.11-.19c.47-.79 1.49-1.07 2.28-.6l1.73.99c.91.52 1.22 1.69.7 2.59-.91 1.57-.17 2.85 1.64 2.85 1.04 0 1.9.85 1.9 1.9v1.76c0 1.04-.85 1.9-1.9 1.9-1.81 0-2.55 1.28-1.64 2.85.52.91.21 2.07-.7 2.59l-1.73.99c-.79.47-1.81.19-2.28-.6l-.11-.19c-.9-1.57-2.38-1.57-3.29 0l-.11.19c-.47.79-1.49 1.07-2.28.6l-1.73-.99a1.899 1.899 0 0 1-.7-2.59c.91-1.57.17-2.85-1.64-2.85-1.05 0-1.9-.86-1.9-1.9Z"
              stroke="#111"
              strokeWidth="2"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </span>
        <p className="text-sm">Settings</p>
      </div>
      <div className="flex items-center justify-start gap-x-2 p-1.5 rounded-full ring-1 ring-gray-200/80 cursor-pointer hover:scale-105 duration-300 hover:bg-gray-100">
        <img
          className="size-10 rounded-full"
          src="/assets/profile-img.png"
          alt="user profile"
        />
        <p className="text-sm">Andrew Neilson</p>
      </div>
    </div>
  );
}

export default SidebarFooter;
