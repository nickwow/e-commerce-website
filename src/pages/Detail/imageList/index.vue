<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(image, index) in skuImageList"
        :key="image.id"
      >
        <img
          :src="image.imgUrl"
          :class="{ active: isActive === index }"
          @click="changeIsActive(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script setup name="imageList">
import { nextTick, toRef, watch, ref, getCurrentInstance } from "vue";
import Swiper from "swiper";
const { proxy } = getCurrentInstance();
const swiper = ref(null);
const isActive = ref(0);
const props = defineProps(["skuImageList"]);
const skuImageList = toRef(props, "skuImageList");
const changeIsActive = function (index) {
  proxy.mittBus.emit("selectImage", index);
  isActive.value = index;
};
//轮播图的js部分
watch(
  skuImageList,
  () => {
    nextTick(() => {
      var mySwiper = new Swiper(swiper.value, {
        // direction: "vertical", // 垂直切换选项
        // loop: true, // 循环模式选项
        // slidesPerGroup: 1,
        slidesPerView: "auto",
        // // 如果需要分页器
        // pagination: {
        //   el: ".swiper-pagination",
        // },
        direction: "horizontal",
        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },

        // 如果需要滚动条
        scrollbar: {
          el: ".swiper-scrollbar",
        },
      });
    });
  },
  { deep: true, immediate: true }
);
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
