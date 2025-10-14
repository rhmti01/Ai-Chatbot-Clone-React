import React from "react";
import { useSidebar } from "../context/SidebarContext";
import { Button } from "@heroui/button";

function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useSidebar();

  return (
    <>
      {/* sidebar outer gray space */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`  ${
          sidebarOpen
            ? "cursor-pointer fixed inset-0  bg-gray-700/85 opacity-25 z-40 blur-3xl w-full min-h-screen"
            : "hidden"
        }  `}
      ></div>

      {/* sidebar details */}
      <div
        className={`
         fixed top-0 left-0 h-full w-full xx:w-[300px] lg:max-w-[330px] @min-[390px]:min-w-[350px]
         z-50 transform duration-300 lg:w-full shadow-2xl lg:shadow-none p-0 lg:p-6 lg:pr-0
         bg-surface lg:bg-main
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:block
      `}
      >
        <div className="bg-surface *:px-7 py-6 rounded-4xl shadow-md shadow-gray-200 h-full flex flex-col items-start ">
          {/* ai title */}
          <h1
            className=" font-semibold xx:text-2xl text-lg inline-block bg-surface rounded-3xl
          tracking-wider shadow-gray-100  shadow-sm "
          >
            CHAT A.I+
          </h1>

          {/* chats integration buttons */}
          <div className="flex  w-full mt-12 space-x-2 ">
            <Button
              size=""
              className=" w-full py-3.5 font-light bg-primary hover:bg-indigo-600/90 duration-300
               text-surface rounded-4xl   inline-flex items-center gap-x-2 hover:gap-x-4 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className=" size-6  "
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 12h12M12 18V6"
                  stroke="#FFF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
              <span>New Chat</span>
            </Button>
            <button
              className="bg-black p-4 rounded-full inline cursor-pointer shadow-xl shadow-gray-300 hover:shadow-gray-400/70 group "
              size=""
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5 group-hover:scale-85 duration-300 "
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M11.5 21a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19ZM22 22l-2-2"
                  stroke="#FFF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </button>
          </div>

          <hr className=" w-full h-[1px] text-gray-200/80 mt-4 " />

          {/* Chats list titles */}
          <div className=" font-medium mt-4 flex flex-col w-full ">
            <div className="flex justify-between ">
              <p className=" text-sm text-gray-400 ">Your Conversations</p>
              <button className=" text-sm text-indigo-600 cursor-pointer ">
                Clear All
              </button>
            </div>
          </div>

          <hr className=" w-full h-[1px] text-gray-200/80 mt-4 " />

          {/* chats list  */}
          <div className=" mt-5  ">
            <ul className=" flex flex-col w-full space-y-1.5 ">
              <li className=" py-3 cursor-pointer hover:pl-10 overflow-hidden hover:bg-indigo-50 rounded-2xl duration-300 group  ">
                <a className=" flex items-center  gap-x-2  relative " href="#">
                  <span className=" absolute -left-10 group-hover:left-0 group-hover:-translate-x-10 hover:scale-110 duration-300 bg-red-500 py-1.5 pr-2 pl-1 rounded-tr-2xl rounded-br-2xl  ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className=" size-5 "
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                        className="stroke-surface"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-5 group-hover:stroke-indigo-400 duration-300 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                    />
                  </svg>
                  <p className=" w-[200px] truncate text-[15px] font-medium group-hover:text-indigo-400 duration-300 ">
                    Create Html Game Enviroment{" "}
                  </p>
                </a>
              </li>
              <li className=" py-3 cursor-pointer hover:pl-10 overflow-hidden hover:bg-indigo-50 rounded-2xl duration-300 group  ">
                <a className=" flex items-center  gap-x-2  relative " href="#">
                  <span className=" absolute -left-10 group-hover:left-0 group-hover:-translate-x-10 hover:scale-110 duration-300 bg-red-500 py-1.5 pr-2 pl-1 rounded-tr-2xl rounded-br-2xl  ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className=" size-5 "
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                        className="stroke-surface"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-5 group-hover:stroke-indigo-400 duration-300 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                    />
                  </svg>
                  <p className=" w-[200px] truncate text-[15px] font-medium group-hover:text-indigo-400 duration-300 ">
                    Create Html Game Enviroment{" "}
                  </p>
                </a>
              </li>

              <li className=" py-3 cursor-pointer hover:pl-10 overflow-hidden hover:bg-indigo-50 rounded-2xl duration-300 group  ">
                <a className=" flex items-center  gap-x-2  relative " href="#">
                  <span className=" absolute -left-10 group-hover:left-0 group-hover:-translate-x-10 hover:scale-110 duration-300 bg-red-500 py-1.5 pr-2 pl-1 rounded-tr-2xl rounded-br-2xl  ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className=" size-5 "
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5"
                        className="stroke-surface"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-5 group-hover:stroke-indigo-400 duration-300 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                    />
                  </svg>
                  <p className=" w-[200px] truncate text-[15px] font-medium group-hover:text-indigo-400 duration-300 ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Corporis quia nulla voluptatem, atque itaque rem id
                    adipisci, minima explicabo aspernatur magnam mollitia illum
                    soluta maxime facilis quibusdam impedit et quam?
                  </p>
                </a>
              </li>
            </ul>
          </div>

          {/* محتوای مورد نظر */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[280px] flex flex-col space-y-3">
            <div className="flex items-center justify-start gap-x-2 p-1.5 rounded-full ring-1 ring-gray-200/80 cursor-pointer hover:scale-105 duration-300 hover:bg-gray-100  ">
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
                    stroke-width="2"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                  <path
                    d="M2 12.88v-1.76c0-1.04.85-1.9 1.9-1.9 1.81 0 2.55-1.28 1.64-2.85-.52-.9-.21-2.07.7-2.59l1.73-.99c.79-.47 1.81-.19 2.28.6l.11.19c.9 1.57 2.38 1.57 3.29 0l.11-.19c.47-.79 1.49-1.07 2.28-.6l1.73.99c.91.52 1.22 1.69.7 2.59-.91 1.57-.17 2.85 1.64 2.85 1.04 0 1.9.85 1.9 1.9v1.76c0 1.04-.85 1.9-1.9 1.9-1.81 0-2.55 1.28-1.64 2.85.52.91.21 2.07-.7 2.59l-1.73.99c-.79.47-1.81.19-2.28-.6l-.11-.19c-.9-1.57-2.38-1.57-3.29 0l-.11.19c-.47.79-1.49 1.07-2.28.6l-1.73-.99a1.899 1.899 0 0 1-.7-2.59c.91-1.57.17-2.85-1.64-2.85-1.05 0-1.9-.86-1.9-1.9Z"
                    stroke="#111"
                    stroke-width="2"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
              </span>
              <p className="  text-sm ">Settings</p>
            </div>
            <div className="flex items-center justify-start gap-x-2 p-1.5 rounded-full ring-1 ring-gray-200/80 cursor-pointer hover:scale-105 duration-300 hover:bg-gray-100  ">
              <img
                className=" size-10 rounded-full "
                src="assets/profile-img.png"
                alt="user profile"
              />
              <p className="  text-sm "> Andrew Neilson</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
