<template>
  <div class="swiper-container" ref="swiperDom">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slide, index) in List" :key="slide.id">
        <img :src="slide.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script setup name="Carousel">
import { nextTick, toRef, watch, ref } from "vue";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
const props = defineProps(["List"]);
const List = toRef(props, "List");
const swiperDom = ref(null);
watch(
  List,
  () => {
    nextTick(() => {
      var mySwiper = new Swiper(swiperDom.value, {
        //设置轮播图防线
        direction: "horizontal",
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
        },

        // 如果需要滚动条
        scrollbar: {
          el: ".swiper-scrollbar",
        },
      });
    });
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>
