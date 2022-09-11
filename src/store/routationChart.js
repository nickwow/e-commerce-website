import { routationChartQuery } from "@/api";
import { defineStore } from "pinia";

export const useRoutationChart = defineStore("routationChartStore", {
  state: () => {
    return {
      routationChartList: [],
    };
  },
  actions: {
    async questRoutationChartList() {
      const result = await routationChartQuery();
      console.log(result.data);
      this.routationChartList = result.data;
    },
  },
});
