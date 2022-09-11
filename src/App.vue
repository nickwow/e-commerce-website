<template>
  <Header></Header>
  <router-view></router-view>
  <Footer v-show="Route.meta.footerShow"></Footer>
</template>

<script setup name="app">
import { useNavColloumStore } from "@/store/navColloumStore";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { useSearchStore } from "@/store/searchStore";
const searchStore = useSearchStore();
const navColloumStore = useNavColloumStore();

onMounted(() => {
  navColloumStore.requstNavColloumItems();
});

const Route = useRoute();
</script>

<style></style>
