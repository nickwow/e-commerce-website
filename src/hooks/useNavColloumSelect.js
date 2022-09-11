import useThrottle from "@/hooks/useThrottle";
import { ref, toRef, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";

export default function () {
  const Route = useRoute();
  const Router = useRouter();

  let curIndex = ref(-1);
  let isShowItem = ref(true);

  const curPointer = useThrottle(function (index) {
    curIndex.value = index;
  }, 20);
  const clearPointer = function () {
    setTimeout(() => {
      curIndex.value = -1;
    }, 22);
    if (Route.name != "Home") {
      isShowItem.value = false;
    }
  };

  const goSearch = function (event) {
    const element = event.target;
    let { categoryname, category1id, category2id, category3id } =
      element.dataset;
    if (categoryname) {
      const location = { name: "Search" };
      const query = { categoryName: categoryname };
      if (category1id) {
        query.category1Id = category1id;
      } else if (category2id) {
        query.category2Id = category2id;
      } else {
        query.category3Id = category3id;
      }
      if (Route.name === "Search" && Route.params) {
        location.params = Route.params;
      }
      location.query = query;
      Router.push(location);
    }
  };
  onMounted(() => {
    const { name } = toRefs(Route);
    if (Route.name != "Home") {
      isShowItem.value = false;
    }
  });

  const changeShow = function () {
    if (Route.name != "Home") {
      isShowItem.value = true;
    }
  };
  return {
    curIndex,
    curPointer,
    clearPointer,
    isShowItem,
    goSearch,
    changeShow,
  };
}
