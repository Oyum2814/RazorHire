import axios from "axios";

import config from "../config/config.js";

const BASE_URL = config.apiBaseUrl;

/* Adjust authorization according to API */

function getAuthToken() {
  return localStorage.getItem("authToken");
}

const Client = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${getAuthToken()}`,
  },
});

axios.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      localStorage.clear();
      return (window.location.href = "/");
    }

    return Promise.reject(error);
  }
);

export const getRequest = (path, query, responseType = "json") => {
  return Client.get(`${BASE_URL}${path}`, {
    params: query,
    responseType: responseType,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const postRequestMultiPart = (path, data) => {
  return Client.post(`${BASE_URL}${path}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const postRequest = (path, data) => {
  return Client.post(`${BASE_URL}${path}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const patchRequest = (path, data) => {
  return Client.patch(`${BASE_URL}${path}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const multiGetRequest = async (paths) => {
  let arr = [];

  paths.forEach((item) => {
    arr.push(Client.get(`${BASE_URL}${item}`, {}));
  });
  return axios.all(arr);
};

export const multiPostRequest = async (configs) => {
  let arr = [];
  configs.forEach((item) => {
    arr.push(Client.post(`${BASE_URL}${item.url}`, item.data, {}));
  });
  return axios.all(arr);
};

export const putRequest = (path, data) => {
  return Client.put(`${BASE_URL}${path}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const headRequest = (path) => {
  return Client.head(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteRequest = (path, body) => {
  return Client.delete(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
  });
};
