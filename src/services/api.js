import axios from "axios";

export const api = axios.create({
  baseURL: "https://rocketnotes-api-v2.onrender.com/",
  // baseURL: "http://localhost:3333",
})

