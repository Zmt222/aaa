<template>
  <div id="app" class="app">
    <router-view/>
  </div>
</template>

<script>
  export default {};
</script>

<style>
  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    min-width: 1250px;
    background: #f0f0f0 !important;
    overflow: hidden;
  }
  .app {
    width: 100%;
    height: 100%;
  }
</style>