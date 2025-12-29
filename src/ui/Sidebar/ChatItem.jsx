import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useGeminiStore } from "../../store/useGeminiStore";
import { useSidebar } from "../../context/SidebarContext";
import ReactDOM from "react-dom";
import toast from "react-hot-toast";

function ChatItem({ title, id, pinnedAt }) {
  const navigate = useNavigate();
  const setCurrentChatId = useGeminiStore((state) => state.setCurrentChatId);
  const onDeleteChat = useGeminiStore((state) => state.onDeleteChat);
  const onEditChatTitle = useGeminiStore((state) => state.onEditChatTitle);
  const currentChatId = useGeminiStore((state) => state.currentChatId);
  const onPinChat = useGeminiStore((state) => state.onPinChat);
  const onUnpinChat = useGeminiStore((state) => state.onUnpinChat);
  const { setSidebarStatus } = useSidebar();
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const inputRef = useRef(null);

  const [isChatMenuOpen, setChatMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const chatMenuDropDownRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (editMode && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editMode]);

  // handle outside click for saving new edited chat title
  useEffect(() => {
    function handleClickOutside(e) {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setEditMode(false);
        onEditChatTitle(id, editTitle);
      }
    }
    if (editMode) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editMode, editTitle, id, onEditChatTitle]);

  // close chat action drop down
  useEffect(() => {
    if (!isChatMenuOpen) return;

    function handleClickOutside(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setChatMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isChatMenuOpen]);

  // Update menu position when opening
  useEffect(() => {
    if (isChatMenuOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  }, [isChatMenuOpen]);

  // edit new value for chat by ENTER key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setEditMode(false);
      setEditTitle(e.target.value);
      onEditChatTitle(id, editTitle);
    }
  };

  return (
    <>
      <li
        ref={chatMenuDropDownRef}
        className="select-none flex flex-col justify-center items-start py-0.5 px-4 duration-300 w-full group animate-fadeIn-fast"
      >
        <div
          onClick={() => {
            navigate(`/c/${id}`);
            setCurrentChatId(id);
            setSidebarStatus(false);
          }}
          className={`${
            id === currentChatId ? "bg-indigo-50/65 hover:bg-indigo-50/65 " : ""
          } flex justify-between items-center gap-x-2 relative duration-300 w-full rounded-2xl group-hover:bg-indigo-50/50 has-[button:hover]:bg-transparent cursor-pointer`}
        >
          {/* header tile */}
          <div className="py-3.5 pl-4 pr-2 flex justify-center items-center gap-x-3 group rounded-l-2xl bg-amber-500/">
            {/* chat icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-[18px] duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>

            {/* chat title */}
            {editMode ? (
              <input
                ref={inputRef}
                autoFocus
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={handleKeyPress}
                className="text-[15px] font-medium outline-0 ring-0 w-[150px]"
                type="text"
                value={editTitle}
              />
            ) : (
              <p className="w-[150px] truncate text-[15px] font-medium duration-300">
                {title}
              </p>
            )}
          </div>

          {/* chat action button */}
          <div className="relative">
            <button
              ref={buttonRef}
              onClick={(e) => {
                e.stopPropagation();
                setChatMenu((prev) => !prev);
              }}
              className={`
                 ${
                   isChatMenuOpen || pinnedAt ? " opacity-100" : " lg:opacity-0"
                 }
                group-hover:opacity-100 opacity-100 duration-500 pr-2 pl-6 h-12
                rounded-r-2xl cursor-pointer bg-blue-100/ `}
            >
              {/* chat action icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className={`  ${
                  pinnedAt ? "hidden" : "block"
                } size-5 text-gray-600 hover:text-gray-800 duration-300 fill-gray-700 -translate-x-3  `}
              >
                <path
                  d="M5 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM19 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2ZM12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                ></path>
              </svg>

              {/* filled pin icon - pinned  */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                class={`   ${
                  pinnedAt ? "block" : "hidden"
                } stroke-[2] me-2 size-5 fill-black -translate-x-1.5    `}
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="square"
                  strokeWidth="2"
                  d="m4 20 4.5-4.5M14 20 4 10l1-1 4.066-.678a4 4 0 0 0 2.864-2.049l1.296-2.406A2 2 0 0 1 16.4 3.4l4.198 4.198a2 2 0 0 1-.466 3.175l-2.406 1.296a4 4 0 0 0-2.05 2.864L15 19z"
                />
              </svg>
            </button>

            {/* chat action menu drop down */}
            {isChatMenuOpen &&
              ReactDOM.createPortal(
                <div
                  ref={menuRef}
                  style={{
                    position: "fixed",
                    top: menuPosition.top,
                    left: menuPosition.left,
                    zIndex: 9999,
                  }}
                  className="w-34 md:w-44 translate-x-2 -mt-2 rounded-2xl bg-gray-50 shadow-lg ring-1 ring-slate-200 p-2  animate-fadeIn-fast "
                >
                  <ul className=" select-none  ">
                    {/* pin current chat */}
                    <li
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!pinnedAt) {
                          onPinChat(id);
                          toast.success("chat pinned!");
                        } else {
                          onUnpinChat(id);
                          toast.success("chat unpinned!");
                        }
                        setChatMenu(false);
                      }}
                      className=" flex items-center justify-start gap-x-0.5 py-1.5 px-2 duration-300
                     hover:bg-slate-200/75 rounded-lg cursor-pointer  "
                    >
                      {!pinnedAt ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          class="stroke-[2] me-2 size-5  "
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="square"
                            strokeWidth="2"
                            d="m4 20 4.5-4.5M14 20 4 10l1-1 4.066-.678a4 4 0 0 0 2.864-2.049l1.296-2.406A2 2 0 0 1 16.4 3.4l4.198 4.198a2 2 0 0 1-.466 3.175l-2.406 1.296a4 4 0 0 0-2.05 2.864L15 19z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 -960 960 960"
                          fill="currentColor"
                          class="stroke-[2] me-2 size-5 peer hover:hidden "
                        >
                          <path d="M680-840v80h-40v327l-80-80v-247H400v87l-87-87-33-33v-47h400ZM480-40l-40-40v-240H240v-80l80-80v-46L56-792l56-56 736 736-58 56-264-264h-6v240l-40 40ZM354-400h92l-44-44-2-2-46 46Zm126-193Zm-78 149Z" />
                        </svg>
                      )}

                      <p className=" font-medium   text-gray-950 text-[14.5px] ">
                        {pinnedAt ? "Unpin Chat" : "Pin Chat"}
                      </p>
                    </li>
                    {/* rename chat title */}
                    <li
                      onClick={(e) => {
                        e.stopPropagation();
                        setChatMenu(false);
                        setEditMode(true);
                      }}
                      className=" flex items-center justify-start gap-x-0.5 py-1.5 px-2 duration-300
                     hover:bg-slate-200/75 rounded-lg cursor-pointer  "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        class="stroke-[2] me-2 size-5 "
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeWidth="2"
                          d="M18.25 5.75a3.536 3.536 0 0 0-5 0l-3.125 3.125-4.601 4.601a4 4 0 0 0-1.155 2.466L4 20l4.058-.369a4 4 0 0 0 2.466-1.155l7.726-7.726a3.536 3.536 0 0 0 0-5ZM12.5 7.5l4 4"
                        />
                      </svg>
                      <p className=" font-medium  text-gray-950 text-[14.5px] ">
                        Rename
                      </p>
                    </li>
                    {/* remove chat */}
                    <li
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteChat(id);
                        if (currentChatId === id) {
                          navigate("/");
                          setCurrentChatId(null);
                        }
                      }}
                      className=" flex items-center justify-start gap-x-0.5 py-1.5 px-2 duration-300
                     hover:bg-red-100 rounded-lg cursor-pointer group "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        class="stroke-[2] me-2 size-5 text-red-600 "
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeWidth="2"
                          d="M2.996 7h18M9.996 11v6m4-6v6M8 6.5l.69-2.412A1.5 1.5 0 0 1 10.131 3h3.736a1.5 1.5 0 0 1 1.443 1.088L16 6.5M5 7l.801 11.214A3 3 0 0 0 8.793 21h6.414a3 3 0 0 0 2.992-2.786L19 7"
                        />
                      </svg>

                      <p className=" font-medium   text-[15px] text-red-600 ">
                        Delete
                      </p>
                    </li>
                  </ul>
                </div>,
                document.body
              )}
          </div>
        </div>
      </li>
    </>
  );
}

export default ChatItem;
