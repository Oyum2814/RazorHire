// axios.js

import axios from "axios";

import config from "config/config";

const instance = axios.create({
  baseURL: `${config.apiBaseUrl}`, // Set your base URL
  withCredentials: true, // Allow credentials globally
});

export default instance;
