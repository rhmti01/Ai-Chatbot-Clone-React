import runChat from "../../services/gemini";
import { timeBasedUUID } from "../../utils/timeBasedUUID";

export const createChatSlice = (set, get) => ({
  // initial values
  chatsList: [],
  inputText: "",
  inputPrompt: "",
  showResult: false,
  chatUUID: "",
  currentChatId: null,

  // initial methods
  setInputText: (value) => set({ inputText: value }),
  setChatsList: (value) => set({ chatsList: value }),
  setInputPrompt: (value) => set({ inputPrompt: value }),
  setshowResult: (value) => set({ showResult: value }),
  setChatUUID: (value) => set({ chatUUID: value }),
  setCurrentChatId: (value) => set({ currentChatId: value }),



  // fetch prompt response from API
  onSendPrompt: async (navigate) => {
    const { inputText, chatsList, currentChatId } = get();
    if (!inputText.trim()) return;

    // create new message object with responses array
    const newMessage = {
      id: Date.now(),
      prompt: inputText,
      activeResponseIndex : 0 ,
      responses: [
        {
          id: Date.now(),
          text: "",
          error: false,
          loading: true,
          hasAnimated: false,
          MessageActions: false,
          isTypingTextFinished: false,
          isResponseLiked : null ,
        },
      ],
    };

    // CASE 1: if there is no active chat -> create new chat group
    if (!currentChatId) {
      const chatUUID = timeBasedUUID();
      navigate(`/c/${chatUUID}`);

      const chatNumber = chatsList.length + 1;

      // define new chat group structure
      const chatData = {
        id: chatUUID,
        headerTitle: ` Chat Message ${chatNumber}  ! `,
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
    const apiResponse = await runChat(inputText);

    // update the specific message's first response in current chat
    set({
      chatsList: get().chatsList.map((chatData) => {
        if (chatData.id === get().currentChatId) {
          const updatedMessages = chatData.messages.map((msg) =>
            msg.id === newMessage.id
              ? {
                  ...msg,
                  responses: msg.responses.map((resp) =>
                    resp.id === newMessage.responses[0].id
                      ? {
                          ...resp,
                          text: apiResponse.text,
                          error: apiResponse.error,
                          loading: false,
                          hasAnimated: false,
                        }
                      : resp
                  ),
                }
              : msg
          );
          return { ...chatData, messages: updatedMessages };
        }
        return chatData;
      }),
      showResult: false,
    });
  },



  // call for regenerate response
  onRegenerateResponse: async (chatPageId, messageId, prompt) => {

    // add new response to existed responses
    set((state) => ({
        chatsList: state.chatsList.map((chat) => {
          if (chat.id !== chatPageId) return chat;

          return {
            ...chat,
            messages: chat.messages.map((msg) => {
              if (msg.id !== messageId) return msg;

              // new response with empty values
              const newResponse = {
                id: Date.now(),
                text: "",
                error: false,
                loading: true,
                hasAnimated: false,
                MessageActions: false,
                isTypingTextFinished: false,
              };

              return {
                ...msg,
                responses: [...msg.responses, newResponse],
                activeResponseIndex: msg.responses.length, 
              };
            }),
          };
        }),
        showResult: true,
      }));

    // fetch response from AI API
    const apiResponse = await runChat(prompt);

    // update the new response
    set((state) => ({
        chatsList: state.chatsList.map((chat) => {
          if (chat.id !== chatPageId) return chat;

          return {
            ...chat,
            messages: chat.messages.map((msg) => {
              if (msg.id !== messageId) return msg;

              return {
                ...msg,
                responses: msg.responses.map((resp, idx) =>
                  idx === msg.activeResponseIndex
                    ? {
                        ...resp,
                        text: apiResponse.text,
                        error: apiResponse.error,
                        loading: false,
                        hasAnimated: false,
                      }
                    : resp
                ),
              };
            }),
          };
        }),
        showResult: false,
      }));
  },



  // switch responses by user selection
  onSwitchResponse : (chatPageId , messageId , direction)=>{
    set((state) => ({
        chatsList: state.chatsList.map((chat) => {
          if (chat.id !== chatPageId) return chat;

          return {
            ...chat,
            messages: chat.messages.map((msg) => {
              if (msg.id !== messageId) return msg;

              let newIndex = msg.activeResponseIndex + direction;
              newIndex = Math.max(0, newIndex);
              newIndex = Math.min(newIndex, msg.responses.length - 1);

              return {
                ...msg,
                activeResponseIndex: newIndex,
              };
            }),
          };
        }),
      }));
  },



  // change response like attribute 
  onToggleResponseLike : (chatPageId , messageId , responseId , status)=>{
    set((state) => ({
        chatsList: state.chatsList.map((chat) => {
          if (chat.id !== chatPageId) return chat;

          return {
            ...chat,
            messages: chat.messages.map((msg) => {
              if (msg.id !== messageId) return msg;

              return {
                ...msg ,
                responses : msg.responses.map((response)=>{
                  if (response.id !== responseId) return response;

                  return {
                    ...response ,
                    isResponseLiked : status
                  }

                })
              }
            }),
          };
        }),
      }));
  },



  // update response hasAnimated status
  setMessageAnimated: (chatId, messageId) => {
    set((state) => ({
      chatsList: state.chatsList.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: chat.messages.map((msg) =>
                msg.id === messageId
                  ? {
                      ...msg,
                      responses: msg.responses.map((resp, idx) =>
                        idx === msg.activeResponseIndex
                          ? { ...resp, hasAnimated: true }
                          : resp
                      ),
                    }
                  : msg
              ),
            }
          : chat
      ),
    }));
  },



  // display response Action buttons after typing finished
  setMessageActionsDisplay: (chatId, messageId, isFinished) => {
    set((state) => ({
      chatsList: state.chatsList.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: chat.messages.map((msg) =>
                msg.id === messageId
                  ? {
                      ...msg,
                      responses: msg.responses.map((resp, idx) =>
                        idx === msg.activeResponseIndex
                          ? { ...resp, isTypingTextFinished: isFinished }
                          : resp
                      ),
                    }
                  : msg
              ),
            }
          : chat
      ),
    }));
  },



  // delete chat from chatsList by id
  onDeleteChat: (chatId) => {
    console.log(chatId);
    set({
      chatsList: get().chatsList.filter((chat) => chat.id !== chatId),
    });
  },
});