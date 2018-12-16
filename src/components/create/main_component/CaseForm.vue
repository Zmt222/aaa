<template>
  <div>
    <Form :model="createForm" ref="createForm" :rules="createFormRules" :label-width="100">
      <Row class="row">
        <Col>
          <h3 class="caption">运单信息</h3>
        </Col>
      </Row>
      <Row>
        <Col span="7" offset="5">
        <FormItem label="运单号码" prop="waybillCode">
          <Input v-model.trim="createForm.waybillCode"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="升级原因" prop="upgradeReason">
          <Select v-model="createForm.upgradeReason">
            <Option v-for="item in configure.upgradeReasons" :value="item.reason" :key="item.id">{{item.reason}}</Option>
          </Select>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="7" offset="5">
        <FormItem label="要求放行日期" prop="releaseDate">
          <DatePicker type="date" v-model="createForm.releaseDate" :options="dateOptions.afterTody" class="long"></DatePicker>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="到货日期" prop="arrivalDate">
          <DatePicker type="date" v-model="createForm.arrivalDate" :options="dateOptions.beforeTody" class="long"></DatePicker>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="14" offset="5">
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
        <Col span="7" offset="5">
        <FormItem label="客联小组" prop="groupId" v-if="$store.state.userInfo.groups.length">
          <Select v-model="createForm.groupId" @on-change="changeGroupId">
            <Option v-for="item in groupList" :key="item.groupName" :value="item.groupId">{{item.groupName}}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="客联主管" prop="directorCode" v-if="$store.state.userInfo.groups.length">
          <Select v-model="createForm.directorCode" @on-change="changeDirectorCode">
            <Option v-for="item in directorList" :key="item.userName" :value="item.userCode">{{item.userName}}</Option>
          </Select>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="7" offset="5">
        <FormItem label="提交人" prop="creator">
          <Input disabled v-model="createForm.creator"></Input>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="跟进人" prop="followCode" v-if="$store.state.userInfo.roleId !== 1">
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
        <Col span="7" offset="5">
        <FormItem label="登记日期" prop="createDate">
          <DatePicker v-model="createForm.createDate" type="date" disabled class="long"></DatePicker>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="清关状态" prop="clearanceStatus">
          <Select v-model="createForm.clearanceStatus" placement="top">
            <Option v-for="item in configure.clearanceStatus" :value="item.name" :key="item.id">{{item.name}}</Option>
          </Select>
        </FormItem>
        </Col>
      </Row>
      <Row class="bottom">
        <Col span="14" offset="5">
        <FormItem label="留言" prop="followPostil">
          <Input type="textarea" v-model.trim="createForm.followPostil"></Input>
        </FormItem>
        <Button type="primary" class="center" @click="submit" :loading="loading">提交</Button>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
  export default {
    name: "caseForm",
    data() {
      const validNumber = (rule, value, callback) => {
        if (/^[0-9]+$/.test(value)) {
          callback();
        } else {
          callback("运单号必须为数字");
        }
      };
      return {
        createForm: {
          waybillCode: "",
          upgradeReason: "",
          releaseDate: "",
          arrivalDate: "",
          customerInfo: "",
          groupName: "",
          directorCode: "",
          directorName: "",
          creator: "",
          followCode: "",
          followName: "",
          createDate: new Date(),
          clearanceStatus: "",
          followPostil: "",
          groupId: ""
        },
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
          groupId: [
            {
              required: true,
              type: "number",
              message: "客联小组不能为空",
              trigger: "blur"
            }
          ],
          directorCode: [
            {
              required: true,
              message: "客联主管不能为空",
              trigger: "change"
            }
          ],
          creator: [{ required: true, message: "提交人不能为空", trigger: "blur" }],
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
      groupList() {
        let groups = [];
        return this.configure.groups.filter(item => {
          if (groups.indexOf(item.groupId) === -1) {
            groups.push(item.groupId);
            return true;
          } else {
            return false;
          }
        });
      },
      directorList() {
        return this.configure.groups.filter(item => {
          return item.groupId === this.createForm.groupId;
        });
      },
      configure() {
        return this.$store.state.configure;
      }
    },
    methods: {
      changeGroupId(id) {
        this.createForm.groupName = this.configure.groups.find(item => {
          return item.groupId === id;
        }).groupName;
      },
      changeDirectorCode(code) {
        this.createForm.directorName = this.configure.groups.find(item => {
          return item.userCode === code;
        }).userName;
      },
      changeFollowCode(userCode) {
        this.createForm.followName = this.configure.followUsers.find(item => {
          return item.userCode === userCode;
        }).userName;
      },
      submit() {
        this.$refs.createForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$http
              .post(
                this.$store.state.api.flowPathController.addFlowPath(),
                this.createForm
              )
              .then(res => {
                this.loading = false;
                if (res.data.result) {
                  this.$Notice.success({
                    title: "新建成功",
                    desc: res.data.message,
                    duration: 3
                  });
                  if (res.data.data === "pending") {
                    this.$store.commit("navigateTo", "/index/check");
                    this.$router.push("/index/check");
                  } else {
                    this.$store.commit("navigateTo", "/index/findall");
                    this.$router.push("/index/findall");
                  }
                } else {
                  this.$Notice.error({
                    title: "新建失败",
                    desc: res.data.message,
                    duration: 3
                  });
                }
              });
          }
        });
      }
    },
    created() {
      //初始化提交人信息
      this.createForm.creator = this.$store.state.userInfo.userName;
      //刷新公共配置
      this.$store.dispatch("getConfigure");
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
    left: 48%;
  }

  .bottom {
    padding-bottom: 20px;
  }
</style>
