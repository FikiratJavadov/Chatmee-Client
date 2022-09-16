import React from "react";
import SingleChat from "./SingleChat";
import { useChat } from "../store/chat";

const ChatList = ({ chats }) => {
 


  return (
    <>
      <div className="flex items-center justify-between text-sm border-b border-gray-200">
        <div>
          <button className="py-3 w-20 uppercase font-semibold select-none h-full focus:outline-none border-b border-black">
            Primary
          </button>
          <button className="py-3 w-20 uppercase text-gray-400 select-none h-full focus:outline-none border-b border-transparent">
            General
          </button>
        </div>
        <button className="p-3 font-semibold text-blue-500 select-none h-full focus:outline-none border-b border-transparent">
          1 Request
        </button>
      </div>
      <ul className="py-1 overflow-auto">
        {chats.map((chat) => (
          <SingleChat key={chat._id} chat={chat} />
        ))}
      </ul>
    </>
  );
};

export default ChatList;
