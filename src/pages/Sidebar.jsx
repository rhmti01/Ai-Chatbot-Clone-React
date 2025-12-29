import React from "react";
import { useSidebar } from "../context/SidebarContext";
import SidebarOverlay from "../ui/Sidebar/sidebarOverlay";
import SidebarHeader from "../ui/Sidebar/SidebarHeader";
import ChatListHeader from "../ui/Sidebar/ChatListHeader";
import ChatList from "../ui/Sidebar/ChatList";
import SidebarContainer from "../ui/Sidebar/SidebarContainer";
import Divider from "../ui/Common/Divider";
import SidebarFooter from "../ui/Sidebar/SidebarFooter";

export default function Sidebar() {
  const { sidebarStatus, setSidebarStatus } = useSidebar();

  return (
    <>
      <SidebarOverlay
        sidebarStatus={sidebarStatus}
        onClose={() => setSidebarStatus(false)}
      />

      <SidebarContainer sidebarStatus={sidebarStatus}>
        <div className="absolute top-0 pb-2 pt-3 left-0 right-0 w-full  z-10  " >
          <SidebarHeader />
          <Divider />
          <ChatListHeader />
          <Divider />
        </div>
        <ChatList />
        <SidebarFooter />
      </SidebarContainer>
    </>
  );
}
