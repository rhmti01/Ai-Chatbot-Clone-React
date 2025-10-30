import { useEffect, useState, useRef } from "react";

export function useTypeEffect(text = "", speed = 35) {
  const safeText = typeof text === "string" ? text : "";
  const [displayed, setDisplayed] = useState("");
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!safeText) {
      setDisplayed("");
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    let index = 0;
    setDisplayed("");

    const typeNext = () => {
      setDisplayed((prev) => {
        if (index < safeText.length) {
          const next = prev + safeText[index];
          index++;
          timeoutRef.current = setTimeout(typeNext, speed + Math.random() * 25);
          return next;
        } else {
          return prev; 
        }
      });
    };

    timeoutRef.current = setTimeout(typeNext, 50);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [safeText, speed]);

  return displayed;
}
