import create from "zustand";
import axios from "../api/axios";
import { devtools } from "zustand/middleware";

export const useChat = create(
  devtools((set, get) => ({
    chats: [],
    loading: false,
    error: null,
    counter: 0,
    searchMode: false,
    users: [],
    messages: [],

    getAllChats: async () => {
      const { data } = await axios.get("/chat/");
      if (!data.success) throw new Error("Problem with getting all the chats!");
      set({ chats: data?.data?.chats });
    },

    searchUsers: async (search) => {
      const { data } = await axios.get(`/user/search?search=${search}`);
      if (!data.success) throw new Error("Problem with getting all the users!");
      set({ users: data?.data?.users });
    },

    //* Access chhat
    accessChat: async (friendId) => {
      const { data } = await axios.post("/chat", { friendId });
      if (!data.success) throw new Error("Problem with selecting chats!");

      const oldChat = get().chats.find((c) => c._id === data?.data?.chat._id);
      if (oldChat) return;

      set((state) => {
        return { chats: [data?.data?.chat, ...state.chats] };
      });
    },

    getAllMessages: async (chatId) => {
      const { data } = await axios.get(`/message/${chatId}`);
      if (!data.success) throw new Error("Problem with getting all chats!");
      set({ messages: data?.data?.messages });
    },

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
