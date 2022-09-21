import create from "zustand";
import { devtools } from "zustand/middleware";

export const useSocket = create(
  devtools((set, get) => ({
    socket: null,
    loading: false,
    error: null,
    connected: false,
    onlineUsers: {},
    isTyping: false,
    setSocket: (socket) => set({ socket }),
    setConnected: () => set({ connected: true }),
    setOnlineUsers: (newOnlineUsers) => set({ onlineUsers: newOnlineUsers }),
    setIsTyping: (value) => set({ isTyping: value }),
  }))
);
