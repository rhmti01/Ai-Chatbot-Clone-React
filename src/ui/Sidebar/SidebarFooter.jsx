import React from "react";

function SidebarFooter() {
  return (
    <div className="z-10 bg-surface absolute bottom-0 pb-4 pt-3 left-0 right-0
     mx-auto flex-col space-y-3 shadow-slate-300 ">
      <div
        className=" w-full max-w-[92%] mx-auto flex items-center justify-start gap-x-2 p-1.5 rounded-3xl ring-1 ring-gray-200/80
       cursor-pointer  duration-300 hover:bg-gray-50 hover:shadow-md hover:shadow-gray-200 "
      >
        <img
          className="size-10 rounded-full "
          src="/assets/profile-img.png"
          alt="user profile"
        />
        <p className="text-[14.8px] font-medium mx-1 text-gray-950 text-shadow-gray-900  ">Andrew Neilson</p>
      </div>
    </div>
  );
}

export default SidebarFooter;
