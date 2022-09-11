import { DetailQuery } from "@/api";
import { addShopCartSucQuery } from "@/api";
import { awaitExpression } from "@babel/types";
import { defineStore } from "pinia";
export const useDetailStore = defineStore("detailStore", {
  state: () => {
    return {
      detailList: {},
    };
  },
  getters: {
    categoryView() {
      return this.detailList.categoryView || {};
    },
    skuInfo() {
      return this.detailList.skuInfo || {};
    },
    valuesSkuJson() {
      return this.detailList.valuesSkuJson || "";
    },
    spuSaleAttrList() {
      return this.detailList.spuSaleAttrList || [];
    },
  },
  actions: {
    async requestDetailList(skuId) {
      const result = await DetailQuery(skuId);
      console.log("____________________________");
      console.log(result.data);
      this.detailList = result.data;
    },
    async requestAddShopCartSuc(skuId, skuNum) {
      const result = await addShopCartSucQuery(skuId, skuNum);
      console.log(result);
      if (result.code === 200) {
        return "ok";
      } else {
        return Promise.reject("服务器响应失败！");
      }
    },
  },
});
