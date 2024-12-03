import axios from "axios";
import { QS } from "axios";
import { RequestParams } from "@/utils/requestParams";

// create an axios instance
const service = axios.create({
  baseURL: '',
  timeout: 60 * 1000, // request timeout
});

service.post = function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, QS.stringify(params))
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// request interceptor
service.interceptors.request.use(
  (config) => {
    if (config.method === "post") {
      config.headers["Content-Type"] = "application/json;charset=UTF-8";
    }
    const requestParams = new RequestParams();
    requestParams.setAttribute(config.headers);

    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (success) => {
    if (success.status && success.status === 200) {
      return success.data;
    } else {
      return Promise.reject("Error");
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default service;
