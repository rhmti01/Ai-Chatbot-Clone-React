import React from "react";
import { useSidebar } from "../context/SidebarContext";

function MainContent() {
      const {sidebarOpen, setSidebarOpen} = useSidebar()

  return (
    <div className="  h-full w-full bg-main text-text flex justify-center  ">
      {/* main interance title */}
      <div className=" pt-[35vh] text-center space-y-3 ">
        <h1 className=" font-semibold px-3 py-1.5 inline-block bg-surface rounded-3xl
         text-md tracking-wider shadow-gray-100  shadow-sm ">
          CHAT A.I+
        </h1>
        <p className="  tracking-wide font-semibold text-text-primary text-[26px] mx-4 text-center ">
          Good Day! How may I assist you today?
        </p>
      </div>

      {/* sidebar menu toggle */}
      <div  
      onClick={()=>setSidebarOpen(!sidebarOpen)}
    className="lg:hidden absolute top-4 left-4 cursor-pointer z-40" >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-8  "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 9h16.5m-16.5 6.75h16.5"
          />
        </svg>
      </div>

      {/* user profile image */}
      <div className=" absolute top-4 right-4 " >
        <img 
        className=" size-10 rounded-[18px] shadow-xl shadow-gray-200 "
        src="assets/profile-img.png" alt="profile image" />
      </div>

      {/* prompt input */}
      <div
        className="absolute bottom-10 flex items-center justify-between w-[calc(88%-2vw)] max-w-[690px]
      p-2  rounded-4xl bg-surface shadow-gray-300 shadow-lg focus-within:shadow-[#bfc4ca] duration-300 "
      >
        <img className="size-7 ml-3 " src="assets/brain.png" alt="thinking" />
        <input
          className="w-full mr-3 ml-2 outline-none border-0 placeholder:font-normal
          placeholder:text-sub focus:placeholder:text-stone-600/85 peer duration-300 "
          type="text"
          name="prompt-input"
          placeholder="What’s on your mind?"
        />
        <div className="shadow-indigo-200 shadow-md p-2 rounded-full bg-primary hover:bg-indigo-600/90 duration-300 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className=" size-6 fill-none "
          >
            <path
              d="m7.4 6.32 8.49-2.83c3.81-1.27 5.88.81 4.62 4.62l-2.83 8.49c-1.9 5.71-5.02 5.71-6.92 0l-.84-2.52-2.52-.84c-5.71-1.9-5.71-5.01 0-6.92ZM10.11 13.65l3.58-3.59"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
