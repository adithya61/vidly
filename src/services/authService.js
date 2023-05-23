import http from "./httpService";
import config from "../config/config.json";
import jwt_decode from "jwt-decode";

const apiEndPoint =  "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

// prettier-ignore
export async function loginUser(email, password) {
  const {data: jwt} = await http.post(apiEndPoint, {
    "email": email,
    "password": password,
  });

  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export async function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwt_decode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  loginUser,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};
