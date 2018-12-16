<template>
  <div>
    <Row type="flex" justify="center" class="row">
      <Col span="22">
      <Table :columns="columns" :data="data" ref="dataTable" :loading="loading"></Table>
      </Col>
    </Row>
    <edit-form-modal :data="editItem" :fileData="fileVo" :configure="configure" :editModal="editModal"
                     @updateModel="editModal=false" @submit="editSubmit" @cancel="editCancel"
                     :type="type" @refresh="refresh" :followUsersArr="followUsersArr"></edit-form-modal>
    <check-form-modal :data="checkItem" :configure="configure" :checkModal="checkModal" @submit="checkSubmit"
                      @cancel="checkCancel" :followUsersArr="followUsersArr"></check-form-modal>
    <delete-form-modal :data="deleteItem" :deleteModal="deleteModal" @submit="deleteSubmit" @cancel="deleteCancel" :type="type"></delete-form-modal>
  </div>
</template>

<script>
  import ExpandRow from "./ExpandRow.vue";
  import EditFormModal from "./EditFormModal.vue";
  import CheckFormModal from "./CheckFormModal.vue";
  import DeleteFormModal from "./DeleteFormModal.vue"

  export default {
    name: "dataTable",
    components: {
      ExpandRow,
      EditFormModal,
      CheckFormModal,
      DeleteFormModal,
    },
    props: {
      data: Array,
      type: String,
      loading: Boolean
    },
    data() {
      return {
        followUsersArr: [],
        statusMap: {
          first: {
            text: "一级响应",
            color: "blue"
          },
          second: {
            text: "二级响应",
            color: "yellow"
          },
          third: {
            text: "三级响应",
            color: "red"
          },
          pending: {
            text: "待审核",
            color: "default"
          },
          progress: {
            text: "进行中",
            color: "green"
          },
          close: {
            text: "已关闭",
            color: "red"
          },
          delete: {
            text: "已退回",
            color: "default"
          }
        },
        editModal: false,
        checkModal: false,
        editItem: {},
        fileVo: [],
        Modal: false,
        checkItem: {},
        deleteModal: false,
        deleteItem: {},
        columns: [
          {
            type: "expand",
            width: 50,
            render: (h, params) => {
              return h(ExpandRow, {
                props: {
                  data: params.row
                }
              });
            }
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            width: 150,
            render: (h, params) => {
              const status = params.row.status;
              const color = this.statusMap[status].color;
              const text = this.statusMap[status].text;
              return h(
                "Tag",
                {
                  props: {
                    color: color,
                    type: "dot"
                  }
                },
                text
              );
            }
          },
          {
            title: "运单号码",
            key: "waybillCode",
            align: "center"
          },
          {
            title: "要求核查完成日期",
            key: "releaseDate",
            align: "center"
          },
          {
            title: "升级原因",
            key: "upgradeReason",
            align: "center"
          },
          // {
          //   title: "客户信息",
          //   key: "customerInfo",
          //   align: "center"
          // },
          {
            title: "当前负责人",
            key: "followName",
            align: "center"
          },
          {
            title: "操作",
            key: "operation",
            width: this.type === "check" ? 180 : 130,
            align: "center",
            render: (h, params) => {
              // const failText = params.row.status === "pending" ? "退回" : "关闭";
              const failText = this.type === 'check' ? "退回" : "关闭";
              // const editText = params.row.status === "pending" ? "修改" : "管理";
              const editText = this.type === 'check' ? "修改" : "管理";
              return h("div",[
                // h(
                //   "Button",
                //   {
                //     props: {
                //       type: "success",
                //       size: "small",
                //     },
                //     style: {
                //       marginRight: "5px",
                //       display:
                //         this.$store.state.userInfo.roleId !== 14?(this.type==='check'? 'inline-block':'none'):(this.type==='check'? 'none':'none')
                //     },
                //     on: {
                //       click: () => {
                //         this.check(params.row);
                //         this.$http.post(this.$store.state.api.systemController.flowCommon(),{id:params.row.id})
                //           .then((res)=>{
                //             this.followUsersArr = res.data.followUsers
                //           })
                //       }
                //     }
                //   },
                //   "通过"
                // ),
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px",
                      display: 'inline-block'
                    },
                    on: {
                      click: () => {
                        this.edit(params.row);
                        this.$http.post(this.$store.state.api.systemController.flowCommon(),{id:params.row.id})
                          .then((res)=>{
                            this.followUsersArr = res.data.followUsers
                          })
                      }
                    }
                  },
                  editText
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px",
                      display: 'inline-block'
                    },
                    on: {
                      click: () => {
                        this.delete(params.row);
                      }
                    }
                  },
                  failText
                )
              ]);
            }
          }
        ]
      };
    },
    computed: {
      configure() {
        return this.$store.state.configure;
      }
    },
    methods: {
      edit(data) {
        this.editItem = data;
        this.editModal = true;
        this.fileVo = data.fileVo;
      },
      editCancel() {
        this.editModal = false;
      },
      check(data) {
        this.checkItem = data;
        this.checkModal = true;
      },
      checkCancel() {
        this.checkModal = false;
      },
      delete(data) {
        this.deleteItem = data;
        this.deleteModal = true;
      },
      deleteCancel() {
        this.deleteModal = false;
      },
      editSubmit(result) {
        if (result==='成功') {
          this.editModal = false;
          this.$Notice.success({
            title: "修改成功",
            desc: "该协查请求已成功修改！",
            duration: 3
          });
          this.$emit("refresh");
        } else {
          this.$Notice.error({
            title: "修改失败",
            desc: `该协查请求修改失败，${result}`,
            duration: 3
          });
        }
      },
      refresh(){
        this.$emit("refresh");
      },
      checkSubmit(result) {
        if (result==='成功') {
          this.checkModal = false;
          this.$Notice.success({
            title: "审核通过",
            desc: "该协查请求审核通过！",
            duration: 3
          });
          this.$emit("refresh");
        } else {
          this.$Notice.error({
            title: "审核失败",
            desc: `该协查请求审核失败，${result}`,
            duration: 3
          });
        }
      },
      deleteSubmit(result) {
        const noticeTitle = this.type === "check" ? "退回" : "关闭";
        if (result) {
          this.deleteModal = false;
          this.$Notice.success({
            title: `协查请求${noticeTitle}`,
            desc: `该协查请求已${noticeTitle}，转移到历史记录中！`,
            duration: 3
          });
          this.$emit("refresh");
        } else {
          this.$Notice.error({
            title: `协查请求${noticeTitle}失败`,
            desc: `该协查请求${noticeTitle}失败，请重试！`,
            duration: 3
          });
        }
      }
    },
    created() {
      //普通客联取消所有操作权限
      if (this.$store.state.userInfo.roleId === 1) {
        const operationIndex = this.columns.findIndex(item => {
          return item.key === "operation";
        });
        this.columns.splice(operationIndex, 1);
      }
      //历史记录或浏览所有取消操作权限
      if (this.type === "history" || this.type === "viewAll") {
        const operationIndex = this.columns.findIndex(item => {
          return item.key === "operation";
        });
        this.columns.splice(operationIndex, 1);
      }
      //刷新公共配置
      this.$store.dispatch("getConfigure");
    }
  };
</script>

<style scoped>
  .row {
    padding-top: 20px;
  }
</style>
