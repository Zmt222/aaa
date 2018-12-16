<template>
  <div class="create-user">
    <Row type="flex" justify="center">
      <Col span="8">
      <Form ref="createForm" :model="createForm" :rules="createFormRules" :label-width="80">
        <FormItem label="角色" prop="roleId">
          <Select v-model="createForm.roleId" placeholder="请选择用户角色">
            <Option v-for="item in configure.roleList" :value="item.id" :key="item.id">{{item.roleName}}</Option>
          </Select>
        </FormItem>
        <FormItem label="客联小组" prop="groupId" v-if="createForm.roleId===1">
          <Select v-model="createForm.groupId" placeholder="请选择客联小组">
            <Option v-for="item in configure.groupList" :value="item.id" :key="item.id">{{item.groupName}}</Option>
          </Select>
        </FormItem>
        <FormItem label="客联小组" prop="groupIds" v-if="createForm.roleId===2">
          <CheckboxGroup v-model="createForm.groupIds">
            <Checkbox v-for="item in configure.groupList" :label="item.groupId" :key="item.id">{{item.groupName}}</Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="账号" prop="userCode">
          <Input v-model.trim="createForm.userCode" placeholder="请输入用户账号"></Input>
        </FormItem>
        <FormItem label="姓名" prop="userName">
          <Input v-model.trim="createForm.userName" placeholder="请输入用户姓名"></Input>
        </FormItem>
        <FormItem label="称谓" prop="nickName" v-if="createForm.roleId!==1">
          <Input v-model.trim="createForm.nickName" placeholder="请输入用户称谓"></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input v-model.trim="createForm.password" placeholder="请输入用户密码"></Input>
        </FormItem>
        <FormItem label="手机" prop="mobile">
          <Input v-model.trim="createForm.mobile" placeholder="请输入用户手机号"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input v-model.trim="createForm.email" placeholder="请输入用户电子邮箱"></Input>
        </FormItem>
        <FormItem>
          <Button type="ghost" @click="handleReset">重置</Button>
          <Button type="primary" @click="handleSubmit" :loading="loading" class="ml">提交</Button>
        </FormItem>
      </Form>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        createForm: {

          userName: "",
          nickName: "",
          password: "",
          userCode: "",
          email: "",
          mobile: "",
          roleId: "",
          groupId: "",
          groupIds: []
        },
        createFormRules: {
          userCode: [{ required: true, message: "账号不能为空", trigger: "blur" }],
          userName: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
          nickName: [{ required: true, message: "称谓不能为空", trigger: "blur" }],
          password: [{ required: true, message: "用户密码不能为空", trigger: "blur" }],
          email: [
            { required: true, message: "邮箱不能为空", trigger: "blur" },
            { type: "email", message: "非正确的邮箱格式", trigger: "blur" }
          ],
          mobile: [{ required: true, message: "手机号不能为空", trigger: "blur" }],
          roleId: [
            {
              required: true,
              type: "number",
              message: "请选择用户角色",
              trigger: "change"
            }
          ],
          groupId: [
            {
              required: true,
              type: "number",
              message: "请选择客联小组",
              trigger: "change"
            }
          ],
          groupIds: [
            {
              required: true,
              type: "array",
              min: 1,
              message: "请选择至少一个客联小组",
              trigger: "change"
            }
          ]
        },
        configure: {
          roleList: [],
          groupList: []
        },
        loading: false
      };
    },
    methods: {
      handleSubmit() {
        this.$refs.createForm.validate(valid => {
          if (valid) {
            this.loading = true;
            if (this.createForm.roleId === 1) {
              this.createForm.nickName = this.createForm.userName;
            }
            this.$http
              .post(
                this.$store.state.api.userController.addUser(),
                this.createForm
              )
              .then(res => {
                this.loading = false;
                if (res.data.result) {
                  this.$refs.createForm.resetFields();
                  this.createForm.nickName = "";
                  this.$Notice.success({
                    title: "创建成功",
                    desc: res.data.message,
                    duration: 3
                  });
                } else {
                  this.$Notice.error({
                    title: "创建失败",
                    desc: res.data.message,
                    duration: 3
                  });
                }
              })
              .catch(() => {
                this.loading = false;
              });
          }
        });
      },
      handleReset() {
        this.$refs.createForm.resetFields();
      }
    },
    created: function() {
      //如果没有系统管理权限，则重定向到首页
      if (!this.$store.state.getPrivilegeByCode("SIDEBAR_USER_MANAGEMENT")) {
        this.$router.push("/index/home");
      }
      //获取角色配置
      this.$http
        .post(this.$store.state.api.roleController.getRole())
        .then(res => {
          if (res.data.result) {
            this.configure.roleList = res.data.data;
          } else {
            this.$Message.error("获取配置失败");
          }
        });
      //获取小组配置
      this.$http
        .post(this.$store.state.api.loginController.listGroup())
        .then(res => {
          if (res.data.result) {
            this.configure.groupList = res.data.data;
          } else {
            this.$Message.error("获取配置失败");
          }
        });
    }
  };
</script>

<style scoped>
  .create-user {
    padding-top: 100px;
  }
  .ml {
    margin-left: 8px;
  }
</style>
