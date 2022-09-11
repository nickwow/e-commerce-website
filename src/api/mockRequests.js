import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

let requests = axios.create({
  timeout: 5000,
  //baseURL的前缀http://localhost:8080加不加都可以
  baseURL: "/mock",
});

requests.interceptors.request.use((config) => {
  console.log(config);
  nprogress.start();
  return config;
});
requests.interceptors.response.use(
  (res) => {
    nprogress.done();
    console.log(res);
    // return Promise.resolve(res.data);
    return res.data;
  },
  (err) => {
    nprogress.done();
    alert(err.mes);
    return Promise.reject(new Error("fail"));
  }
);
export default requests;
