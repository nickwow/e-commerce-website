import requests from "@/api/requests";
import mockRequests from "@/api/mockRequests";
export const navColloumQuest = () => {
  return requests({
    method: "get",
    url: "/product/getBaseCategoryList",
  });
};
//向服务器请求routationChart组件的数据
export const routationChartQuery = () => {
  return mockRequests({
    method: "get",
    url: "/routationChart",
  });
};
//向服务器请求classIntroduction组件的数据
export const classIntroductionQuery = () => {
  return mockRequests({
    method: "get",
    url: "/classIntroduction",
  });
};
//向服务器请求search组件的数据
export const searchQuery = (params) => {
  return requests({
    url: "/list",
    method: "post",
    data: params,
  });
};

export const DetailQuery = (skuId) => {
  return requests({
    url: `/item/${skuId}`,
    method: "get",
  });
};

export const addShopCartSucQuery = (skuId, skuNum) => {
  return requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post",
  });
};

export const shopCartListQuery = () => {
  return requests({
    url: "/cart/cartList",
    method: "get",
  });
};

export const delShopCartItemQuery = (skuId) => {
  return requests({
    url: `/cart/deleteCart/${skuId}`,
    method: "delete",
  });
};

export const changeCheckedItemQuery = (skuId, isChecked) => {
  return requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: "get",
  });
};

export const applyCertificationCode = (phoneNum) => {
  return requests({
    url: `/user/passport/sendCode/${phoneNum}`,
    method: "get",
  });
};

export const registerQuery = (phoneNum, passWord, code) => {
  return requests({
    url: "/user/passport/register",
    method: "post",
    data: {
      phone: phoneNum,
      password: passWord,
      code,
    },
  });
};

export const loginQuery = (phoneNum, passWord) => {
  return requests({
    url: "/user/passport/login",
    method: "post",
    data: {
      phone: phoneNum,
      password: passWord,
    },
  });
};

export const userInfQuery = () => {
  return requests({
    url: "/user/passport/auth/getUserInfo",
    method: "get",
  });
};

export const submitOrder = (tradeNo, data) => {
  return requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: "post",
    data,
  });
};

export const tradeQuery = () => {
  return requests({
    url: "/order/auth/trade",
    method: "get",
  });
};

export const logoutQuery = () => {
  return requests({
    url: "/user/passport/logout",
    method: "get",
  });
};

export const addressQuery = () => {
  return mockRequests({
    url: "/address",
    method: "get",
  });
};

export const questOrderPay = (orderId) => {
  return requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: "get",
  });
};

export const questOrderStatus = (orderId) => {
  return requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: "get",
  });
};

export const questMyOrder = (page, limit) => {
  return requests({
    url: `/order/auth/${page}/${limit}`,
    method: "get",
  });
};
