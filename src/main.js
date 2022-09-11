import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "@/router";
import navColloum from "@/components/navColloum";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";
import { questOrderPay, questOrderStatus, questMyOrder } from "@/api";
import { ElButton, ElMessageBox, ElMessage } from "element-plus";
import mitt from "mitt";
import "swiper/css/swiper.min.css";
import "element-plus/dist/index.css";
import VueLazyload from "vue-lazyload";
//引入mockServe文件,让咱们模拟接口跑起来
import "@/mock/mockServe.js";
const app = createApp(App);
// app.use(MessageBox);
app.use(router);
app.use(createPinia());
app.use(VueLazyload, {
  preLoad: 1.3,
  error: require("@/assets/images/lazy/load.gif"),
  loading: require("@/assets/images/lazy/load.gif"),
  attempt: 1,
});
app.component("navColloum", navColloum);
app.component("Carousel", Carousel);
app.component("Pagination", Pagination);
app.config.globalProperties.mittBus = new mitt();
app.config.globalProperties.questOrderPay = questOrderPay;
app.config.globalProperties.questOrderStatus = questOrderStatus;
app.config.globalProperties.questMyOrder = questMyOrder;
app.config.globalProperties.$messageBox = ElMessageBox;
app.config.globalProperties.$alert = ElMessageBox.alert;
app.config.globalProperties.$message = ElMessage;
app.mount("#app");
