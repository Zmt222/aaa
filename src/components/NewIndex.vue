<template>
  <div class="newindex">
    <Header></Header>
    <!-- <div class="header">
      <div class="logo">
        <img src="../assets/logo_small.gif" height="42" width="134">
      </div>
      <div class="user-info">
        <Dropdown transfer trigger="click" @on-click="handleUserInfoDropdown">
          <a href="javascript:;">
            <span>{{userInfo.userName}}</span>
            <Icon type="arrow-down-b"></Icon>
          </a>
          <DropdownMenu slot="list" class="dropdown">
            <DropdownItem name="personal">个人中心</DropdownItem>
            <DropdownItem name="logout" divided>退出登录</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Avatar src="../static/avatar.jpg" size="large" />
      </div>
    </div> -->
    <div class="main">
      <Row type="flex" justify="center" class="main-top">
        <Col span="12">
          <Card>
            <Row type="flex">
              <Col span="4">
                <Row type="flex" align="middle">
                  <img class="avator" src="../assets/avatar.jpg" />
                </Row>
              </Col>
              <Col span="20">
                <Row type="flex" align="middle">
                  <div class="user-name">
                    <a href="javascript:;" @click="toPersonal">{{userInfo.userName}}</a>
                    <span>{{userInfo.userName}}</span>
                  </div>
                </Row>
                <Row>
                    <div class="line-gray"></div>
                    <Row class="margin-top">
                      <Col span="5">
                        <p>上次登录时间:</p>
                      </Col>
                      <Col span="19">{{userInfo.loginTime}}</Col>
                    </Row>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row type="flex" justify="center" class="main-bot">
        <Col span="12">
          <Row :gutter="16">
            <Col span="12" @click.native="handleClickOne" v-show="showOne">
              <Card class="card_one">
                <Row type="flex" align="middle">
                  <Col span="8">
                    <div class="icon_one">
                      <Icon type="ios-folder" size="40" class="icon_l"></Icon>
                    </div>
                  </Col>
                  <Col span="14">
                    <span>case主页</span>
                  </Col>
                  <Col span="2">
                    <Icon type="android-arrow-forward" class="icon_r"></Icon>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span="12" @click.native="handleClickTwo"  v-show="showTwo">
              <Card class="card_two">
                <Row type="flex" align="middle">
                  <Col span="8">
                    <div class="icon_two">
                      <Icon type="ios-paper" size="40" class="icon_l"></Icon>
                    </div>
                  </Col>
                  <Col span="14">
                    <div>
                      <span>协查请求主页</span>
                    </div>
                  </Col>
                  <Col span="2">
                    <Icon type="android-arrow-forward" class="icon_r"></Icon>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
    <div class="copyright">
      2017 &copy; DHL International GmbH. All rights reserved.
    </div>
  </div>
</template>

<script>
import Header from './common/Header.vue'
export default {
  name: 'NewIndex',
  components:{
    Header
  },
  data () {
    return {
      showOne: false,
      showTwo: false,
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  methods: {
    handleClickOne () {
      if(this.$store.state.userInfo.roleId === 12) {
        this.$router.push("/index/viewall")
      }else {
        this.$router.push("/index");
      }
    },
    handleClickTwo () {
      if(this.$store.state.userInfo.roleId === 12) {
        this.$router.push("/assistindex/viewall")
      }else {
        this.$router.push("/assistindex");
      }
    },
    // handleUserInfoDropdown(name) {
    //   if (name === "personal") {
    //     this.$router.push("/index/personal");
    //   } else if (name === "logout") {
    //     this.$store.commit("logout");
    //     this.$http.post(this.$store.state.api.loginController.logout());
    //     this.$router.push("/login");
    //   }
    // },
    toPersonal () {
      this.$router.push('/personal')
    }
  },
  created () {
    if (!this.$store.state.isLogin) {
      const storageUserInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (storageUserInfo) {
        this.$store.commit("refresh", storageUserInfo);
      } else {
        this.$router.push("/login");
      }
    }
    if (this.$store.state.userInfo.roleId === 14) {
      this.showTwo = true
    }else if(this.$store.state.userInfo.roleId === 1) {
      this.showOne = true
    }else {
      this.showOne = true
      this.showTwo = true
    }
  },
}
</script>

<style scoped>
  .avator {
    height: 100px;
    width: 100px;
  }
  .user-name {
    margin-left: 20px;
    margin-top: 10px;
  }
  .user-name a {
    color: #2d8cf0;
    font-size: 25px;
    font-weight: bold;
  }
  .line-gray {
    margin-top: 10px;
    width: auto;
    height: 0;
    border-bottom: 2px solid #dcdcdc;
  }
  .margin-top {
    margin-top: 10px;
  }
  .card_one {
    background: #2C8CF0;
    font-size: 20px!important;
    cursor: pointer;
  }
  .card_two{
    background: #ff9900;
    font-size: 20px!important;
    cursor: pointer;
  }
  .main-bot {
    color: #fff;
  }

  /* .header {
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
  } */
  .main {
    width: 100%;
    position: fixed;
    padding-top: 150px;
  }
  .main-top {
    margin-bottom: 20px;
  }
  .copyright {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%);
    color: #9ea7b4;
  }
  .icon_one {
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-radius: 50%;
    background: #237FE2;
  }
  .icon_two {
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-radius: 50%;
    background: #EE8F01;
  }
  .icon_one .icon_l {
    vertical-align: middle;
  }
  .icon_two .icon_l {
    vertical-align: middle;
  }
</style>
