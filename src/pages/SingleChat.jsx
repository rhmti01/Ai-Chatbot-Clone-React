import { useEffect, useMemo, useRef, useState } from "react";
import { useGeminiStore } from "../store/useGeminiStore";
import ChatMessage from "../ui/ChatScreen/ChatMessage";
import { Navigate, useParams } from "react-router";

function SingleChat() {
  const { id } = useParams();

  const chatsList = useGeminiStore((state) => state.chatsList);
  const selectedChat = useMemo(
    () => chatsList.find((chat) => chat.id === id),
    [chatsList, id]
  );

  const chatContainerRef = useRef(null);
  const prevChatIdRef = useRef(id);
  const prevMessagesLengthRef = useRef(selectedChat?.messages?.length || 0);

  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  const scrollToBottom = () => {
    const container = chatContainerRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight - container.clientHeight;
  };

  // auto scroll on chat change or new message
  useEffect(() => {
    if (!selectedChat || !chatContainerRef.current) return;

    const currentLength = selectedChat.messages.length || 0;

    if (id !== prevChatIdRef.current) {
      scrollToBottom();
      setTimeout(scrollToBottom, 60);
      setTimeout(scrollToBottom, 180);
      setTimeout(scrollToBottom, 350);
    } else if (currentLength > prevMessagesLengthRef.current) {
      scrollToBottom();
      setTimeout(scrollToBottom, 60);
      setTimeout(scrollToBottom, 180);
    }

    prevChatIdRef.current = id;
    prevMessagesLengthRef.current = currentLength;
  }, [id, selectedChat]);

  // detect distance from bottom
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const onScroll = () => {
      const distanceFromBottom =
        container.scrollHeight - (container.scrollTop + container.clientHeight);

      setShowScrollToBottom(distanceFromBottom > 120);
    };

    container.addEventListener("scroll", onScroll);
    onScroll();

    return () => {
      container.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!selectedChat) {
    if (id) return <Navigate to="/" replace />;
  }

  return (
    <div
      ref={chatContainerRef}
      className="
        relative h-full w-full
        overflow-auto scroll-smooth
        [&::-webkit-scrollbar]:w-0
        lg:[&::-webkit-scrollbar]:w-2
        pt-14 pb-28
      "
    >
      {/* scroll to bottom button */}
      {showScrollToBottom && (
        <button
          onClick={() => {
            scrollToBottom();
          }}
          className=" sticky  left-1/2 right-1/2 -translate-x-1/2 top-98/100 animate-blurFade
            z-50 cursor-pointer     shadow-[0_8px_25px_rgba(0,0,0,0.25)]
            hover:shadow-[0_12px_35px_rgba(0,0,0,0.35)]
            transition-shadow  rounded-full size-8 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className=" size-9 fill-white stroke-gray-800 rounded-full
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
      )}

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
    </div>
  );
}

export default SingleChat;
