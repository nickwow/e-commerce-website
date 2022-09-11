<template>
  <NavColloum />
  <div class="main">
    <div class="py-container">
      <!--bread-->
      <div class="bread">
        <ul class="fl sui-breadcrumb">
          <li>
            <a href="#">全部结果</a>
          </li>
        </ul>
        <ul class="fl sui-tag">
          <li class="with-x" v-if="searchParams.categoryName">
            {{ searchParams.categoryName }}<i @click="clearCategoryName">×</i>
          </li>
          <li class="with-x" v-if="searchParams.keyword">
            {{ searchParams.keyword }}<i @click="clearKeyWord">×</i>
          </li>
          <li class="with-x" v-if="searchParams.trademark">
            {{ searchParams.trademark.split(":")[1]
            }}<i @click="clearTradeMark">×</i>
          </li>
          <li
            class="with-x"
            v-for="(attrs, index) in searchParams.props"
            :key="attrs.split(':')[0]"
          >
            {{ attrs.split(":")[2] }}<i @click="clearPropsItem(index)">×</i>
          </li>
        </ul>
      </div>
      <!--selector-->
      <attrsSelector
        :attrsList="attrsList"
        :goodsList="goodsList"
        :trademarkList="trademarkList"
        @tradeMark="tradeMark"
        @attrs="attrs"
      />
      <!--details-->
      <div class="details clearfix">
        <div class="sui-navbar">
          <div class="navbar-inner filter">
            <ul class="sui-nav">
              <li @click="changeOrderId('1')" :class="{ active: orderId1 }">
                <a
                  >综合
                  <span
                    v-show="orderId1"
                    class="iconfont"
                    :class="{
                      'icon-up': !orderDesc,
                      'icon-downswing': orderDesc,
                    }"
                  ></span
                ></a>
              </li>
              <li @click="changeOrderId('2')" :class="{ active: !orderId1 }">
                <a
                  >价格
                  <span
                    v-show="!orderId1"
                    class="iconfont"
                    :class="{
                      'icon-up': !orderDesc,
                      'icon-downswing': orderDesc,
                    }"
                  ></span
                ></a>
              </li>
            </ul>
          </div>
        </div>
        <div class="goods-list">
          <ul class="yui3-g">
            <li
              class="yui3-u-1-5"
              v-for="(good, index) in goodsList"
              :key="good.id"
            >
              <div class="list-wrap">
                <div class="p-img" @click="routerDetail(good.id)">
                  <a><img v-lazy="good.defaultImg" /></a>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>{{ good.price }}.00</i>
                  </strong>
                </div>
                <div class="attr">
                  <a target="_blank" href="item.html" :title="good.title">{{
                    good.title
                  }}</a>
                </div>
                <div class="commit">
                  <i class="command">已有<span>2000</span>人评价</i>
                </div>
                <div class="operate">
                  <a
                    href="success-cart.html"
                    target="_blank"
                    class="sui-btn btn-bordered btn-danger"
                    >加入购物车</a
                  >
                  <a href="javascript:void(0);" class="sui-btn btn-bordered"
                    >收藏</a
                  >
                </div>
              </div>
            </li>
          </ul>
        </div>
        <Pagination
          class="page"
          :pageNo="searchParams.pageNo"
          :pageSize="searchParams.pageSize"
          :total="searchStore.searchList.total"
          :pageContinue="5"
          @setCurPageNo="setPageNo"
          @setCurPageSize="setPageSize"
        />
      </div>
      <!--hotsale-->
      <div class="clearfix hot-sale">
        <h4 class="title">热卖商品</h4>
        <div class="hot-list">
          <ul class="yui3-g">
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_01.png" />
                </div>
                <div class="attr">
                  <em>Apple苹果iPhone 6s (A1699)</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4088.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有700人评价</i>
                </div>
              </div>
            </li>
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_03.png" />
                </div>
                <div class="attr">
                  <em>金属A面，360°翻转，APP下单省300！</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4088.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有700人评价</i>
                </div>
              </div>
            </li>
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_04.png" />
                </div>
                <div class="attr">
                  <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4068.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有20人评价</i>
                </div>
              </div>
            </li>
            <li class="yui3-u-1-4">
              <div class="list-wrap">
                <div class="p-img">
                  <img src="./images/like_02.png" />
                </div>
                <div class="attr">
                  <em>Apple苹果iPhone 6s (A1699)</em>
                </div>
                <div class="price">
                  <strong>
                    <em>¥</em>
                    <i>4088.00</i>
                  </strong>
                </div>
                <div class="commit">
                  <i class="command">已有700人评价</i>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="Search">
