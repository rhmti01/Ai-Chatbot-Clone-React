import { create } from "zustand";
import runChat from "../services/gemini";

// const chatsList = [
//   {
//     id: "chat-1" ,
//     title : "ریکت چیه؟" ,
//     messages : [
//       {
//         id : 20938402384 ,
//         prompt : "ریکت چیه؟" ,
//         response : "ریکت یک کتابخانه ...................."  
//       } ,
//          { },
//     ]
//   } ,
//     {
//     id: "chat-2" ,
//     title : "پایتون چیه؟" ,
//     messages : [
//       {
//         id : 2093234234384 ,
//         prompt : "پایتون چیه؟" ,
//         response : "پایتون یک کتابخانه ...................."  
//       } ,
//          { },
//     ]
//   } ,
// ]

export const createChatSlice = (set, get) => ({
  chatsList: [],
  resultData: "",
  inputPrompt: "",

  onSendPrompt: async () => {
    const { input } = get();
    if (!input.trim()) return;

    set({
      resultData: "",
      inputPrompt: input,
      input: "",
      chatScreenMode: "response",
      loading: true,
      showResults: true,
    });

    const response = await runChat(input);

    set({
      resultData: response,
      chatsList: [
        ...get().chatsList,
        { prompt: input, response, id: new Date().getTime() },
      ],
      loading: false,
      showResults: false,
    });
  },
  setChatsList: (v) => set({ chatsList: v }),
  setResultData: (v) => set({ resultData: v }),
  setInputPrompt: (v) => set({ inputPrompt: v }),
});

export const useGeminiStore = create((set, get) => ({
  input: "",
  chatsList: [],
  inputPrompt: "",
  resultData: "",
  recentPrompts: "",
  prevPrompts: [],
  showResults: false,
  chatScreenMode: "starter",
  loading: false,
  
  
  
  setInput: (v) => set({ input: v }),
  setRecentPrompts: (v) => set({ recentPrompts: v }),
  setPrevPrompts: (v) => set({ prevPrompts: v }),
  setChatsList: (v) => set({ chatsList: v }),
  setResultData: (v) => set({ resultData: v }),
  setInputPrompt: (v) => set({ inputPrompt: v }),
  setShowResults: (v) => set({ showResults: v }),
  setChatScreenMode: (v) => set({ chatScreenMode: v }),
  setLoading: (v) => set({ loading: v }),

  
  onSendPrompt: async () => {
    const { input , chatsList } = get();
    if (!input.trim()) return;
    
    const newChat = { id: new Date().getTime(), prompt: input, response: null };

    set({
      input: "",
      chatScreenMode: "response",
    chatsList: [...chatsList, newChat],
      loading: true,
      showResults: true,
    });

    const response = await runChat(input);

    set({
      chatsList: get().chatsList.map((chat)=>
        chat.id === newChat.id ? {...chat , response} : chat
      ),
      loading: false,
      showResults: false,
    });
  },

}));
