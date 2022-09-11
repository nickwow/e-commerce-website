<template>
  <div class="pagination">
    <button :disabled="pageCon.pageStart == 1" @click="setPageNo(pageNo - 1)">
      上一页
    </button>
    <button v-show="pageCon.pageStart > 1" @click="setPageNo(1)">1</button>

    <button v-show="pageCon.pageStart >= 3">···</button>

    <button
      v-for="(num, index) in pageCon.pageLength"
      :key="index"
      @click="setPageNo(pageCon.pageStart + index)"
      :class="{ active: pageNo == pageCon.pageStart + index }"
    >
      {{ pageCon.pageStart + index }}
    </button>

    <button v-show="pageCon.pageEnd < pageTotal - 1">···</button>
    <button v-show="pageCon.pageEnd < pageTotal" @click="setPageNo(pageTotal)">
      {{ pageTotal }}
    </button>
    <button
      :disabled="pageCon.pageEnd == pageTotal"
      @click="setPageNo(pageNo + 1)"
    >
      下一页
    </button>

    <select v-model="curPageSize">
      <option :value="3">一页3条</option>
      <option :value="5">一页5条</option>
      <option :value="10">一页10条</option>
      <option :value="15">一页15条</option>
      <option :value="20">一页20条</option>
    </select>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script setup name="Pagination">
import { toRefs, computed, ref, getCurrentInstance, watch } from "vue";
const props = defineProps(["pageNo", "pageSize", "total", "pageContinue"]);
const { pageNo, pageSize, total, pageContinue } = toRefs(props);
const curPageSize = ref(pageSize.value);
watch(curPageSize, (newvalue) => {
  instance.emit("setCurPageSize", newvalue);
});
const instance = getCurrentInstance();
const pageTotal = computed(() => {
  return Math.ceil(total.value / pageSize.value);
});

const pageCon = computed(() => {
  let pageStart = 0,
    pageEnd = pageTotal.value;
  if (pageContinue.value > pageTotal.value) {
    pageStart = 1;
    pageEnd = pageTotal.value;
  } else {
    if (pageNo.value - Math.floor(pageContinue.value / 2) <= 0) {
      pageStart = 1;
      pageEnd = pageContinue.value;
    } else {
      pageStart = pageNo.value - Math.floor(pageContinue.value / 2);
      pageEnd = pageNo.value + Math.floor(pageContinue.value / 2);
      if (pageStart <= 0) {
        pageStart = 1;
        pageEnd = pageContinue.value;
      }
      if (pageEnd > pageTotal.value) {
        pageEnd = pageTotal.value;
        pageStart = pageTotal.value - pageContinue.value + 1;
      }
    }
  }
  let pageLength = pageEnd - pageStart + 1;
  return { pageStart, pageEnd, pageLength };
});

const setPageNo = function (curPage) {
  instance.emit("setCurPageNo", curPage);
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }

    .active {
      background-color: skyblue;
    }
  }
  select {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: solid 1px;
  }
}
</style>
