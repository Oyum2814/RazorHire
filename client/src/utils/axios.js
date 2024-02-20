// axios.js

import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001", // Set your base URL
  withCredentials: true, // Allow credentials globally
});

export default instance;
