import React from "react";
import { useChat } from "../store/chat";
import { useNavigate } from "react-router-dom";

const SignleUser = ({ user }) => {
  const accessChat = useChat((state) => state.accessChat);
  const SearchModeOff = useChat((state) => state.SearchModeOff);

  const navigate = useNavigate();

  const accessChatHandler = () => {
    accessChat(user._id, navigate);
    SearchModeOff();
  };

  return (
    <li onClick={accessChatHandler}>
      <button className="flex items-center w-full px-4 py-2 select-none hover:bg-gray-100 focus:outline-none">
        <img
          className="w-12 h-12 mr-3 rounded-full border object-cover"
          src={user?.photo}
          alt="Junior Coders"
        />
        <div className="transform translate-y-0.5 text-left">
          <h3 className="leading-4">{user?.name}</h3>
          <span className="text-xs text-gray-500">online</span>
        </div>
      </button>
    </li>
  );
};

export default SignleUser;
