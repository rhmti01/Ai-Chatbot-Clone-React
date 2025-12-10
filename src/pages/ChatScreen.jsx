import React from "react";
import PromptInput from "../ui/ChatScreen/PromptInput";
import HeaderActions from "../ui/ChatScreen/HeaderActions";
import { Outlet } from "react-router";

function ChatScreen() {
  return (
    <div
      className="h-full w-full bg-main text-text flex justify-between flex-col 
    items-center  lg:pb-4 lg:p-0 lg:pr-0 lg:pt-3 relative  "
    >
      <HeaderActions />

      <div className="flex-1 w-full overflow-hidden">
        <Outlet />
      </div>

      <PromptInput />
    </div>
  );
}

export default ChatScreen;
