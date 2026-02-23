import React from 'react'

function ChatListHeader() {
  return (
    <div className="font-medium mt-4 px-6  flex flex-col w-full">
      <div className="flex justify-between">
        <p className="text-sm text-gray-400 dark:text-gray-500 ">Your Conversations</p>
        <button className="text-sm text-indigo-600 dark:text-indigo-500 cursor-pointer">Clear All</button>
      </div>
    </div>
  );
}

export default ChatListHeader