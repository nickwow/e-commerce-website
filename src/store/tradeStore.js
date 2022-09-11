import { defineStore } from "pinia";
import { tradeQuery, addressQuery, submitOrder } from "@/api";
export const useTradeStore = defineStore("tradeStore", {
  state() {
    return {
      tradeObj: {},
      addressList: [],
      orderId: 0,
    };
  },
  getters: {
    tradeList() {
      return this.tradeObj.detailArrayList || [];
    },
    totalAmount() {
      return this.tradeObj.totalAmount || 0;
    },
    totalNum() {
      return this.tradeObj.totalNum || 0;
    },
  },
  actions: {
    async getTradeOrder() {
      const result = await tradeQuery();
      if (result.code === 200) {
        this.tradeObj = result.data;
        return "ok";
      } else {
        return Promise.reject(new Error("fail"));
      }
    },

    async questGetAddress() {
      const result = await addressQuery();
      if (result.code === 200) {
        this.addressList = result.data;
        return "ok";
      } else {
        return Promise.reject(new Error("fail"));
      }
    },

    async questSubmitOrder(curAddressIndex, comment) {
      let tradeNo = this.tradeObj.tradeNo;
      const data = {
        consignee: this.addressList[curAddressIndex].name,
        consigneeTel: this.addressList[curAddressIndex].phone,
        deliveryAddress: this.addressList[curAddressIndex].address,
        paymentWay: "ONLINE",
        orderComment: comment,
        orderDetailList: this.tradeList,
      };
      const result = await submitOrder(tradeNo, data);
      if (result.code === 200) {
        this.orderId = result.data;
        return "ok";
      } else {
        return Promise.reject(new Error("不可重复提交"));
      }
    },
  },
});
