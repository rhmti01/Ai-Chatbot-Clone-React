/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import runChat from "../services/gemini";

const GeminiContext = createContext();

export function GeminiProvider({ children }) {
  const [input, setInput] = useState("");
  const [recentPrompts, setRecentPrompts] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const onSendPrompt = async () => {
    setResultData("");
    setInput("");
    setLoading(true);
    setShowResults(true);
    const response = await runChat(input);
    setResultData(response);
    setLoading(false);
    setShowResults(false);
  };

  const contextValue = {
    input,
    setInput,
    recentPrompts,
    setRecentPrompts,
    prevPrompts,
    setPrevPrompts,
    showResults,
    setShowResults,
    loading,
    setLoading,
    resultData,
    setResultData,
    onSendPrompt,
  };

  return (
    <GeminiContext.Provider value={contextValue}>
      {children}
    </GeminiContext.Provider>
  );
}

export function useGemini() {
  return useContext(GeminiContext);
}
