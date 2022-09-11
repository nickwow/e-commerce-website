import { searchQuery } from "@/api";
import { defineStore } from "pinia";
export const useSearchStore = defineStore("searchStore", {
  state: () => {
    return {
      searchList: {},
    };
  },
  getters: {
    attrsList() {
      return this.searchList.attrsList || [];
    },
    goodsList() {
      return this.searchList.goodsList || [];
    },
    trademarkList() {
      return this.searchList.trademarkList || [];
    },
  },
  actions: {
    async questSearchList(params = {}) {
      const result = await searchQuery(params);
      console.log(result.data);
      this.searchList = result.data;
    },
  },
});
