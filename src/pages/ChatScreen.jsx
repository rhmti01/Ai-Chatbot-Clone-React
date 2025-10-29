import React from "react";
import PromptInput from "../ui/ChatScreen/PromptInput";
import HeaderActions from "../ui/ChatScreen/HeaderActions";
import { Outlet } from "react-router";

function ChatScreen() {
  return (
    <div className="h-full w-full bg-main text-text flex justify-between flex-col 
    items-center p-4 pb-10 lg:pb-14 lg:p-6   ">
      <HeaderActions/>
      <Outlet/>
      <PromptInput />
    </div>
  );
}

export default ChatScreen;
