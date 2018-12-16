<template>
  <div class="create">
    <div class="title">
      <h1>新建协查请求</h1>
    </div>
    <case-form @newParameter="getNewParameter"></case-form>
  </div>
</template>

<script>
  import CaseForm from "./main_component/CaseForm.vue";
  export default {
    components: {
      CaseForm
    },
    methods: {
      getNewParameter(data) {
        this.data = data
      }
    }
  };
</script>

<style scoped>
  .create {
    height: 100%;
  }
  .title {
    padding-top: 30px;
  }
  .title h1 {
    text-align: center;
  }
</style>
