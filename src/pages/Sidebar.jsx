import React from "react";
import { useSidebar } from "../context/SidebarContext";
import SidebarOverlay from "../ui/Sidebar/sidebarOverlay";
import SidebarHeader from "../ui/Sidebar/SidebarHeader";
import ChatListHeader from "../ui/Sidebar/ChatListHeader";
import ChatList from "../ui/Sidebar/ChatList";
import SidebarContainer from "../ui/Sidebar/SidebarContainer";
import Divider from "../ui/Divider";
import SidebarFooter from "../ui/Sidebar/SidebarFooter";

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
