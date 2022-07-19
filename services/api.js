import axios from "axios";

export const API = axios.create({
  baseURL: process.env.PUBLIC_URL,
});
