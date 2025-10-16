/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import runChat from "../services/gemini";
import ChatList from "../ui/Sidebar/ChatList";

const GeminiContext = createContext();

export function GeminiProvider({ children }) {
  const [input, setInput] = useState("");
  const [recentPrompts, setRecentPrompts] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [chatScreenMode, setChatScreenMode] = useState("starter");
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [chatsList, setChatsList] = useState([]);
  const [inputPrompt , setInputPrompt] = useState("")

  const onSendPrompt = async () => {
    setResultData("");
    setInputPrompt(input)
    setInput("");
    setChatScreenMode("response");
    setLoading(true);
    setShowResults(true);
    const response = await runChat(input);
    setResultData(response);
    setChatsList((prev) => [...prev, { prompt: input, response }]);
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
    chatScreenMode,
    setChatScreenMode,
    chatsList,
    setChatsList,
    inputPrompt ,
    setInputPrompt ,
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
