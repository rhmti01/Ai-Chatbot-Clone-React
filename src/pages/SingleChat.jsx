import { useEffect, useRef } from "react";
import { useGeminiStore } from "../store/useGeminiStore";
import ChatMessage from "../ui/ChatScreen/ChatMessage";

function SingleChat() {
  const chatsList = useGeminiStore((state) => state.chatsList) || [];
  const currentChatId = useGeminiStore((state) => state.currentChatId);
  const selectedChat = chatsList.find((chat) => chat.id === currentChatId);
  const chatContainerRef = useRef();

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [selectedChat?.messages]);

  return (
    <div
      ref={chatContainerRef}
      className="h-full flex-1 relative w-full overflow-auto scroll-smooth
        2xl:[&::-webkit-scrollbar]:w-2 
        -------pb-[70vh]---------
        pb-16
        2xl:[&::-webkit-scrollbar-track]:rounded-2xl 
         2xl:[&::-webkit-scrollbar-thumb]:rounded-2xl bg-amber-400/ "
    >
      {selectedChat?.messages?.map(({ prompt, response, id, loading , loadWithAnimation , hasAnimated }) => (
        <ChatMessage
          key={id}
          id={id}
          prompt={prompt}
          responseText={response.text}
          responseError={response.error}
          loading={loading}
          loadWithAnimation={loadWithAnimation}
          hasAnimated={hasAnimated}
        />
      ))}
    </div>
  );
}

export default SingleChat;
