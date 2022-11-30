import axios from "axios";
const CLIENT_ID = `0608dec1b99d4c6cb506c7ac2e9c65d8`;
const CLIENT_SECRET = `e668bbcae3a94182845d632c7c75b4c5`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};

export default apiClient;
