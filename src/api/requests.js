import axios from "axios";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import { getUserId } from "@/utils/USER_ID";
import { useUserInfStore } from "@/store/userInfStore";
let requests = axios.create({
  timeout: 5000,
  //baseURL的前缀http://localhost:8080加不加都可以
  baseURL: "/api",
});

requests.interceptors.request.use((config) => {
  const userInfStore = useUserInfStore();
  nprogress.start();
  if (userInfStore.uuid || userInfStore.token) {
    if (userInfStore.token) {
      config.headers.token = userInfStore.token;
    } else {
      config.headers.userTempId = userInfStore.uuid;
    }
  }
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
