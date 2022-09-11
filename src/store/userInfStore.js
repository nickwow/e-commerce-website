import { defineStore } from "pinia";
import { getUserId } from "@/utils/USER_ID";
import {
  applyCertificationCode,
  registerQuery,
  loginQuery,
  userInfQuery,
  logoutQuery,
} from "@/api";
import { ErrorCodes } from "vue";
export const useUserInfStore = defineStore("userInfStore", {
  state() {
    return {
      uuid: getUserId(),
      certificationCode: "",
      userInf: {},
      token: localStorage.getItem("token") || "",
    };
  },
  getters: {},
  actions: {
    async questApplyCertificationCode(phoneNum) {
      const result = await applyCertificationCode(phoneNum);
      if (result.code === 200) {
        this.certificationCode = result.data;
        return "ok";
      } else {
        return Promise.reject(new Error("fail"));
      }
    },

    async questRegister(phoneNum, passWord) {
      const result = await registerQuery(
        phoneNum,
        passWord,
        this.certificationCode
      );
      if (result.code === 200) {
        return "ok";
      } else {
        return Promise.reject(new Error("fail"));
      }
    },

    async questLogin(phoneNum, password) {
      const result = await loginQuery(phoneNum, password);
      if (result.code === 200) {
        this.token = result.data.token;
        localStorage.setItem("token", this.token);
      } else {
        Promise.reject(new Error("fail"));
      }
    },

    async questUserInf() {
      const result = await userInfQuery();
      if (result.code === 200) {
        this.userInf = result.data;
        return "ok";
      } else {
        return Promise.reject(new Error("fail"));
      }
    },

    async questLogout() {
      const result = await logoutQuery();
      if (result.code === 200) {
        this.token = "";
        this.userInf = {};
        localStorage.removeItem("token");
        return "ok";
      } else {
        return Promise.reject(new Error("fail"));
      }
    },
  },
});
