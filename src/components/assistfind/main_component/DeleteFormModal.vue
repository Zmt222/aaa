<template>
  <div>
    <Modal :value="deleteModal" title="协查请求管理窗口" @on-cancel="cancel">
      <Form :model="deleteFrom" ref="deleteFrom" :rules="deleteFromRules" :label-width="50">
        <Row type="flex" justify="center">
          <Col span="18">
          <FormItem label="留言" prop="followPostil">
            <Input type="textarea" v-model.trim="deleteFrom.followPostil"></Input>
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
          <Button type="primary" @click="del" :loading="loading">确定</Button>
          </Col>
        </Row>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "deleteFormModal",
    props: {
      data: Object,
      deleteModal: Boolean,
      type: String
    },
    data() {
      return {
        deleteFrom: {
          followPostil: ""
        },
        deleteFromRules: {
          followPostil: [{ required: true, message: "留言不能为空", trigger: "blur" }]
        },
        loading: false
      };
    },
    methods: {
      del() {
        this.$refs.deleteFrom.validate(valid => {
          if (valid) {
            this.loading = true;
            this.$http
              .post(this.$store.state.api.flowPathController.closeFlowPath(), {
                id: this.data.id,
                followPostil: this.deleteFrom.followPostil
              })
              .then(res => {
                this.loading = false;
                if (res.data.result) {
                  this.$refs.deleteFrom.resetFields();
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
        this.$refs.deleteFrom.resetFields();
        this.$emit("cancel");
      }
    }
  };
</script>
