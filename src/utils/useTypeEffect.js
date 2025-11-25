import { useEffect, useState, useRef } from "react";

export function useTypeEffect(text = "", speed = 65, skipTyping = false) {
  const safeText = typeof text === "string" ? text : "";

  const [displayedTypingText, setdisplayedTypingText] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!safeText) {
      setdisplayedTypingText("");
      setIsFinished(true);
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Skip typing effect if skipTyping is true (for old messages)
    if (skipTyping) {
      setdisplayedTypingText(safeText);
      setIsFinished(true);
      return;
    }

    let index = 0;
    setdisplayedTypingText("");
    setIsFinished(false);

    const typeNext = () => {
      setdisplayedTypingText((prev) => {
        if (index < safeText.length) {
          const next = prev + safeText[index];
          index++;

          if (index === safeText.length) {
            setIsFinished(true);
          } else {
            timeoutRef.current = setTimeout(typeNext, speed + Math.random() * 25);
          }

          return next;
        } else {
          return prev;
        }
      });
    };

    timeoutRef.current = setTimeout(typeNext, 50);

    return () => clearTimeout(timeoutRef.current);
  }, [safeText, speed, skipTyping]);  // Add skipTyping to dependencies

  return { displayedTypingText, isFinished };
}