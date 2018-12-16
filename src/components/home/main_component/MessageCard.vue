<template>
  <Card :padding="0" class="counter-card">
    <Row>
      <Col span="8" class="counter-card-left" :style="{background: cardConf.bgcolor}">
      <Icon :type="cardConf.icon" class="counter-card-icon"></Icon>
      </Col>
      <Col span="16">
      <a href="javascript:;" :style="{color: cardConf.bgcolor}" class="counter" @click="navigateTo(cardConf.href,cardConf.status)">{{cardConf.counter}}</a>
      <span class="counter-title">{{cardConf.title}}</span>
      </Col>
    </Row>
  </Card>
</template>

<script>
  export default {
    name: "messageCard",
    props: {
      cardConf: Object
    },
    methods: {
      navigateTo(href, status) {
        this.$store.commit("search", {
          searchStatus: status
        });
        this.$store.commit("navigateTo", href);
        this.$router.push(href);
      }
    },
    created() {
      this.cardConf.counter = "loading";
    }
  };
</script>

<style scoped>
  .counter-card {
    height: 100px;
    overflow: hidden;
    margin-bottom: 10px;
    margin-right: 10px;
  }
  .counter-card-left {
    height: 100px;
    background: #666;
  }
  .counter-card-icon {
    display: block;
    margin-top: 30px;
    width: 100%;
    text-align: center;
    font-size: 40px;
    color: #fff;
  }
  .counter {
    display: block;
    width: 100%;
    font-size: 30px;
    font-weight: bold;
    margin: 20px auto 0;
    text-align: center;
  }
  .counter-title {
    display: block;
    width: 100%;
    font-size: 12px;
    color: #c8c8c8;
    margin: 0 auto;
    text-align: center;
  }
</style>
