import React, { useEffect } from "react";
import { useChat } from "../store/chat";
import { useParams } from "react-router-dom";

import ChatHeader from "../components/ChatWindow/ChatHeader";
import ChatBody from "../components/ChatWindow/ChatBody";
import ChatFooter from "../components/ChatWindow/ChatFooter";

const ChatWindow = () => {
  const getAllMessages = useChat((state) => state.getAllMessages);
  const chatId = useParams().id;

  useEffect(() => {
    getAllMessages(chatId);
  }, [getAllMessages, chatId]);

  return (
    <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
      <ChatHeader />
      <ChatBody />
      <ChatFooter />
    </div>
  );
};

export default ChatWindow;
