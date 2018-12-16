<template>
  <div class="home">
    <Row>
      <Col span="16">
      <Row>
        <template v-for="item in messageCardList">
          <Col span="8" :key="item.title">
          <message-card :cardConf="item" :key="item.title"></message-card>
          </Col>
        </template>
      </Row>
      </Col>
      <Col span="8">
      <Row>
        <user-info-card></user-info-card>
      </Row>
      </Col>
    </Row>
    <Row>
      <Col span="24">
      <log-card></log-card>
      </Col>
    </Row>
  </div>
</template>

<script>
  import MessageCard from "./main_component/MessageCard.vue";
  import UserInfoCard from "./main_component/UserInfoCard.vue";
  import LogCard from "./main_component/LogCard.vue";

  import messageCardList from "./conf/messageCardConf";

  export default {
    components: {
      MessageCard,
      UserInfoCard,
      LogCard
    },
    data() {
      return {
        messageCardList
      };
    },
    created() {
      //获取case数量
      this.$http
        .post(this.$store.state.api.flowPathController.caseStatistics())
        .then(res => {
          if (res.data.result) {
            this.messageCardList.forEach(item => {
              const key = item.status;
              item.counter = res.data.data[key];
            });
          } else {
            this.$Message.error("获取case数量失败！");
          }
        });
    }
  };
</script>

<style scoped>
  .home {
    padding: 30px;
  }
</style>