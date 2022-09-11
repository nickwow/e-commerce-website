import { navColloumQuest } from "@/api";
import { defineStore } from "pinia";
export const useNavColloumStore = defineStore("navColloumStore", {
  state: () => {
    return {
      navColloumItems: [],
    };
  },
  getters: {},
  actions: {
    async requstNavColloumItems() {
      const result = await navColloumQuest();
      this.navColloumItems = result.data;
    },
  },
});