import NavColloum from "@/components/navColloum";
import attrsSelector from "@/pages/Search/attrsSelector";
import {
  computed,
  getCurrentInstance,
  onBeforeMount,
  onMounted,
  reactive,
  toRef,
  toRefs,
  watch,
} from "vue";
import { useSearchStore } from "@/store/searchStore";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
const { proxy } = getCurrentInstance();
const Route = useRoute();
const Router = useRouter();
const searchStore = useSearchStore();
const searchParams = reactive({
  category3Id: "",
  category2Id: "",
  category1Id: "",
  categoryName: "",
  keyword: "",
  order: "1:desc",
  pageNo: 1,
  pageSize: 3,
  props: [],
  trademark: "",
});

const orderId1 = computed(() => {
  return searchParams.order.split(":")[0] == "1";
});

const orderDesc = computed(() => {
  return searchParams.order.split(":")[1] == "desc";
});

onBeforeMount(() => {
  Object.assign(searchParams, Route.query, Route.params);
});

onMounted(() => {
  console.log("reative");
  console.log(searchParams);
  searchStore.questSearchList(searchParams);
});

watch(Route, () => {
  searchParams.category1Id = undefined;
  searchParams.category2Id = undefined;
  searchParams.category3Id = undefined;
  searchParams.pageNo = 1;
  Object.assign(searchParams, Route.query, Route.params);
  console.log("reative");
  console.log(searchParams);
  searchStore.questSearchList(searchParams);
});

const { attrsList, goodsList, trademarkList } = storeToRefs(searchStore);

const clearCategoryName = function () {
  searchParams.categoryName = undefined;
  Router.push({ name: "Search", params: Route.params });
};

const clearKeyWord = function () {
  searchParams.keyword = "";
  proxy.mittBus.emit("resetKeyWord");
  Router.push({ name: "Search", query: Route.query });
};

const tradeMark = function (id, name) {
  searchParams.trademark = `${id}:${name}`;
  searchParams.pageNo = 1;
  searchStore.questSearchList(searchParams);
};

const clearTradeMark = function () {
  searchParams.trademark = undefined;
  searchParams.pageNo = 1;
  searchStore.questSearchList(searchParams);
};

const attrs = function (attr, value) {
  let newProps = `${attr.attrId}:${attr.attrName}:${value}`;
  if (searchParams.props.indexOf(newProps)) {
    searchParams.props.push(newProps);
    searchParams.pageNo = 1;
    searchStore.questSearchList(searchParams);
  }
};

const clearPropsItem = function (index) {
  searchParams.props.splice(index, 1);
  searchParams.pageNo = 1;
  searchStore.questSearchList(searchParams);
};

const changeOrderId = function (str) {
  if (searchParams.order.split(":")[0] == str) {
    searchParams.order = `${str}:${
      searchParams.order.split(":")[1] == "desc" ? "asc" : "desc"
    }`;
  } else {
    searchParams.order = `${str}:${"desc"}`;
  }
  searchParams.pageNo = 1;
  searchStore.questSearchList(searchParams);
};

const setPageNo = function (curPageNo) {
  searchParams.pageNo = curPageNo;
  searchStore.questSearchList(searchParams);
};

const setPageSize = function (curPageSize) {
  searchParams.pageSize = curPageSize;
  searchStore.questSearchList(searchParams);
};

const routerDetail = function (skuId) {
  Router.push({ name: "Detail", params: { skuId } });
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;
  .py-container {
    width: 1200px;
    margin: 0 auto;
    .bread {
      margin-bottom: 5px;
      overflow: hidden;
      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;
        li {
          display: inline-block;
          line-height: 18px;
          a {
            color: #666;
            text-decoration: none;
            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }
      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;
        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;
          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }
          &:hover {
            color: #28a3ef;
          }
        }
      }
    }
    .details {
      margin-bottom: 5px;
      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;
        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;
            li {
              float: left;
              line-height: 18px;
              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }
              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }
      .goods-list {
        margin: 20px 0;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;
            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;
                a {
                  color: #666;
                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }
              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: -5px;
                  }
                }
              }
              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                a {
                  color: #333;
                  text-decoration: none;
                }
              }
              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }
              .operate {
                padding: 12px 15px;
                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }
                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;
                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }
                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;
                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
      .page {
        text-align: center;
      }
    }
    .hot-sale {
      margin-bottom: 5px;
      border: 1px solid #ddd;
      .title {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #333;
        margin: 0;
        padding: 5px 0 5px 15px;
      }
      .hot-list {
        padding: 15px;
        ul {
          display: flex;
          li {
            width: 25%;
            height: 100%;
            .list-wrap {
              .p-img,
              .price,
              .attr,
              .commit {
                padding-left: 15px;
              }
              .p-img {
                img {
                  max-width: 100%;
                  vertical-align: middle;
                  border: 0;
                }
              }
              .attr {
                width: 85%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
              }
              .price {
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: -5px;
                  }
                }
              }
              .commit {
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
              }
            }
          }
        }
      }
    }
  }
}
</style>
