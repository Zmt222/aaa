<template>
    <div class="header">
      <div class="logo">
        <img src="../../assets/logo_small.gif" height="42" width="134">
      </div>
      <div class="user-info">
        <Dropdown transfer trigger="click" @on-click="handleUserInfoDropdown">
          <a href="javascript:;">
            <span>{{userInfo.userName}}</span>
            <Icon type="arrow-down-b"></Icon>
          </a>
          <DropdownMenu slot="list" class="dropdown">
            <DropdownItem name="newindex">返回首页</DropdownItem>
            <DropdownItem name="personal"  divided>个人中心</DropdownItem>
            <DropdownItem name="logout" divided>退出登录</DropdownItem>

          </DropdownMenu>
        </Dropdown>
        <Avatar src="../static/avatar.jpg" size="large" />
      </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo;
        }
    },
    methods:{
        handleUserInfoDropdown(name) {
            if (name === "personal") {
            this.$router.push("/personal");
            } else if (name === "logout") {
            this.$store.commit("logout");
            this.$http.post(this.$store.state.api.loginController.logout());
            this.$router.push("/login");
            }else if(name === 'newindex'){
                this.$router.push("/newindex");
            }
        }
    }
}
</script>
<style scoped>
.header {
    position: fixed;
    height: 60px;
    width: 100%;
    background: #ffcc00;
    z-index: 901;
  }
  .logo {
    margin: 8px 0 0 50px;
  }
  .user-info {
    float: right;
    margin-right: 30px;
    margin-top: -45px;
    z-index: 902;
    font-size: 16px;
  }
  .user-info a {
    color: #cc0202;
    font-weight: bold;
    margin-right: 10px;
  }
</style>


