import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000"
});

API.interceptors.request.use((req) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});
export const register = (data: {
  username: string;
  password: string;
}) => {
  return axios.post("http://localhost:3000/register", data);
};
export default API;