import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";
import Detail from "@/pages/Detail";
import addShopCartSuccess from "@/pages/addShopCartSuccess";
import paySuccess from "@/pages/paySuccess";
import shopCart from "@/pages/shopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import userCenter from "@/pages/userCenter";
import myOrder from "@/pages/userCenter/myOrder";
import teamOrder from "@/pages/userCenter/teamOrder";
import { useUserInfStore } from "@/store/userInfStore";
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/userCenter",
      name: "userCenter",
      component: userCenter,
      meta: {
        footerShow: false,
      },
      children: [
        {
          path: "myOrder",
          name: "myOrder",
          component: myOrder,
        },
        {
          path: "teamOrder",
          name: "teamOrder",
          component: teamOrder,
        },
        {
          path: "/userCenter",
          redirect: "/userCenter/myOrder",
        },
      ],
    },
    {
      path: "/paySuccess",
      name: "paySuccess",
      component: paySuccess,
      meta: { footerShow: false },
      beforeEnter(to, from, next) {
        if (from.path.indexOf("Pay") != -1) {
          next();
        } else {
          next(false);
        }
      },
    },
    {
      path: "/Pay",
      name: "Pay",
      component: Pay,
      meta: { footerShow: false },
      beforeEnter(to, from, next) {
        if (from.path.indexOf("Trade") != -1) {
          next();
        } else {
          next(false);
        }
      },
    },
    {
      path: "/Trade",
      name: "Trade",
      component: Trade,
      meta: { footerShow: false },
      beforeEnter(to, from, next) {
        if (from.path.indexOf("shopCart") != -1) {
          next();
        } else {
          next(false);
        }
      },
    },
    {
      path: "/shopCart",
      name: "shopCart",
      component: shopCart,
      meta: { footerShow: true },
    },
    {
      path: "/addShopCartSuccess",
      name: "addShopCartSuccess",
      component: addShopCartSuccess,
      meta: { footerShow: true },
    },
    {
      path: "/Detail/:skuId?",
      name: "Detail",
      component: Detail,
      meta: { footerShow: true },
    },
    {
      path: "/Home",
      name: "Home",
      component: Home,
      meta: { footerShow: true },
    },
    {
      path: "/Login",
      name: "Login",
      component: Login,
      meta: { footerShow: false },
    },
    {
      path: "/Register",
      name: "Register",
      component: Register,
      meta: { footerShow: false },
    },
    {
      path: "/Search/:keyword?",
      name: "Search",
      component: Search,
      meta: { footerShow: true },
    },
    {
      path: "/:pathMath(.*)",
      redirect: "/Home",
    },
  ],
  scrollBehavior() {
    //滚动行为这个函数,需要有返回值,返回值为一个对象。
    //经常可以设置滚动条x|y位置 [x|y数值的设置一般最小是零]
    return { top: 0 };
  },
});
router.beforeEach(async (to, from, next) => {
  const userInfStore = useUserInfStore();
  if (userInfStore.token) {
    if (to.path === "/Login" || to.path === "/Register") {
      next("/Home");
    } else {
      if (userInfStore.userInf.name) {
        next();
      } else {
        try {
          await userInfStore.questUserInf();
          next();
        } catch (err) {
          alert("token无效，请重新登录！");
          localStorage.removeItem("token");
          userInfStore.token = "";
          next("/Login");
        }
      }
    }
  } else {
    const path = to.path;
    if (
      path.indexOf("Trade") !== -1 ||
      path.indexOf("Pay") !== -1 ||
      path.indexOf("userCenter") !== -1
    ) {
      alert("请先进行登录");
      next(`/Login?redirect=${path}`);
    } else {
      next();
    }
  }
});

export default router;
