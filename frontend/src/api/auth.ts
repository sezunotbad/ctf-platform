import api from "./axios"; // 👉 trỏ tới axios.ts

export const register = (data: { username: string; password: string }) => {
  return api.post("/auth/register", data);
};