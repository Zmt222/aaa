<template>
  <div>
    <Modal :value="editModal" title="修改CASE" width="800" @on-cancel="cancel">
      <Form :model="createForm" ref="createForm" :rules="createFormRules" :label-width="100">
        <Row class="row">
          <Col>
          <h3 class="caption">运单信息</h3>
          </Col>
        </Row>
        <Row>
          <Col span="9" offset="3">
          <FormItem label="运单号码" prop="waybillCode">
            <Input v-model.trim="createForm.waybillCode"></Input>
          </FormItem>
          </Col>
          <Col span="9">
          <FormItem label="升级原因" prop="upgradeReason">
            <Select v-model="createForm.upgradeReason">
              <Option v-for="item in configure.upgradeReasons" :value="item.reason" :key="item.id">{{item.reason}}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="9" offset="3">
          <FormItem label="要求放行日期" prop="releaseDate">
            <DatePicker type="date" v-model="createForm.releaseDate" :options="dateOptions.afterTody" class="long"></DatePicker>
          </FormItem>
          </Col>
          <Col span="9">
          <FormItem label="到货日期" prop="arrivalDate">
            <DatePicker type="date" v-model="createForm.arrivalDate" :options="dateOptions.beforeTody" class="long"></DatePicker>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="18" offset="3">
          <FormItem label="客户信息" prop="customerInfo">
            <Input v-model.trim="createForm.customerInfo"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
          <h3 class="caption">客联人员信息</h3>
          </Col>
        </Row>
        <Row>
          <Col span="9" offset="3">
          <FormItem label="客联小组" prop="groupName" v-if="createForm.groupName">
            <Input v-model.trim="createForm.groupName" disabled></Input>
          </FormItem>
          </Col>
          <Col span="9">
          <FormItem label="客联主管" prop="directorName" v-if="createForm.directorName">
            <Input v-model.trim="createForm.directorName" disabled></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="9" offset="3">
          <FormItem label="提交人" prop="createUserName">
            <Input v-model.trim="createForm.createUserName" disabled></Input>
          </FormItem>
          </Col>
          <Col span="9">
          <FormItem label="跟进人" prop="followCode">
            <Select v-model="createForm.followCode" @on-change="changeFollowCode">
              <Option v-for="item in configure.followUsers" :value="item.userCode" :key="item.userCode">{{item.userName}}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
          <h3 class="caption">登记信息</h3>
          </Col>
        </Row>
        <Row>
          <Col span="9" offset="3">
          <FormItem label="登记日期" prop="createDate">
            <DatePicker v-model="createForm.createDate" type="date" disabled class="long"></DatePicker>
          </FormItem>
          </Col>
          <Col span="9">
          <FormItem label="清关状态" prop="clearanceStatus">
            <Select v-model="createForm.clearanceStatus" placement="top">
              <Option v-for="item in configure.clearanceStatus" :value="item.name" :key="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row class="bottom">
          <Col span="18" offset="3">
          <FormItem label="留言" prop="followPostil">
            <Input type="textarea" v-model.trim="createForm.followPostil"></Input>
          </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Row type="flex" justify="center">
          <Col span="3">
          <Button @click="cancel">取消</Button>
          </Col>
          <Col span="3">
          <Button :type="type==='check'?'success':'primary'" @click="submit" :loading="loading">{{this.type==='check'?'通过':'管理'}}</Button>
          </Col>
        </Row>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "editFormModal",
    props: {
      editModal: Boolean,
      type: String,
      data: Object,
      configure: Object
    },
    data() {
      const validNumber = (rule, value, callback) => {
        if (/^[0-9]+$/.test(value)) {
          callback();
        } else {
          callback("运单号必须为数字");
        }
      };
      return {
        createFormRules: {
          waybillCode: [
            { required: true, message: "单号不能为空", trigger: "blur" },
            { validator: validNumber, trigger: "blur" },
            { len: 10, message: "单号必须为十位数字", trigger: "blur" }
          ],
          upgradeReason: [
            { required: true, message: "原因不能为空", trigger: "change" }
          ],
          releaseDate: [
            {
              required: true,
              type: "date",
              message: "要求放行日期不能为空",
              trigger: "change"
            }
          ],
          arrivalDate: [
            {
              required: true,
              type: "date",
              message: "到货日期不能为空",
              trigger: "change"
            }
          ],
          customerInfo: [
            { required: true, message: "客户信息不能为空", trigger: "blur" }
          ],
          groupName: [{ required: true, message: "客联小组不能为空", trigger: "blur" }],
          directorName: [
            { required: true, message: "客联主管不能为空", trigger: "blur" }
          ],
          createUserName: [
            { required: true, message: "提交人不能为空", trigger: "blur" }
          ],
          followCode: [{ required: true, message: "跟进人不能为空", trigger: "change" }],
          createDate: [
            {
              required: true,
              type: "date",
              message: "提交日期不能为空",
              trigger: "blur"
            }
          ],
          clearanceStatus: [
            { required: true, message: "清关状态不能为空", trigger: "change" }
          ],
          followPostil: [{ required: true, message: "留言不能为空", trigger: "blur" }]
        },
        dateOptions: {
          afterTody: {
            disabledDate(date) {
              return date && date.valueOf() < Date.now();
            }
          },
          beforeTody: {
            disabledDate(date) {
              return date && date.valueOf() > Date.now();
            }
          }
        },
        loading: false
      };
    },
    computed: {
      createForm() {
        let newData = Object.assign({}, this.data);
        //如果为待审核case，清空跟进人
        if (this.type === "check") {
          newData.followCode = "";
          newData.followName = "";
        }
        //清空留言
        newData.followPostil = "";
        return newData;
      }
    },
    methods: {
      changeFollowCode(userCode) {
        const followUser = this.configure.followUsers.find(item => {
          return item.userCode === userCode;
        });
        if (followUser) {
          this.createForm.followName = followUser.userName;
        }
      },
      submit() {
        this.$refs.createForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$http
              .post(
                this.$store.state.api.flowPathController.updateFlowPath(),
                this.createForm
              )
              .then(res => {
                this.loading = false;
                if (res.data.result) {
                  this.$refs.createForm.resetFields();
                  this.$emit("submit", true);
                } else {
                  this.$emit("submit", false);
                }
              })
              .catch(() => {
                this.loading = false;
              });
          }
        });
      },
      cancel() {
        this.$emit("cancel");
      }
    }
  };
</script>

<style scoped>
  .row {
    margin-top: 40px;
  }
  .caption {
    margin: 20px 0;
    text-align: center;
  }
  .long {
    width: 100%;
  }
  .center {
    position: relative;
    left: 30%;
  }
  .bottom {
    margin-bottom: 20px;
  }
</style>