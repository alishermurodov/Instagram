import axios from "axios";
import jwt_decode from "jwt-decode";

export const axiosRequest = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});
axiosRequest.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

function saveToken(token) {
  localStorage.setItem("access_token", token);
}
function getToken() {
  try {
    return jwt_decode(localStorage.getItem("access_token"));
  } catch (error) {
    /* empty */
  }
}
function destroyToken() {
  localStorage.removeItem("access_token");
}

export { saveToken, getToken, destroyToken };
