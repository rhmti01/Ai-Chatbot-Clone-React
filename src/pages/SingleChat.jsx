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
    if (id)  return <Navigate to="/" replace />;
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
  {selectedChat.messages.map(({ prompt, responses, id, activeResponseIndex }) => {
    const activeResponse =
      responses[activeResponseIndex] || responses[responses.length - 1];

    return (
      <ChatMessage
        key={id}
        id={id}
        data-chat-message
        chatPageId={selectedChat.id}
        prompt={prompt}
        responseText={activeResponse.text}
        responseError={activeResponse.error}
        loading={activeResponse.loading}
        hasAnimated={activeResponse.hasAnimated}
        messageActions={activeResponse.MessageActions}
        isTypingTextFinished={activeResponse.isTypingTextFinished}
        responseId={activeResponse.id}
        totalResponsesLength={responses.length}
        activeResponseIndex={activeResponseIndex}
        isResponseLiked={activeResponse.isResponseLiked}
      />
    );
  })}

  <div
    className="
      pointer-events-none
      fixed bottom-4 right-88 
      w-full max-w-[900px] h-[10%]
      bg-[linear-gradient(to_top,#f4f5f6,transparent)]
      z-10
    "
  ></div>
</div>

  );
}

export default SingleChat;
