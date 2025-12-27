import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import ChatScreen from "./ChatScreen";
import { useGeminiStore } from "../store/useGeminiStore";
import { useNavigate } from "react-router";

function HomePage() {
  const navigate = useNavigate()
  const pathName = location.pathname;
  const setCurrentChatId = useGeminiStore((state) => state.setCurrentChatId);

  useEffect(() => {
    if (pathName == "/" ) {
      setCurrentChatId(null)
    }
  }, [navigate, pathName, setCurrentChatId]);

  return (
    <div className="  font-outfit relative min-w-full h-dvh lg:grid 
    lg:grid-cols-[clamp(300px,25vw,330px)_1fr] grid-rows-1 overflow-hidden ">
      <Sidebar />
      <ChatScreen />
    </div>
  );
}

export default HomePage;
