import React, { useEffect } from "react";
import { useChat } from "../store/chat";
import { useAuth } from "../store/auth";
import { useSocket } from "../store/socket";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import { useBeforeunload } from "react-beforeunload";

import ChatList from "../components/ChatList";
import UserList from "../components/UserList";

import io from "socket.io-client";

//* Socket init:

const Chat = () => {
  const chatId = useParams().id;

  const getAllChats = useChat((state) => state.getAllChats);
  const chats = useChat((state) => state.chats);
  const raiseTheChat = useChat((state) => state.raiseTheChat);
  const searchMode = useChat((state) => state.searchMode);
  const setMessage = useChat((state) => state.setMessage);
  const SearchModeToggle = useChat((state) => state.SearchModeToggle);
  const logout = useAuth((state) => state.logout);
  const user = useAuth((state) => state.user);

  const socket = useSocket((state) => state.socket);
  const connected = useSocket((state) => state.socket);
  const setConnected = useSocket((state) => state.setConnected);
  const setSocket = useSocket((state) => state.setSocket);
  const setOnlineUsers = useSocket((state) => state.setOnlineUsers);

  //*Scoket io state

  useBeforeunload((event) => {
    socket.emit("stop-typing", chatId);
  });

  useEffect(() => {
    getAllChats();
  }, [getAllChats]);

  useEffect(() => {
    const newSocket = io.connect("http://localhost:5000", {
      "sync disconnect on unload": true,
    });
    setSocket(newSocket);
    newSocket.on("connect", () => {
      console.log("Client connected");
      newSocket.emit("user-access", user);

      newSocket.on("access-ok", (name) => {
        console.log(`Client connected with a name: ${name}`);
        setConnected();
      });
    });
    return () => {
      newSocket.close();
      newSocket.disconnect("hello");
    };
  }, [setSocket, setConnected, user]);

  useEffect(() => {
    if (!connected) return;
    const sendMessageCallback = (message) => {
      if (message.chat._id === chatId) {
        setMessage(message);
      } else {
        //Todo Make an http PATCH request to change chat unread count;
        console.log("Give notification ???? ");
      }

      raiseTheChat(message);
    };

    socket.on("got-message", sendMessageCallback);

    return () => {
      socket.off("got-message", sendMessageCallback);
    };
  }, [connected, socket, setMessage, chatId, raiseTheChat]);

  useEffect(() => {
    if (!connected) return;

    socket.on("online-status", (users) => {
      setOnlineUsers(users);
    });
  }, [connected, socket, setOnlineUsers]);

  const logoutHandler = () => {
    socket.emit("stop-typing", chatId);
    logout();
  };

  return (
    <div className="bg-gray-50 w-screen h-screen sm:p-5">
      <div className="bg-white border border-gray-200 rounded flex h-full">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-full relative">
          <div className="border-b border-gray-200 p-3 relative">
            <svg
              width="25px"
              onClick={logoutHandler}
              height="25px"
              className="absolute cursor-pointer"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M4 18h2v2h12V4H6v2H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3zm2-7h7v2H6v3l-5-4 5-4v3z" />
              </g>
            </svg>
            <button className="flex items-center mx-auto select-none font-semibold focus:outline-none">
              {user?.name}
              <svg
                className="ml-1 transform rotate-180 translate-y-0.5"
                height="20"
                viewBox="0 0 48 48"
                width="20"
              >
                <path d="M40 33.5c-.4 0-.8-.1-1.1-.4L24 18.1l-14.9 15c-.6.6-1.5.6-2.1 0s-.6-1.5 0-2.1l16-16c.6-.6 1.5-.6 2.1 0l16 16c.6.6.6 1.5 0 2.1-.3.3-.7.4-1.1.4z"></path>
              </svg>
            </button>
            <button
              onClick={SearchModeToggle}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
            >
              <svg height="20" viewBox="0 0 44 44" width="20">
                <path d="M33.7 44.12H8.5a8.41 8.41 0 01-8.5-8.5v-25.2a8.41 8.41 0 018.5-8.5H23a1.5 1.5 0 010 3H8.5a5.45 5.45 0 00-5.5 5.5v25.2a5.45 5.45 0 005.5 5.5h25.2a5.45 5.45 0 005.5-5.5v-14.5a1.5 1.5 0 013 0v14.5a8.41 8.41 0 01-8.5 8.5z"></path>
                <path d="M17.5 34.82h-6.7a1.5 1.5 0 01-1.5-1.5v-6.7a1.5 1.5 0 01.44-1.06L34.1 1.26a4.45 4.45 0 016.22 0l2.5 2.5a4.45 4.45 0 010 6.22l-24.3 24.4a1.5 1.5 0 01-1.02.44zm-5.2-3h4.58l23.86-24a1.45 1.45 0 000-2l-2.5-2.5a1.45 1.45 0 00-2 0l-24 23.86z"></path>
                <path d="M38.2 14.02a1.51 1.51 0 01-1.1-.44l-6.56-6.56a1.5 1.5 0 012.12-2.12l6.6 6.6a1.49 1.49 0 010 2.12 1.51 1.51 0 01-1.06.4z"></path>
              </svg>
            </button>
          </div>

          {searchMode ? (
            <UserList key="userlist" />
          ) : (
            <ChatList key="chatlist" chats={chats} />
          )}
        </div>

        <div className="hidden sm:w-1/2 md:w-2/3 lg:w-3/4 border-l border-gray-200 sm:flex items-center justify-center text-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Chat;
