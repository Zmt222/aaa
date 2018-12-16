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
        type: "history",
        searchStatusList: [
          { value: "history", title: "查看所有" },
          { value: "close", title: "已关闭" },
          { value: "delete", title: "已退回" }
        ],
        defaultStatus: "history",
        orderName: "updateDate",
        order: "DESC"
      };
    }
  };
</script>
