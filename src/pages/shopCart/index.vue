<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cartInfoItem, index) in cartInfoList"
          :key="cartInfoItem.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfoItem.isChecked"
              @click="changeChecked($event, cartInfoItem.skuId)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfoItem.imgUrl" />
            <div class="item-msg">
              {{ cartInfoItem.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartInfoItem.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeSkuNum($event, cartInfoItem, 'mins')"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cartInfoItem.skuNum"
              minnum="1"
              class="itxt"
              @change="changeSkuNum($event, cartInfoItem, 'input')"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeSkuNum($event, cartInfoItem, 'add')"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ itemTotalPrice(cartInfoItem) }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="delCartItem(cartInfoItem.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="chooseAll" />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteSelectedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ selectedGoods.num }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ selectedGoods.total }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/Trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="shopCart">
import { onMounted } from "vue";
import { useShopCartStore } from "@/store/shopCart";
import { useDetailStore } from "@/store/detailStore";
import { storeToRefs } from "pinia";
import { computed } from "@vue/reactivity";

const shopCartStore = useShopCartStore();
const { shopCartItem } = storeToRefs(shopCartStore);
const chooseAll = computed({
  get() {
    return cartInfoList.value.every((item) => {
      return item.isChecked === 1;
    });
  },

  //下面两种set都是可以执行
  // set(allChecked) {
  //   console.log(allChecked);
  //   shopCartStore
  //     .questSelectAllChecked(allChecked)
  //     .then(() => {
  //       shopCartStore.questShopCartList();
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // },
  async set(allChecked) {
    try {
      await shopCartStore.questSelectAllChecked(allChecked);
      shopCartStore.questShopCartList();
    } catch (err) {
      alert(err);
    }
  },
});
const cartInfoList = computed(() => {
  return shopCartItem["value"].cartInfoList || [];
});
onMounted(() => {
  shopCartStore.questShopCartList();
});

const detailStore = useDetailStore();
const positiveInt = /^\+?[1-9][0-9]*$/;
const throttle = function (fn, time) {
  var flag = true;
  return function (event, cart, type) {
    if (flag) {
      setTimeout(() => {
        fn.call(this, event, cart, type);
        flag = true;
      }, time);
    }
    flag = false;
  };
};
const changeSkuNum = throttle(async function (event, cart, type) {
  let changeValue = 0;
  switch (type) {
    case "add":
      changeValue = 1;
      break;
    case "mins":
      if (cart.skuNum > 1) {
        changeValue = -1;
      }
      break;
    default:
      let finalValue = Math.floor(event.target.value);
      if (positiveInt.test(String(finalValue))) {
        changeValue = finalValue - cart.skuNum;
      } else {
        alert("输入商品数目有错，请重新输入！");
      }
  }
  try {
    await detailStore.requestAddShopCartSuc(cart.skuId, changeValue);
    shopCartStore.questShopCartList();
  } catch (err) {
    console.log(err.message);
  }
}, 500);

const delCartItem = async function (skuId) {
  try {
    await shopCartStore.questDelShopCartItem(skuId);
    shopCartStore.questShopCartList();
  } catch (err) {
    alert(err);
  }
};

const changeChecked = async function ($event, skuId) {
  let isChecked = $event.target.checked === true ? 1 : 0;
  try {
    await shopCartStore.questChangeCheckedItem(skuId, isChecked);
    shopCartStore.questShopCartList();
  } catch (err) {
    alert(err);
  }
};

const deleteSelectedCart = async function () {
  try {
    await shopCartStore.questDeleteSelectedItem();
    shopCartStore.questShopCartList();
  } catch (err) {
    alert(err);
  }
};

const itemTotalPrice = computed(() => (item) => {
  return item.skuNum * item.skuPrice;
});

const selectedGoods = computed(() => {
  let num = 0;
  let total = 0;
  const selected = cartInfoList.value.reduce(
    (Accumulator, item) => {
      if (item.isChecked === 1) {
        Accumulator.num++;
        Accumulator.total += itemTotalPrice.value(item);
        return Accumulator;
      } else {
        return Accumulator;
      }
    },
    { num, total }
  );
  return selected;
});

const checkOut = function () {};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
        &:hover {
          cursor: pointer;
        }
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
