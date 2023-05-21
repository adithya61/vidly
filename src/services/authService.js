import http from "./httpService";
import config from "../config/config.json";

const apiEndPoint = config.apiUrl + "/auth";

// prettier-ignore
export function loginUser(email, password) {
  return http.post(apiEndPoint, {
    "email": email,
    "password": password,
  });
}
