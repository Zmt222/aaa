<template>
  <div>
    <Modal :value="checkModal" title="CASE 审核窗口" @on-cancel="cancel">
      <Form :label-width="60" :model="checkForm" ref="checkForm" :rules="checkFormRules">
        <Row type="flex" justify="center">
          <Col span="18">
          <FormItem label="跟进人" prop="followCode">
            <Select v-model="checkForm.followCode" @on-change="changeFollowCode">
              <Option v-for="item in configure.followUsers" :value="item.userCode" :key="item.userCode">{{item.userName}}</Option>
            </Select>
          </FormItem>
          <FormItem label="留言" prop="followPostil">
            <Input type="textarea" v-model.trim="checkForm.followPostil"></Input>
          </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Row>
          <Col offset="17" span="3">
          <Button @click="cancel">取消</Button>
          </Col>
          <Col span="3">
          <Button type="success" @click="pass" :loading="loading">通过</Button>
          </Col>
        </Row>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "checkFormModal",
    props: {
      checkModal: Boolean,
      data: Object,
      configure: Object
    },
    data() {
      return {
        checkForm: {
          followCode: "",
          followName: "",
          followPostil: ""
        },
        checkFormRules: {
          followCode: [{ required: true, message: "跟进人不能为空", trigger: "change" }],
          followPostil: [{ required: true, message: "留言不能为空", trigger: "blur" }]
        },
        loading: false
      };
    },
    methods: {
      changeFollowCode(userCode) {
        const followUser = this.configure.followUsers.find(item => {
          return item.userCode === userCode;
        });
        if (followUser) {
          this.checkForm.followName = followUser.userName;
        }
      },
      pass() {
        this.$refs.checkForm.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$http
              .post(
                this.$store.state.api.flowPathController.updateFlowPath(),
                Object.assign(this.data, this.checkForm)
              )
              .then(res => {
                this.loading = false;
                if (res.data.result) {
                  this.$refs.checkForm.resetFields();
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
        this.$refs.checkForm.resetFields();
        this.$emit("cancel");
      }
    }
  };
</script>