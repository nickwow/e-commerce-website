import { classIntroductionQuery } from "@/api";
import { defineStore } from "pinia";

export const useClassIntroduction = defineStore("classIntroductionStore", {
  state: () => {
    return {
      classIntroductionList: [],
    };
  },
  actions: {
    async questClassIntroductionList() {
      const result = await classIntroductionQuery();
      console.log(result.data);
      this.classIntroductionList = result.data;
    },
  },
});
