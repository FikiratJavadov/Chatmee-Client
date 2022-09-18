import create from "zustand";
import axios from "../api/axios";
import { devtools } from "zustand/middleware";

export const useSocket = create(
  devtools((set, get) => ({
    socket: null,
    loading: false,
    error: null,
    connected: false,
    setSocket: (socket) => set({ socket }),
    setConnected: () => set({ connected: true }),
  }))
);
