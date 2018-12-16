<template>
  <div class="main">
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
    <Header></Header>
    <Row class="row">
      <Col span="4" class="col">
        <Menu width="auto" @on-select="routeTo" :active-name="$router.history.current.path">
          <div @click="handleReturnNewIndex" class="reindex">
            <Icon type="ios-arrow-thin-left" class="icon" size="20"></Icon>
            <span>返回首页</span>
          </div>
          <template v-for="item in assistmenuList">
            <MenuGroup :title="item.title" :key="item.title">
              <template v-for="subitem in item.children">
                <MenuItem :name="subitem.href" :key="subitem.href">
                  <Icon :type="subitem.icon" :key="subitem.icon"></Icon>
                  {{subitem.title}}
                </MenuItem>
              </template>
            </MenuGroup>
          </template>
        </Menu>
      </Col>
      <Col span="20" class="col">
        <div class="main-content">
          <Breadcrumb class="breadcrumb">
            <BreadcrumbItem>ERS</BreadcrumbItem>
            <template v-for="item in breadcrumbList">
              <BreadcrumbItem :to="item.href" :key="item.href">{{item.title}}</BreadcrumbItem>
            </template>
          </Breadcrumb>
          <div class="content">
            <router-view></router-view>
          </div>
          <div class="copyright">
            2017 &copy; DHL International GmbH. All rights reserved.
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
  import Header from './common/Header.vue'
  export default {
    components:{
      Header
    },
    data() {
      return {
        assistmenuList: []
      };
    },
    computed: {
      breadcrumbList() {
        return this.$store.state.breadcrumbList;
      },
      userInfo() {
        return this.$store.state.userInfo;
      }
    },
    methods: {
      handleReturnNewIndex () {
        this.$router.push("/newindex");
      },
      routeTo(href) {
        this.$store.commit("navigateToAssist", href);
        this.$router.push(href);
      },
      // handleUserInfoDropdown(name) {
      //   if (name === "personal") {
      //     this.$router.push("/index/personal");
      //   } else if (name === "logout") {
      //     this.$store.commit("logout");
      //     this.$http.post(this.$store.state.api.loginController.logout());
      //     this.$router.push("/login");
      //   }
      // }
    },
    created() {
      //刷新页面保留登录状态
      if (!this.$store.state.isLogin) {
        const storageUserInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (storageUserInfo) {
          this.$store.commit("refresh", storageUserInfo);
        } else {
          this.$router.push("/login");
        }
      }

      //没有系统管理权限则隐藏系统下的导航
      this.assistmenuList = JSON.parse(JSON.stringify(this.$store.state.assistmenuList));
      if (!this.$store.state.getPrivilegeByCode("SIDEBAR_USER_MANAGEMENT")) {
        const systemIndex = this.$store.state.assistmenuList.findIndex(item => {
          return item.title === "系统";
        });
        if (systemIndex >= 0) {
          this.assistmenuList.splice(systemIndex, 1);
        }
      }
      if (!this.$store.state.getPrivilegeByCode("SIDEBAR_CASE_ALL")) {
        this.assistmenuList[2].children.splice(3, 1);
      }
      //如果是电话客服只留下查看所有case
      if (this.$store.state.userInfo.roleId === 12) {
        this.assistmenuList = [
          {
            title: "查看",
            children: [
              {
                title: "查看所有协查请求",
                icon: "ios-list",
                href: "/assistindex/viewall"
              }
            ]
          }
        ];
      }
      //如果id=2 删除新建协查请求模块
      if (this.$store.state.userInfo.roleId !== 14) {
        this.assistmenuList.splice(1, 1)
      }
    }
  };
</script>

<style scoped>
  .main {
    width: 100%;
    height: 100%;
  }
  .row {
    height: 100%;
  }
  .col {
    height: 100%;
  }
  .ivu-menu {
    height: 100%;
    padding-top: 60px;
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
  .main-content {
    position: absolute;
    top: 60px;
    width: 100%;
    height: calc(100% - 60px);
    padding: 20px;
    overflow: auto;
  }
  .breadcrumb {
    margin-left: 20px;
    margin-bottom: 20px;
  }
  .content {
    width: 100%;
    min-height: calc(100% - 60px);
    background: #fff;
    border-radius: 10px;
  }
  .copyright {
    text-align: center;
    padding: 10px 0 0;
    color: #9ea7b4;
  }
  .reindex {
    width: 100%;
    height: 50px;
    line-height: 50px;
    padding-left: 28px;
    cursor: pointer;
  }
  .icon {
    margin-right: 20px;
    font-weight: 900;
    vertical-align: middle;
  }
</style>
