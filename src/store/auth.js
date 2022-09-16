import create from "zustand";
import axios from "../api/axios";

const auth = JSON.parse(localStorage.getItem("auth"));

export const useAuth = create((set) => ({
  in: auth?.token ? true : false,
  user: auth?.token ? auth?.user : null,
  token: auth?.token ? auth?.token : "",
  loading: false,
  error: null,

  register: async (userData) => {
    const { data } = await axios.post("/user/signup", userData);
    if (!data.success) throw new Error("Problem with signin up!");
    localStorage.setItem("auth", JSON.stringify(data?.data));
    set({ in: true, token: data.data.token, user: data.data.user });
  },
  login: async (userData) => {
    const { data } = await axios.post("/user/login", userData);
    if (!data.success) throw new Error("Problem with loggin in!");
    localStorage.setItem("auth", JSON.stringify(data?.data));
    set({ in: true, token: data.data.token, user: data.data.user });
  },
}));
