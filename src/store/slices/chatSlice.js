import runChat from "../../services/gemini";
import { timeBasedUUID } from "../../utils/timeBasedUUID";

export const createChatSlice = (set, get) => ({
    //  initial values
  chatsList: [],

  inputText: "",
  inputPrompt: "",
  showResult: false,
  chatUUID :"" ,
  currentChatId : null ,

  // initial methods
  setInputText: (value) => set({ inputText: value }),
  setChatsList: (value) => set({ chatsList: value }),
  setInputPrompt: (value) => set({ inputPrompt: value }),
  setshowResult: (value) => set({ showResult: value }),
  setChatUUID : (value)=> set({chatUUID : value}) ,
  setCurrentChatId : (value)=> set({currentChatId : value}) ,

  // fetch prompt response from API
  onSendPrompt: async (navigate) => {
    const { inputText, chatsList, currentChatId } = get();
    if (!inputText.trim()) return;

    // create new message object
    const newMessage = {
      id: Date.now(),
      prompt: inputText,
      response: "",
      loading: true,
    };

    // CASE 1: if there is no active chat -> create new chat group
    if (!currentChatId) {
      const chatUUID = timeBasedUUID();
      navigate(`/chats/${chatUUID}`);

      // define new chat group structure
      const chatData = {
        id: chatUUID,
        messages: [newMessage],
      };

      // update store state
      set({
        inputText: "",
        chatsList: [...chatsList, chatData],
        showResult: true,
        chatUUID,
        currentChatId: chatUUID,
      });
    } 
    // CASE 2: if chat already exists -> push message into that group
    else {
      set({
        inputText: "",
        chatsList: get().chatsList.map((chatData) =>
          chatData.id === currentChatId
            ? {
                ...chatData,
                messages: [...chatData.messages, newMessage],
              }
            : chatData
        ),
        showResult: true,
      });
    }

    // fetch response from AI API
    const response = await runChat(inputText);

    // update the specific message's response in current chat
    set({
      chatsList: get().chatsList.map((chatData) => {
        if (chatData.id === get().currentChatId) {
          const updatedMessages = chatData.messages.map((msg) =>
            msg.id === newMessage.id
              ? { ...msg, response, loading: false }
              : msg
          );
          return { ...chatData, messages: updatedMessages };
        }
        return chatData;
      }),
      showResult: false,
    });
  },


});