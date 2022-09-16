import React from "react";
import { useChat } from "../../store/chat";
import Message from "./Message";

const ChatBody = () => {
  const messages = useChat((state) => state.messages);

  return (
    <div
      id="messages"
      className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      {messages.map((message) => (
        <Message key={message?._id} message={message} />
      ))}
    </div>
  );
};

export default ChatBody;
