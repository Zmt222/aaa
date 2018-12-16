<template>
  <div>
    <main-page :type="type" :searchStatusList="searchStatusList" :defaultStatus="defaultStatus" :orderName="orderName" :order="order"></main-page>
  </div>
</template>

<script>
  import MainPage from "./main_component/MainPage.vue";

  export default {
    components: {
      MainPage
    },
    data() {
      return {
        type: "findAll",
        searchStatusList: [
          { value: "current", title: "查看所有" },
          { value: "first", title: "一级响应" },
          { value: "second", title: "二级响应" },
          { value: "third", title: "三级响应" },
          { value: "progress", title: "进行中" }
        ],
        defaultStatus: "current",
        orderName: "releaseDate",
        order: "ASC"
      };
    }
  };
</script>
