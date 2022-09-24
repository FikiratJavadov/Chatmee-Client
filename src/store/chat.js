import create from "zustand";
import axios from "../api/axios";
import { devtools } from "zustand/middleware";
import { useSocket } from "./socket";

export const useChat = create(
  devtools((set, get) => ({
    chats: [],
    loading: false,
    getMessagesLoading: false,
    error: null,
    counter: 0,
    searchMode: false,
    users: [],
    messages: [],
    currentChat: null,

    getAllChats: async () => {
      set({ loading: true });
      const { data } = await axios.get("/chat/");
      if (!data.success) throw new Error("Problem with getting all the chats!");
      set({ chats: data?.data?.chats, loading: false });
    },

    searchUsers: async (search) => {
      const { data } = await axios.get(`/user/search?search=${search}`);
      if (!data.success) throw new Error("Problem with getting all the users!");
      set({ users: data?.data?.users });
    },

    //* Access chhat
    accessChat: async (friendId, navigate) => {
      const { data } = await axios.post("/chat", { friendId });
      if (!data.success) throw new Error("Problem with selecting chats!");

      const oldChat = get().chats.find((c) => c._id === data?.data?.chat._id);
      if (oldChat) return navigate(`/chat/${oldChat?._id}`);

      set((state) => {
        return { chats: [data?.data?.chat, ...state.chats] };
      });

      navigate(`/chat/${data?.data?.chat?._id}`);
    },

    getAllMessages: async (chatId) => {
      set({ getMessagesLoading: true });
      const { data } = await axios.get(`/message/${chatId}`);
      if (!data.success) throw new Error("Problem with getting all chats!");
      set({ messages: data?.data?.messages, getMessagesLoading: false });
    },

    raiseTheChat: (message) => {
      const allChats = [...get().chats];
      const index = allChats.findIndex((c) => c._id === message.chat._id);
      allChats.splice(index, 1);
      allChats.unshift(message.chat);

      set({ chats: allChats });
    },

    sendMessage: async (messagePayload) => {
      const { data } = await axios.post(`/message`, messagePayload);
      if (!data.success) throw new Error("Problem with sending message!");

      //* Socket send message
      const socket = useSocket.getState().socket;
      socket.emit("send-message", data?.data?.message);

      const allChats = [...get().chats];
      const index = allChats.findIndex(
        (c) => c._id === data?.data?.message.chat._id
      );
      allChats.splice(index, 1);
      allChats.unshift(data?.data?.message.chat);

      set((state) => ({
        messages: [...state.messages, data?.data?.message],
        chats: allChats,
      }));
    },

    setMessage: (message) =>
      set((state) => ({ messages: [...state.messages, message] })),

    SearchModeOn: () => {
      set((state) => ({ searchMode: true }));
    },
    SearchModeOff: () => {
      set((state) => ({ searchMode: false }));
    },

    SearchModeToggle: () => {
      set((state) => ({ searchMode: !state.searchMode }));
    },

    increment: () => {
      set((state) => ({ counter: state.counter + 1 }));
    },
  }))
);
