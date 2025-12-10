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

    // create new prompt structure
    const singlePromptData = {
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
    }

    // create new message 
    const newMessage = {
      id: Date.now(),
      activePromptIndex: 0,
      prompts : [singlePromptData],
    };

    // CASE 1: if there is no active chat -> create new chat group
    if (!currentChatId) {
      const chatUUID = timeBasedUUID();
      navigate(`/c/${chatUUID}`);

      const chatNumber = chatsList.length + 1;

      // define new chat structure
      const chatData = {
        id: chatUUID,
        title: ` Chat Message ${chatNumber}  ! `,
        messages: [newMessage],
      };

      // update store state (add new chat to chatsList)
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
                  prompts : msg.prompts.map((singlePrompt)=>{
                    if(singlePrompt.id !== singlePromptData.id) return singlePrompt ;

                    return {
                      ...singlePrompt,
                      responses: singlePrompt.responses.map((singleResponse, index)=>{
                        if(index !== singlePrompt.activeResponseIndex) return singleResponse ;
                        
                        return {
                          ...singleResponse,
                          hasAnimated: false,
                          loading: false,
                          text: apiResponse.text,
                          error: apiResponse.error,
                        }
                      })
                    }
                  })
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
  onRegenerateResponse: async (chatPageId, messageId , promptText , promptId) => {

    // add new response to existed responses
    set((state) => ({
        chatsList: state.chatsList.map((chat) => {
          if (chat.id !== chatPageId) return chat;

          return {
            ...chat,
            messages: chat.messages.map((msg) => {
              if (msg.id !== messageId) return msg;

              return {
                ...msg ,
                prompts : msg.prompts.map((singlePrompt)=>{
                  if(singlePrompt.id !== promptId) return singlePrompt ;

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
                    ...singlePrompt,
                    responses : [...singlePrompt.responses , newResponse],
                    activeResponseIndex : singlePrompt.responses.length  ,
                  }
                
                })
              }
            }
          
          ),
          };
        }),
        showResult: true,
      }));

    // fetch response from AI API
    const apiResponse = await runChat(promptText);

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
                prompts: msg.prompts.map((singlePrompt) => {
                  if (singlePrompt.id !== promptId) return singlePrompt;

                  return {
                    ...singlePrompt,
                    responses: singlePrompt.responses.map((singleResponse , index)=>{
                      if(index !== singlePrompt.activeResponseIndex) return singleResponse ;

                        return {
                          ...singleResponse ,
                          text : apiResponse.text ,
                          error : apiResponse.error ,
                          loading : false ,
                          hasAnimated : false ,
                        }

                    })

                  };
                }),
              };

            }),
          };
        }),
        showResult: false,
      }));
  },



  // switch responses by user selection
  onSwitchResponse : (chatPageId  , messageId , promptId ,  direction)=>{
    set((state) => ({
        chatsList: state.chatsList.map((chat) => {
          if (chat.id !== chatPageId) return chat;

          return {
            ...chat,
            messages: chat.messages.map((msg) => {
              if (msg.id !== messageId) return msg;

              return{
                ...msg,
                prompts: msg.prompts.map((singlePrompt)=>{
                  if(singlePrompt.id !== promptId) return singlePrompt ;

                  let newIndex = singlePrompt.activeResponseIndex + direction;
                  newIndex = Math.max(0, newIndex);
                  newIndex = Math.min(newIndex, singlePrompt.responses.length - 1);

                  return{
                    ...singlePrompt,
                    activeResponseIndex: newIndex,
                  }

                })
              }
            }),
          };
        }),
      }));
  },



  // change response like attribute
  onToggleResponseLike : (chatPageId , messageId , promptId , responseId , status)=>{
    set((state) => ({
        chatsList: state.chatsList.map((chat) => {
          if (chat.id !== chatPageId) return chat;

          return {
            ...chat,
            messages: chat.messages.map((msg) => {
              if (msg.id !== messageId) return msg;

              return{
                ...msg,
                prompts: msg.prompts.map((singlePrompt)=>{
                  if(singlePrompt.id !== promptId) return singlePrompt ;

                  return {
                    ...singlePrompt,
                    responses : singlePrompt.responses.map((response)=>{
                      if(response.id !== responseId) return response ;

                        return {
                          ...response ,
                          isResponseLiked : status
                        }

                    })
                  }
                })
              }
            }),
          };
        }),
      }));
  },



  // delete chat from chatsList by id
  onDeleteChat: (chatId) => {
    set({
      chatsList: get().chatsList.filter((chat) => chat.id !== chatId),
    });
  },



  // edit chat main title
  onEditChatTitle: (chatId , updatedTitle) => {
    set({
      chatsList: get().chatsList.map((chat) =>{
        if (chat.id !== chatId) return chat ;

        return {
          ...chat , title: updatedTitle
        }
      }),
    });
  },



  // update response hasAnimated status
  setMessageAnimated: (chatId, messageId , promptId , responseId) => {
    set((state) => ({
      chatsList: state.chatsList.map((chat) =>{
        if (chat.id !== chatId) return chat ;

        return {
          ...chat,
          messages: chat.messages.map((msg) =>{
            if (msg.id !== messageId) return msg ;

            return {
              ...msg,
              prompts: msg.prompts.map((singlePrompt)=>{
                if(singlePrompt.id !== promptId) return singlePrompt ;

                return {
                  ...singlePrompt ,
                  responses: singlePrompt.responses.map((singleResponse)=>{
                    if(singleResponse.id !== responseId) return singleResponse ;

                    return{
                      ...singleResponse ,
                      hasAnimated : true ,
                    }
                  })

                }
              }),
            };
          }),
        }
      })
    }));
  },



  // display response Action buttons after typing finished
  setMessageActionsDisplay: (chatId, messageId, promptId , isFinished) => {
    set((state) => ({
      chatsList: state.chatsList.map((chat) =>{
        
        if (chat.id !== chatId) return chat ;

        return {
          ...chat,
          messages: chat.messages.map((msg)=>{
            if (msg.id !== messageId) return msg ;
        
              return {
                ...msg,
                prompts: msg.prompts.map((singlePrompt)=>{

                  if(singlePrompt.id !== promptId) return singlePrompt ;

                  return {
                    ...singlePrompt,
                    responses: singlePrompt.responses.map((singleResponse, index)=>{
                      if (index !== singlePrompt.activeResponseIndex) return singleResponse;

                        return {
                          ...singleResponse,
                          isTypingTextFinished: isFinished
                        };
                      
                    })
                  }
                }),
              };
          })
       })
    }),
    }
});