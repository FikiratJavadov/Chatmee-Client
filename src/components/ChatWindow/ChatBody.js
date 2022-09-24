import React, { useEffect } from "react";
import { useChat } from "../../store/chat";
import Message from "./Message";

import { motion } from "framer-motion";

import { Player } from "@lottiefiles/react-lottie-player";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const ChatBody = React.forwardRef((props, ref) => {
  const messages = useChat((state) => state.messages);
  const getMessagesLoading = useChat((state) => state.getMessagesLoading);

  useEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight - ref.current.clientHeight;
  }, [getMessagesLoading, ref]);

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate="show"
      id="messages"
      className="flex body-chat flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch overflow-x-hidden"
    >
      {getMessagesLoading ? (
        <Player
          autoplay={true}
          loop={true}
          speed={2}
          src="https://assets3.lottiefiles.com/packages/lf20_usmfx6bp.json"
          style={{ width: "50%" }}
        />
      ) : (
        messages.map((message) => (
          <Message key={message?._id} message={message} />
        ))
      )}
    </motion.div>
  );
});

export default ChatBody;
