import { defineStore } from "pinia";
import {
  shopCartListQuery,
  delShopCartItemQuery,
  changeCheckedItemQuery,
} from "@/api/index";
export const useShopCartStore = defineStore("shopCart", {
  state: () => {
    return {
      shopCartList: [],
    };
  },
  getters: {
    shopCartItem() {
      return this.shopCartList[0] || {};
    },
  },
  actions: {
    async questShopCartList() {
      const result = await shopCartListQuery();
      console.log("---------------------");
      console.log(result.data);
      this.shopCartList = result.data;
    },

    async questDelShopCartItem(skuId) {
      const result = await delShopCartItemQuery(skuId);
      if (result.code === 200) {
        return "ok";
      } else {
        return Promise.reject("服务器响应错误，请重试！");
      }
    },

    async questChangeCheckedItem(skuId, isChecked) {
      const result = await changeCheckedItemQuery(skuId, isChecked);
      if (result.code === 200) {
        return "ok";
      } else {
        return Promise.reject("服务器响应错误，请重试！");
      }
    },

    async questDeleteSelectedItem() {
      const promiseList = [];
      this.shopCartItem.cartInfoList.forEach((item) => {
        const promise =
          item.isChecked === 1
            ? this.questDelShopCartItem(item.skuId)
            : Promise.resolve("");
        promiseList.push(promise);
      });
      return Promise.all(promiseList);
    },

    async questSelectAllChecked(allChecked) {
      const promiseList = [];
      const checked = allChecked === true ? 1 : 0;
      this.shopCartItem.cartInfoList.forEach((item) => {
        const promise = this.questChangeCheckedItem(item.skuId, checked);
        promiseList.push(promise);
      });
      return Promise.all(promiseList);
    },
  },
});
