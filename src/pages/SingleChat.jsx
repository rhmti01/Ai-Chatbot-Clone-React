import { useEffect, useMemo, useRef } from "react";
import { useGeminiStore } from "../store/useGeminiStore";
import ChatMessage from "../ui/ChatScreen/ChatMessage";
import { Navigate, useParams } from "react-router";

function SingleChat() {
  // get current chat id from url path
  const { id } = useParams();

  // slice data imports
  const chatsList = useGeminiStore((state) => state.chatsList);
  const selectedChat = useMemo(
    () => chatsList.find((chat) => chat.id === id),
    [chatsList, id]
  );

  // access to dom chat blocks
  const chatContainerRef = useRef();
  const prevChatIdRef = useRef(id);
  const prevMessagesLengthRef = useRef(selectedChat?.messages?.length || 0);

  // manage page scroll on user behavior
  useEffect(() => {
    if (!selectedChat) return;
    if (!chatContainerRef.current) return;

    const container = chatContainerRef.current;
    const currentLength = selectedChat.messages.length || 0;

    if (id !== prevChatIdRef.current) {
      requestAnimationFrame(() => {
        container.scrollTop = container.scrollHeight;
      });
    } else if (currentLength > prevMessagesLengthRef.current) {
      requestAnimationFrame(() => {
        container.scrollTop = container.scrollHeight;
      });
    }

    prevChatIdRef.current = id;
    prevMessagesLengthRef.current = currentLength;
  }, [id, selectedChat]);

  // invalid root error handling
  if (!selectedChat) {
    if (id) return <Navigate to="/" replace />;
  }

  return (
    <div
      ref={chatContainerRef}
      className="
    h-full w-full relative
    overflow-auto scroll-smooth
    [&::-webkit-scrollbar]:w-0
    lg:[&::-webkit-scrollbar]:w-2
    pt-14 pb-28 bg-green-600/
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
            data-chat-message
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

      {/* <div
        className="
      pointer-events-none
      fixed bottom-6 2xl:right-[10%] right-0
      w-full 2xl:max-w-[900px] max-w-full h-[15%]
      bg-[linear-gradient(to_top,#F4F5F6,transparent)]
      z-10
    "
      ></div> */}
    </div>
  );
}

export default SingleChat;
