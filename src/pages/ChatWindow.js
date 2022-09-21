import React, { useEffect, useRef } from "react";
import { useChat } from "../store/chat";
import { useParams } from "react-router-dom";
import { useSocket } from "../store/socket";

import ChatHeader from "../components/ChatWindow/ChatHeader";
import ChatBody from "../components/ChatWindow/ChatBody";
import ChatFooter from "../components/ChatWindow/ChatFooter";

const ChatWindow = () => {
  const chatBodyRef = useRef(null);

  const socket = useSocket((state) => state.socket);

  const getAllMessages = useChat((state) => state.getAllMessages);
  const chatId = useParams().id;

  useEffect(() => {
    getAllMessages(chatId);
  }, [getAllMessages, chatId]);

  useEffect(() => {
    if (!socket) return;
    socket.emit("join-room", chatId);
  }, [socket, chatId]);

  return (
    <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
      <ChatHeader />
      <ChatBody ref={chatBodyRef} />
      <ChatFooter chatBodyRef={chatBodyRef} />
    </div>
  );
};

export default ChatWindow;
