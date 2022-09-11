<template>
  <navColloum />
  <routationChart />
  <Recommand />
  <Rank />
  <Favorite />
  <classIntroduction
    v-for="(item, index) in classIntroductionList"
    :key="item.id"
    :clssIntroductionItem="item"
  />
  <faviconList />
</template>

<script setup name="Home">
import routationChart from "@/components/routationChart";
import Recommand from "@/components/Recommand";
import Rank from "@/components/Rank";
import Favorite from "@/components/Favorite";
import classIntroduction from "@/components/classIntroduction";
import faviconList from "@/components/faviconList";
import { onMounted, toRef } from "vue";
import { useClassIntroduction } from "@/store/classIntroduction";
import { useRoutationChart } from "@/store/routationChart";
import { useUserInfStore } from "@/store/userInfStore";
const userInfStore = useUserInfStore();
const RoutationChartStore = useRoutationChart();
const classIntroductionStore = useClassIntroduction();
onMounted(() => {
  RoutationChartStore.questRoutationChartList();
  classIntroductionStore.questClassIntroductionList();
});
const classIntroductionList = toRef(
  classIntroductionStore,
  "classIntroductionList"
);
</script>

<style lang="scss" scoped></style>
