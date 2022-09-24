import React from "react";
import SingleChat from "./SingleChat";
import { LayoutGroup } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import { useChat } from "../store/chat";

const ChatList = ({ chats }) => {
  const chatsLoading = useChat((state) => state.loading);

  return (
    <div>
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

      {chatsLoading ? (
        <Player
          autoplay={true}
          loop={true}
          speed={2}
          src="https://assets9.lottiefiles.com/packages/lf20_x62chJ.json"
          style={{ width: "100%" }}
        ></Player>
      ) : (
        <LayoutGroup>
          <ul className="py-1 overflow-auto">
            <AnimatePresence>
              {chats.map((chat) => (
                <SingleChat key={chat._id} chat={chat} />
              ))}
            </AnimatePresence>
          </ul>
        </LayoutGroup>
      )}
    </div>
  );
};

export default ChatList;
