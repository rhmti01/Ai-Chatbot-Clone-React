import React from "react";
import { useSidebar } from "../context/SidebarContext";
import SidebarOverlay from "../Components/Sidebar/sidebarOverlay";
import SidebarHeader from "../Components/Sidebar/SidebarHeader";
import ChatListHeader from "../Components/Sidebar/ChatListHeader";
import ChatList from "../Components/Sidebar/ChatList";
import SidebarContainer from "../Components/Sidebar/SidebarContainer";
import Divider from "../Components/ui/Divider";
import SidebarFooter from "../Components/Sidebar/SidebarFooter";

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useSidebar();

  return (
    <>
      <SidebarOverlay
        sidebarOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <SidebarContainer sidebarOpen={sidebarOpen}>
        <div className="flex flex-col">
          <SidebarHeader />
          <Divider />
          <ChatListHeader />
          <Divider />
          <ChatList />
        </div>
        <SidebarFooter />
      </SidebarContainer>
    </>
  );
}
