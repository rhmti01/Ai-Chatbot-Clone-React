import { useEffect, useMemo, useRef, useState } from "react";
import { useGeminiStore } from "../store/useGeminiStore";
import ChatMessage from "../ui/ChatScreen/ChatMessage";
import { Navigate, useParams } from "react-router";
import { useSidebar } from "../context/SidebarContext";

function SingleChat() {
  const { id } = useParams();
  const { sidebarStatus } = useSidebar();
  const bottomRef = useRef(null);
  const chatContainerRef = useRef(null);
  const isAtBottomRef = useRef(true);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  
  const chatsList = useGeminiStore((state) => state.chatsList);
  const selectedChat = useMemo(
    () => chatsList.find((chat) => chat.id === id),
    [chatsList, id]
  );
  
  const scrollToBottom = (behavior = "auto") => {
    bottomRef.current?.scrollIntoView({ behavior });
  };
  
  const lastMessageId = selectedChat?.messages[selectedChat.messages.length - 1]?.id;

  // call smooth scroll by user
  useEffect(() => {
    if (!selectedChat) return;

    if (isAtBottomRef.current) {
      scrollToBottom("smooth");
    }
  }, [lastMessageId]);

  // detect distance from bottom
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const onScroll = () => {
      const distance =
        container.scrollHeight - (container.scrollTop + container.clientHeight);

      isAtBottomRef.current = distance < 120;
      setShowScrollToBottom(distance >= 120);
    };

    container.addEventListener("scroll", onScroll);
    onScroll();

    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  // make sure selected chat is routed
  if (id && !selectedChat) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative h-full ">
      <div
        ref={chatContainerRef}
        className="
        relative h-full w-full
        overflow-auto 
        [&::-webkit-scrollbar]:w-0
        lg:[&::-webkit-scrollbar]:w-2
        pt-14 pb-28
      "
      >
        {selectedChat.messages.map((message) => {
          const activePrompt = message.prompts[message.activePromptIndex];

          const activeResponse =
            activePrompt.responses[activePrompt.activeResponseIndex] ||
            activePrompt.responses[activePrompt.responses.length - 1];

          return (
            <ChatMessage
              key={message.id}
              id={message.id}
              chatPageId={selectedChat.id}
              promptsList={message.prompts}
              activePromptText={activePrompt.prompt}
              activePromptIndex={message.activePromptIndex}
              activePromptId={activePrompt.id}
              responseText={activeResponse.text}
              responseError={activeResponse.error}
              messageActions={activeResponse.MessageActions}
              loading={activeResponse.loading}
              hasAnimated={activeResponse.hasAnimated}
              responseId={activeResponse.id}
              totalResponsesLength={activePrompt.responses.length}
              activeResponseIndex={activePrompt.activeResponseIndex}
              isResponseLiked={activeResponse.isResponseLiked}
            />
          );
        })}

        <div ref={bottomRef} />
      </div>
      {/* scroll to bottom button */}
      {showScrollToBottom && !sidebarStatus ? (
        <button
          onClick={() => {
            scrollToBottom("smooth");
          }}
          className=" fixed top-1/2  right-3 md:right-5 2xl:right-6 -translate-y-1/2   animate-blurFade
            z-50 cursor-pointer   shadow-[0_8px_25px_rgba(0,0,0,0.20)]
            hover:shadow-[0_12px_35px_rgba(0,0,0,0.30)]
            transition-shadow  rounded-full size-8 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className=" size-9 scale-90 md:scale-100 2xl:scale-105 fill-white stroke-gray-800 rounded-full
            -translate-x-0.5 -translate-y-0.5 "
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-miterlimit="10"
              stroke-width="1.5"
              d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
            ></path>
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M8.47 10.74L12 14.26l3.53-3.52"
            ></path>
          </svg>
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default SingleChat;
