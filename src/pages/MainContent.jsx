import React from "react";
import SidebarToggle from "../ui/Main-Content/SidebarToggle";
import MainHeader from "../ui/Main-Content/MainHeader";
import UserAvatar from "../ui/Main-Content/UserAvatar";
import PromptInput from "../ui/Main-Content/PromptInput";

function MainContent() {
  return (
    <div className="h-full w-full bg-main text-text flex justify-center">
      <MainHeader />
      <SidebarToggle />
      <UserAvatar />
      <PromptInput />
    </div>
  );
}

export default MainContent;
