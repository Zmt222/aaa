<template>
  <Card>
    <Row type="flex">
      <Col span="8">
      <Row type="flex" align="middle">
        <img class="avator" src="../../../assets/avatar.jpg" />
      </Row>
      </Col>
      <Col span="16">
      <Row type="flex" align="middle">
        <div class="user-name">
          <a href="javascript:;" @click="toPersonal">{{userInfo.userName}}</a>
          <p>{{userInfo.role.roleName}}</p>
        </div>
      </Row>
      </Col>
    </Row>
    <div class="line-gray"></div>
    <Row class="margin-top">
      <Col span="8">
      <p>上次登录时间:</p>
      </Col>
      <Col span="16">{{userInfo.loginTime}}</Col>
    </Row>
  </Card>
</template>

<script>
  export default {
    name: "userInfoCard",
    computed: {
      userInfo() {
        return this.$store.state.userInfo;
      }
    },
    methods: {
      toPersonal() {
        this.$router.push("/personal");
      }
    }
  };
</script>

<style scoped>
  .avator {
    height: 100px;
    width: 100px;
  }
  .user-name {
    margin-left: 60px;
    margin-top: 20px;
  }
  .user-name a {
    color: #2d8cf0;
    font-size: 25px;
    font-weight: bold;
  }
  .line-gray {
    margin-top: 10px;
    height: 0;
    border-bottom: 2px solid #dcdcdc;
  }
  .margin-top {
    margin-top: 10px;
  }
</style>