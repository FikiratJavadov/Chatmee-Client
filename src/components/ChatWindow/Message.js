import React from "react";
import { amISender } from "../../helper";
import { useAuth } from "../../store/auth";

const Message = ({ message }) => {
  const me = useAuth((state) => state.user);
  const whoIsSender = amISender(me, message);

  return (
    <div className="chat-message">
      <div className={`flex items-end ${!whoIsSender && "justify-end"}`}>
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
          <div>
            <span
              className={`px-4 py-2 rounded-lg inline-block ${
                !whoIsSender
                  ? "rounded-br-none bg-blue-600 text-white"
                  : "rounded-bl-none bg-gray-300 text-gray-600"
              } `}
            >
              {message?.content}
            </span>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
          alt="My profile"
          className="w-6 h-6 rounded-full order-1"
        />
      </div>
    </div>
  );
};

export default Message;
