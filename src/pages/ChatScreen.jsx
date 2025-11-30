import React from "react";
import PromptInput from "../ui/ChatScreen/PromptInput";
import HeaderActions from "../ui/ChatScreen/HeaderActions";
import { Outlet } from "react-router";

function ChatScreen() {
  return (
    <div className="h-full w-full bg-main text-text flex justify-between flex-col 
    items-center  lg:pb-12 lg:p-0 lg:pr-0 relative  ">
      <HeaderActions/>
      <Outlet/>
      <PromptInput />
    </div>
  );
}

export default ChatScreen;
