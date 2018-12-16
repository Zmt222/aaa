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
        type: "check",
        searchStatusList: [{ value: "pending", title: "查看所有" }],
        defaultStatus: "pending",
        orderName: "updateDate",
        order: "DESC"
      };
    }
  };
</script>