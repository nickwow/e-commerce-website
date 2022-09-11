<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="clearPointer">
        <h2 class="all" @mouseenter="changeShow">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-show="isShowItem">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item bo"
                v-for="(item, index1) in navColloumStore.navColloumItems"
                :key="item.categoryId"
              >
                <h3
                  @mouseenter="curPointer(index1)"
                  :class="{ cur: curIndex == index1 }"
                >
                  <a
                    :data-categoryName="item.categoryName"
                    :data-category1Id="item.categoryId"
                    >{{ item.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: curIndex == index1 ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(subitem, index2) in item.categoryChild"
                    :key="subitem.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="subitem.categoryName"
                          :data-category2Id="subitem.categoryId"
                          >{{ subitem.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(thirditem, index3) in subitem.categoryChild"
                          :key="thirditem.categoryId"
                        >
                          <a
                            :data-categoryName="thirditem.categoryName"
                            :data-category3Id="subitem.categoryId"
                            >{{ thirditem.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
    <!-- <p>{{ navColloumStore.navColloumItems }}</p>
    <button @click="navColloumStore.$reset()">
      点击重置navColloumStore.navColloumItems
    </button> -->
  </div>
</template>

<script setup name="navColloum">
import { useNavColloumStore } from "@/store/navColloumStore";

import useNavColloumSelect from "@/hooks/useNavColloumSelect";
import { onMounted } from "vue";

const navColloumStore = useNavColloumStore();

const { curIndex, curPointer, clearPointer, isShowItem, goSearch, changeShow } =
  useNavColloumSelect();

onMounted(() => console.log("被复用了"));
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 467px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 28px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
            &.cur {
              background: skyblue;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }
    /*过渡动画:商品分类 进入阶段*/
    .sort-enter {
      height: 0px;
    }

    .sort-enter-active {
      transition: all 0.3s;
    }
    .sort-enter-to {
      height: 461px;
    }
  }
}
</style>
