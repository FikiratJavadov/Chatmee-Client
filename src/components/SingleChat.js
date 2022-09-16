import React from "react";
import { showChatName } from "../helper";
import { useAuth } from "../store/auth";
import { useChat } from "../store/chat";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";

const SingleChat = ({ chat }) => {
  const me = useAuth((state) => state.user);
  const loading = useChat((state) => state.loading);
  const chatId = useParams().id;

  const selected = chatId === chat?._id;

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
            <span className="text-xs text-gray-500">Active 20s ago</span>
          </div>
        </button>
      </Link>
    </li>
  );
};

export default SingleChat;
