<template>
  <div class="login-page">
    <div class="login-header">
      <div class="logo">
        <img src="../assets/logo.png" height="20" width="214">
      </div>
    </div>
    <div class="main">
      <Card dis-hover class="card">
        <p slot="title">
          <Icon type="log-in"></Icon>
          ERS 登录
        </p>
        <Row type="flex" justify="center">
          <Col span="24">
          <Form ref="loginForm" :model="loginForm" :rules="loginFormRules">
            <FormItem prop="userCode">
              <Input placeholder="账号" v-model.trim="loginForm.userCode" class="input" @on-enter="login"></Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" placeholder="密码" v-model.trim="loginForm.password" class="input" @on-enter="login"></Input>
            </FormItem>
            <FormItem>
              <Button @click="login" long class="btn" :loading="loading">登录</Button>
            </FormItem>
          </Form>
          </Col>
        </Row>
      </Card>
    </div>
    <div class="copyright">
      2017 &copy; DHL International GmbH. All rights reserved.
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        loginForm: {
          userCode: "",
          password: ""
        },
        loginFormRules: {
          userCode: [
            { required: true, message: "账号不能为空", trigger: "blur" }
          ],
          password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
        }
      };
    },
    methods: {
      login() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$http
              .post(this.$store.state.api.loginController.login(), this.loginForm)
              .then(res => {
                this.loading = false;
                if (res.data.result) {
                  this.$store.commit("login", res.data.data);
                  this.$Message.success("登陆成功");
                  this.$router.push("/newindex");
                } else {
                  this.$Message.error("登陆失败，请检查账号密码");
                }
              })
              .catch(err => {
                this.loading = false;
              });
          }
        });
      }
    },
    created() {
      const storageUserInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (storageUserInfo) {
        this.$store.commit("login", storageUserInfo);
        this.$router.push("/index/home");
      }
    }
  };
</script>

<style scoped>
  .login-page {
    height: 100%;
    width: 100%;
    background: url(./../assets/login_bg.jpg) no-repeat center 0;
    background-size: cover;
  }
  .login-header {
    position: absolute;
    top: 10%;
    left: 50%;
    height: 100px;
    width: 86%;
    transform: translate(-50%, -50%);
    background: url(./../assets/bg_header.png) repeat 0 0;
  }
  .logo {
    margin: 20px 0 0 25px;
  }
  .main {
    position: absolute;
    top: 30%;
    right: 7%;
    width: 300px;
  }
  .card {
    background: #ffcc00;
    border: none;
    border-radius: 0;
  }
  .btn {
    border: none;
    background: #cc0202;
    color: #fff;
  }
  .btn:hover {
    color: #fff !important;
    background: #cc0202 !important;
  }
  .copyright {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%);
    color: #9ea7b4;
  }
</style>
