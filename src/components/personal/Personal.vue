<template>
  <div>
    <Header></Header>
    <Row type="flex" justify="center">
      <Col span="16">
      <h1 class="title">个人中心</h1>
      <Form :label-width="300">
        <Row type="flex" justify="center">
          <Col span="24">
          <FormItem label="姓名:">
            <span>{{userInfo.userName}}</span>
          </FormItem>
          <FormItem label="职位:">
            <span>{{userInfo.role.roleName}}</span>
          </FormItem>
          <FormItem label="电话:">
            <span>{{userInfo.mobile}}</span>
          </FormItem>
          <FormItem label="邮箱:">
            <span>{{userInfo.email}}</span>
          </FormItem>
          <FormItem label="客联小组:" v-if="userInfo.groups.length">
            <span>{{groupName}} </span>
          </FormItem>
          <FormItem label="登录密码:">
            <a href="javascript:;" @click="editPassword">修改密码</a>
          </FormItem>
          </Col>
        </Row>
      </Form>
      </Col>
    </Row>
    <Modal v-model="editPasswordModal" :closable='false' :mask-closable=false :width="500">
      <h3 slot="header">修改密码</h3>
      <Row type="flex" justify="center">
        <Col span="22">
        <Form ref="editPasswordForm" :model="editPasswordForm" :label-width="100" :rules="editPasswordFormRules">
          <FormItem label="原密码" prop="originalPassword">
            <Input type="password" v-model.trim="editPasswordForm.originalPassword" placeholder="请输入现在使用的密码"></Input>
          </FormItem>
          <FormItem label="新密码" prop="newPassword">
            <Input type="password" v-model.trim="editPasswordForm.newPassword" placeholder="请输入新密码，至少6位字符"></Input>
          </FormItem>
          <FormItem label="确认新密码" prop="confirmPassword">
            <Input type="password" v-model.trim="editPasswordForm.confirmPassword" placeholder="请再次输入新密码"></Input>
          </FormItem>
        </Form>
        </Col>
      </Row>
      <div slot="footer">
        <Button type="text" @click="cancelEditPassword">取消</Button>
        <Button type="primary" @click="saveEditPassword" :loading="loading">修改</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Header from '../common/Header.vue'
  export default {
    data() {
      const valideRePassword = (rule, value, callback) => {
        if (value !== this.editPasswordForm.newPassword) {
          callback(new Error("两次输入密码不一致"));
        } else {
          callback();
        }
      };

      return {
        loading: false,
        editPasswordModal: false,
        editPasswordForm: {
          originalPassword: "",
          newPassword: "",
          confirmPassword: ""
        },
        editPasswordFormRules: {
          originalPassword: [
            { required: true, message: "请输入原密码", trigger: "blur" }
          ],
          newPassword: [
            { required: true, message: "请输入新密码", trigger: "blur" },
            { min: 6, message: "请至少输入6个字符", trigger: "blur" },
            { max: 32, message: "最多输入32个字符", trigger: "blur" }
          ],
          confirmPassword: [
            { required: true, message: "请再次输入新密码", trigger: "blur" },
            { validator: valideRePassword, trigger: "blur" }
          ]
        }
      };
    },
    components:{
      Header
    },
    computed: {
      userInfo() {
        return this.$store.state.userInfo;
      },
      groupName() {
        return [
          ...new Set(
            this.userInfo.groups.map(item => {
              return item.groupName;
            })
          )
        ].join("，");
      }
    },
    methods: {
      editPassword() {
        this.editPasswordModal = true;
      },
      cancelEditPassword() {
        this.$refs.editPasswordForm.resetFields();
        this.editPasswordModal = false;
      },
      saveEditPassword() {
        this.$refs.editPasswordForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$http
              .post(
                this.$store.state.api.userController.updatePassword(),
                this.editPasswordForm
              )
              .then(res => {
                this.loading = false;
                if (res.data.result) {
                  this.$refs.editPasswordForm.resetFields();
                  this.editPasswordModal = false;
                  this.$Notice.success({
                    title: "密码修改成功",
                    desc: res.data.message,
                    duration: 3
                  });
                } else {
                  this.$Notice.error({
                    title: "密码修改失败",
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
      }
    }
  };
</script>

<style scoped>
  .title {
    margin-top: 100px;
    margin-bottom: 80px;
    text-align: center;
  }
</style>