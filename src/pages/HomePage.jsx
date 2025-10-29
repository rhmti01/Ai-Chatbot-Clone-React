import React from "react";
import Sidebar from "./Sidebar";
import ChatScreen from "./ChatScreen";
import { Outlet } from "react-router";

function HomePage() {
  return (
      <div className="font-outfit relative min-w-full h-dvh lg:grid lg:grid-cols-[clamp(280px,25vw,330px)_1fr] grid-rows-1  ">
        <Sidebar/>
          <ChatScreen/>
      </div>
  );
}

export default HomePage;
