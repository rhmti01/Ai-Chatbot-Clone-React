import React from "react";
import PromptInput from "../ui/Main-Content/PromptInput";
import HeaderActions from "../ui/Main-Content/HeaderActions";
import ChatsSection from "../ui/Main-Content/ChatsSection";

function MainContent() {
  return (
    <div className="h-full w-full bg-main text-text flex justify-between flex-col 
    items-center p-4 pb-10 lg:pb-14 lg:p-6   ">
      <HeaderActions/>
      <ChatsSection/>
      <PromptInput />
    </div>
  );
}

export default MainContent;
