import axios from "axios";
import { toast } from "react-toastify";

console.log(process.env);
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  // unexpected error.
  if (!expectedError) {
    // logger.log(error);
    console.log("logging the error", error);
    toast.error("An Unexpected error occured");
  }

  return Promise.reject(error);
});

export function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
