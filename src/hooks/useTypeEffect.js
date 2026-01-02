import { useEffect, useState, useRef } from "react";

export function useTypeEffect(text = "", speed = 65, skipTyping = false) {
  const safeText = typeof text === "string" ? text : "";

  const [displayedTypingText, setdisplayedTypingText] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const stopRef = useRef(false); // Force stop typing

  useEffect(() => {
    stopRef.current = false; // Reset stop flag on new run

    if (!safeText) {
      setdisplayedTypingText("");
      setIsFinished(true);
      return;
    }

    // Skip typing effect if skipTyping is true (for old messages)
    if (skipTyping) {
      setdisplayedTypingText(safeText);
      setIsFinished(true);
      return;
    }

    setdisplayedTypingText("");
    setIsFinished(false);
    startTimeRef.current = Date.now() + 50; // Initial delay like before

    let currentIndex = 0;

    const animate = () => {
      if (stopRef.current) {
        return; // Force break animation
      }

      const now = Date.now();
      const elapsed = now - startTimeRef.current;

      if (elapsed < 0) {
        // Still in initial delay
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      // Calculate target index based on real time (characters per speed ms)
      const targetIndex = Math.min(
        safeText.length,
        Math.floor(elapsed / speed)
      );

      if (currentIndex < targetIndex) {
        // Catch up: add all missed characters at once
        setdisplayedTypingText(safeText.slice(0, targetIndex));
        currentIndex = targetIndex;
      }

      if (currentIndex >= safeText.length) {
        setIsFinished(true);
        return; // Stop animation
      }

      // Continue animation
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [safeText, speed, skipTyping]); // Dependencies same as before

  // Force stop typing immediately
  const stopTyping = () => {
    stopRef.current = true;
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  return { displayedTypingText, isFinished, stopTyping };
}

