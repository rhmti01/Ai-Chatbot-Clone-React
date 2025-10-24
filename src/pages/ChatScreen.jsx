import React from "react";
import PromptInput from "../Components/ChatScreen/PromptInput";
import HeaderActions from "../Components/ChatScreen/HeaderActions";
import ChatsSection from "../Components/ChatScreen/ChatsSection";

function ChatScreen() {
  return (
    <div className="h-full w-full bg-main text-text flex justify-between flex-col 
    items-center p-4 pb-10 lg:pb-14 lg:p-6   ">
      <HeaderActions/>
      <ChatsSection/>
      <PromptInput />
    </div>
  );
}

export default ChatScreen;
