import React from "react";
import { showChatName } from "../helper";
import { useAuth } from "../store/auth";
import { useChat } from "../store/chat";
import { useSocket } from "../store/socket";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import { useParams } from "react-router-dom";

import dayjs from "dayjs";
import relativePlugin from "dayjs/plugin/relativeTime";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(LocalizedFormat);
dayjs.extend(relativePlugin);

const spring = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

const SingleChat = ({ chat }) => {
  const onlineUsers = useSocket((state) => state.onlineUsers);

  const me = useAuth((state) => state.user);
  const loading = useChat((state) => state.loading);
  const chatId = useParams().id;

  const selected = chatId === chat?._id;

  const typignUsers = Object.values(onlineUsers);
  const friend = showChatName(me, chat.users);

  const typingChatUser = typignUsers.find((tu) => tu?.id === friend?._id);
  const typingStatus = typingChatUser ? typingChatUser?.typing : false;

  return (
    <motion.li
      layout
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={spring}
      className={`${loading && "pointer-events-none"}`}
    >
      <Link to={`${chat?._id}`}>
        <button
          className={`flex items-center w-full px-4 py-2 select-none hover:bg-gray-200 focus:outline-none relative`}
        >
          {selected && (
            <motion.div
              layoutId="outline"
              className="active-chat"
              initial={false}
              animate={{ backgroundColor: "rgba(108, 110, 120, 0.177)" }}
              transition={spring}
            ></motion.div>
          )}
          <img
            className="w-12 h-12 mr-3 rounded-full border object-cover"
            src={friend?.photo}
            alt="Junior Coders"
          />

          <div className="transform translate-y-0.5 text-left truncate">
            <h3 className="leading-4 ">{showChatName(me, chat?.users)?.name}</h3>
            <span className="text-sm text-gray-500 truncate">
              {/* {dayjs(friend?.updatedAt).fromNow()} */}
              {chat?.lastMessage?.content}
            </span>
          </div>

          <div className="lastSeen text-gray-500 text-sm flex-1 text-right flex flex-col pl-3">
            <span>{dayjs(chat?.updatedAt).format("LT")}</span>
            {/* <span>51</span> */}
          </div>
        </button>
      </Link>
    </motion.li>
  );
};

export default SingleChat;
