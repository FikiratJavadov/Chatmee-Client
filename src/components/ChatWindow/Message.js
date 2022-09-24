import React, { useRef, useEffect } from "react";
import { amISender } from "../../helper";
import { useAuth } from "../../store/auth";

import { motion } from "framer-motion";

const Message = ({ message }) => {
  const messageRef = useRef(null);

  const me = useAuth((state) => state.user);
  const whoIsSender = amISender(me, message);
  const iAmSender = whoIsSender?._id === me?._id;

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "linear",
      },
    },
  };

  useEffect(() => {
    messageRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <motion.div variants={item} ref={messageRef} className="chat-message">
      <div className={`flex items-end ${iAmSender && "justify-end"} `}>
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
          <div>
            <span
              className={`px-4 py-2  rounded-lg inline-block  ${
                !iAmSender
                  ? "rounded-bl-none bg-blue-600 text-white"
                  : "rounded-br-none bg-gray-300 text-gray-600"
              } `}
            >
              {message?.content}
            </span>
          </div>
        </div>
        <img
          src={whoIsSender?.photo}
          alt="My profile"
          className={`w-8 h-8 rounded-full ${
            iAmSender ? "order-2" : "order-1"
          } `}
        />
      </div>
    </motion.div>
  );
};

export default Message;
