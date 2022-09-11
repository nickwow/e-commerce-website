<template>
  <!--放大镜效果-->
  <div class="spec-preview">
    <img :src="bigImage.imgUrl" ref="previewImgDom" />
    <div class="event" @mousemove="magnifier"></div>
    <div class="big" ref="bigDom">
      <img :src="bigImage.imgUrl" ref="bigImgDom" />
    </div>
    <div class="mask" ref="maskDom"></div>
  </div>
</template>

<script setup name="Zoom">
import { computed } from "@vue/reactivity";
import { getCurrentInstance, onMounted, toRef, ref } from "vue";
const { proxy } = getCurrentInstance();
const previewImgDom = ref(null);
const bigImgDom = ref(null);
const maskDom = ref(null);
const bigDom = ref(null);
const props = defineProps(["skuImageList"]);
const skuImageList = toRef(props, "skuImageList");
const index = ref(0);
onMounted(() => {
  proxy.mittBus.on("selectImage", shiftImage);
});
const bigImage = computed(() => {
  return skuImageList["value"][index.value] || {};
});
const shiftImage = function (curIndex) {
  index.value = curIndex;
};
const magnifier = function (event) {
  let left = event.offsetX - maskDom.value.offsetWidth / 2;
  let top = event.offsetY - maskDom.value.offsetHeight / 2;
  let maskWidth = previewImgDom.value.offsetWidth - maskDom.value.offsetWidth;
  let maskHeight =
    previewImgDom.value.offsetHeight - maskDom.value.offsetHeight;
  if (left < 0) left = 0;
  if (left > maskWidth) left = maskWidth;
  if (top < 0) top = 0;
  if (top > maskHeight) top = maskHeight;
  maskDom.value.style.left = left + "px";
  maskDom.value.style.top = top + "px";

  let bigImgWidth = bigImgDom.value.offsetWidth - bigDom.value.offsetWidth;
  let bigImageHeight = bigImgDom.value.offsetHeight - bigDom.value.offsetHeight;
  let bigImgLeft = (-bigImgWidth * left) / maskWidth;
  let bigImgTop = (-bigImageHeight * top) / maskHeight;
  bigImgDom.value.style.left = bigImgLeft + "px";
  bigImgDom.value.style.top = bigImgTop + "px";
};
</script>

<style lang="less" scoped>
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 40%;
    height: 40%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
