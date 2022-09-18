import React from "react";
import { showChatName } from "../helper";
import { useAuth } from "../store/auth";
import { useChat } from "../store/chat";
import { useSocket } from "../store/socket";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";

const SingleChat = ({ chat }) => {
  const onlineUsers = useSocket((state) => state.onlineUsers);

  const me = useAuth((state) => state.user);
  const loading = useChat((state) => state.loading);
  const chatId = useParams().id;

  const selected = chatId === chat?._id;

  const typignUsers = Object.values(onlineUsers);
  const friend = showChatName(me, chat.users);

  const typingChatUser = typignUsers.find((tu) => tu.id === friend._id);
  const typingStatus = typingChatUser ? typingChatUser?.typing : false;
  console.log(typingStatus);

  return (
    <li className={`${loading && "pointer-events-none"}`}>
      <Link to={`${chat?._id}`}>
        <button
          className={`flex items-center w-full px-4 py-2 select-none hover:bg-gray-200 ${
            selected && "bg-gray-200"
          } focus:outline-none`}
        >
          <img
            className="w-12 mr-3 rounded-full border"
            src="https://i.ibb.co/0ZDqmDs/142030673-447983159572512-6561194794076636819-n.jpg"
            alt="Junior Coders"
          />

          <div className="transform translate-y-0.5 text-left">
            <h3 className="leading-4">{showChatName(me, chat?.users).name}</h3>
            <span className="text-xs text-gray-500">
              {typingStatus ? "Typing..." : "Active 20s ago"}
            </span>
          </div>
        </button>
      </Link>
    </li>
  );
};

export default SingleChat;
