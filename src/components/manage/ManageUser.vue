<template>
  <div class="box">
    <div class="add">
      <Button type="success" @click="create">添加用户</Button>
      <Row class="row">
        <Col offset="1" span="5">
        <Input v-model.trim="searchContent" @on-enter="search" icon="search" placeholder="按回车进行搜索" style="width: 200px"></Input>
        </Col>
      </Row>
    </div>
    <Table stripe border ref="userForm" :columns="columns" :data="data" :loading="loading"></Table>
    <Page :current="currentPage+1" :total="totalElements" show-elevator show-total class="page" @on-change="changePage"></Page>
    <edit-user-info-form :editData="editItem" :editModal="editModal" @submit="editSubmit" @cancel="editCancel"></edit-user-info-form>
  </div>
</template>

<script>
  import EditUserInfoForm from "./main_component/EditUserInfoForm.vue";
  export default {
    components: {
      EditUserInfoForm
    },
    data() {
      return {
        data: [],
        loading: false,
        searchContent: "",
        currentPage: 0,
        totalElements: 0,
        editModal: false,
        editItem: {},
        columns: [
          {
            type: "index",
            width: 60,
            align: "center"
          },
          {
            title: "用户账号",
            key: "userCode",
            align: "center"
          },
          {
            title: "姓名",
            key: "userName",
            align: "center",
            width: 100
          },
          {
            title: "称谓",
            key: "nickName",
            align: "center"
          },
          {
            title: "客联组",
            key: "groupName",
            align: "center"
          },
          {
            title: "手机",
            key: "mobile",
            align: "center",
            width: 130
          },
          {
            title: "邮箱",
            key: "email",
            align: "center",
            width: 150
          },
          {
            title: "角色",
            key: "roleName",
            align: "center"
          },
          {
            title: "操作",
            key: "action",
            width: 130,
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "8px"
                    },
                    on: {
                      click: () => {
                        this.edit(params.row);
                      }
                    }
                  },
                  "修改"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.delete(params.row.id);
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        ]
      };
    },
    methods: {
      getList() {
        this.loading = true;
        this.$http
          .post(this.$store.state.api.userController.listUsers(), {
            pageNumber: this.currentPage,
            userName: this.searchContent
          })
          .then(res => {
            this.loading = false;
            if (res.data.result) {
              if (!res.data.data.content.length && this.currentPage !== 0) {
                this.currentPage -= 1;
                this.getList();
              } else {
                this.data = res.data.data.content;
                this.totalElements = res.data.data.totalElements;
                this.data.forEach(item => {
                  item.roleName = item.role.roleName;
                  if (item.groups && item.groups.length) {
                    item.groupName = [
                      ...new Set(
                        item.groups.map(item => {
                          return item.groupName;
                        })
                      )
                    ].join("，");
                  } else {
                    item.groupName = "无";
                  }
                });
              }
            } else {
              this.$Message.error("获取数据失败");
            }
          })
          .catch(() => {
            this.loading = false;
          });
      },
      create() {
        console.log(this.$router.history.current.path)
        let url = this.$router.history.current.path
        if(url==='/assistindex/manageuser'){
          this.$store.commit("navigateToAssist", "/assistindex/createuser");
          this.$router.push("/assistindex/createuser");
        }else {
          this.$store.commit("navigateTo", "/index/createuser");
          this.$router.push("/index/createuser");
        }

      },
      search() {
        this.currentPage = 0;
        this.getList();
      },
      changePage(page) {
        this.currentPage = page - 1;
        this.getList();
      },
      edit(data) {
        this.editItem = Object.assign({}, data);
        this.editItem.groups = data.groups.slice();
        this.editModal = true;
      },
      editCancel() {
        this.editModal = false;
      },
      editSubmit(result) {
        if (result) {
          this.editModal = false;
          this.$Notice.success({
            title: "修改成功",
            desc: "用户信息已成功修改！",
            duration: 3
          });
          this.getList();
        } else {
          this.$Notice.error({
            title: "修改失败",
            desc: "用户信息修改失败！",
            duration: 3
          });
        }
      },
      delete(id) {
        this.$Modal.confirm({
          title: "删除确认",
          content: "<p>您确定删除该用户吗？</p>",
          loading: true,
          onOk: () => {
            this.$http
              .post(this.$store.state.api.userController.deleteUser(), {
                id
              })
              .then(res => {
                this.$Modal.remove();
                if (res.data.result) {
                  this.getList();
                  this.$Notice.success({
                    title: "删除成功",
                    desc: "删除用户成功！",
                    duration: 3
                  });
                  if (id === this.$store.state.userInfo.id) {
                    this.$store.commit("logout");
                    this.$http.post(
                      this.$store.state.api.loginController.logout()
                    );
                    this.$router.push("/login");
                  }
                } else {
                  this.$Notice.error({
                    title: "删除失败",
                    desc: "删除用户失败！",
                    duration: 3
                  });
                }
              });
          }
        });
      }
    },
    created: function() {
      //如果没有系统管理权限，则重定向到首页
      if (!this.$store.state.getPrivilegeByCode("SIDEBAR_USER_MANAGEMENT")) {
        this.$router.push("/index/home");
      }
      this.getList();
    }
  };
</script>

<style scoped>
  .row {
    float: right;
    padding-right: 10px;
  }
  .user {
    line-height: 30px;
    border-bottom: 1px solid #f2f3f5;
    padding-left: 20px;
  }
  .add {
    padding-bottom: 30px;
  }
  .box {
    position: relative;
    padding: 30px 40px 55px;
    min-height: 670px;
  }
  .page {
    position: absolute;
    bottom: 10px;
    right: 45px;
  }
</style>
