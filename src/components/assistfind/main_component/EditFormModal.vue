<template>
  <div>
    <Modal :value="editModal" title="待审核协查请求" width="800" @on-cancel="cancel">
      <Form :model="createForm" ref="createForm" :rules="createFormRules" :label-width="140">
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
            <FormItem label="要求核查完成日期" prop="releaseDate">
              <DatePicker type="date" v-model="createForm.releaseDate" :options="dateOptions.afterToday"
                          class="long"></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="18" offset="3">
            <FormItem label="检查类型" prop="upgradeReason">
              <Select v-model="createForm.upgradeReason">
                <Option v-for="item in this.$store.state.assistConfigure.upgradeReasons" :value="item.reason"
                        :key="item.id">
                  {{item.reason}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row v-if="false">
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
                <Option v-for="item in followUsersArr" :value="item.userCode" :key="item.userCode">{{item.userName}}</Option>
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
            <DatePicker v-model="createForm.createDate" type="date"  disabled class="long"></DatePicker>
          </FormItem>
          </Col>
          <Col span="9">
          <FormItem label="审核状态" prop="clearanceStatus">
            <Select v-model="createForm.clearanceStatus" placement="top">
              <Option v-for="item in configure.clearanceStatus" :value="item.name" :key="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row v-if="this.type==='check'">
          <Col span="18" offset="3">
            <FormItem label="所需材料" prop="followPostil">
              <Input type="textarea" v-model.trim="createForm.followPostil"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <!--<h3 class="caption">{{this.type==='check'?'附件上传':'已上传附件'}}</h3>-->
            <h3 class="caption">附件上传</h3>
          </Col>
        </Row>
        <!--<Row v-if="this.type==='check'">-->
          <!--<Col span="18" :offset="3">-->
            <!--<Table :columns="columns1" :data="data1"></Table>-->
          <!--</Col>-->
        <!--</Row>-->
        <Row>
          <Col span="18" :offset="3">
            <Table :columns="columns1" :data="data1"></Table>
          </Col>
        </Row>
        <!--<Row v-else-if="this.type==='findAll'">-->
          <!--<Col span="18" :offset="3" >-->
            <!--<Table :columns="getColumns(item)" :data="item.fileList" v-for="(item,index) in fileData" :key="index">-->
            <!--</Table>-->
          <!--</Col>-->
        <!--</Row>-->
        <Row  class="bottom" v-if="this.type==='check'">
          <Col span="18" :offset="3">
            <div class="btn-box">
              <Button icon="plus" type="success" @click="handleAdd">添加文件</Button>
            </div>
          </Col>
        </Row>
        <Row v-if="this.type==='findAll'" style="margin-top: 20px">
          <Col span="18" offset="2">
            <FormItem label="反馈留言" prop="followPostil">
              <Input type="textarea" v-model.trim="createForm.followPostil"></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer" v-if="this.type==='check'">
        <Row type="flex" justify="center">
          <Col span="3">
          <Button @click="cancel">取消</Button>
          </Col>
          <Col span="3">
          <Button :type="type==='check'?'primary':'success'" @click="submit" :loading="loading">
            {{this.type==='check'?'提交':'通过'}}
          </Button>
          </Col>
        </Row>
      </div>
      <div slot="footer" v-else-if="this.type==='findAll'">
        <Row type="flex" justify="center">
          <Col span="3">
            <Button @click="deleteSubmit" type="success">关闭并通过</Button>
          </Col>
          <Col span="3">
            <Button type="primary" @click="submit" :loading="loading">
              反馈
            </Button>
          </Col>
        </Row>
      </div>
    </Modal>
  </div>
</template>

<script>
  // import ExpandRow from "./ExpandRow.vue"
  export default {
    name: "editFormModal",
    props: {
      editModal: Boolean,
      type: String,
      data: Object,
      configure: Object,
      assistConfigure: Object,
      fileData : Array,
      followUsersArr: Array
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
        show: true,
        fileArray:[],
        fileName:'',
        fileTrueName: [],
        fileServerName:[],
        Base_Url: Base_Url+this.$store.state.api.uploadFileController.upload(),
        // components: {ExpandRow},
        createFormRules: {
          waybillCode: [
            { required: true, message: "单号不能为空", trigger: "blur" },
            { validator: validNumber, trigger: "blur" },
            { len: 10, message: "单号必须为十位数字", trigger: "blur" }
          ],
          releaseDate: [
            {required: true, type: "date", message: "核查完成日期不能为空", trigger: "blur"}
          ],
          upgradeReason: [
            {required: true, message: "检查要求不能为空", trigger: "change"}
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
              message: "登记日期不能为空",
              trigger: "blur"
            }
          ],
          clearanceStatus: [
            { required: true, message: "审核状态不能为空", trigger: "change" }
          ],
          followPostil: [{ required: true, message: "留言不能为空", trigger: "blur" }]
        },
        dateOptions: {
          afterToday: {
            disabledDate(date) {
              return date && date.valueOf() < Date.now();
            }
          },
          beforeToday: {
            disabledDate(date) {
              return date && date.valueOf() > Date.now();
            }
          }
        },
        loading: false,
        columns1: [
          {
            title: '文件名',
            key: 'filename',
            align: "center",
            render: (h, params) => {
              return h('div', [
                h('Input', {
                  props:{
                    value: this.fileTrueName[params.index]
                  },
                  on: {
                    input: (event)=>{
                       this.fileTrueName[params.index] = event;
                    }
                  }
                })
              ]);
            }
          },
          {
            title: '上传文件',
            key: 'load',
            align: "center",
            render: (h, params) => {
              return h('Upload',{
                style: {
                  position:'relative'
                },
                props:{
                  showUploadList:false,
                  action: this.Base_Url,
                  name:'files',
                  onSuccess: (response,file)=> {
                    this.fileServerName[params.index] = response.data[0];
                    this.$Notice.success({
                        title: "文件上传成功",
                        desc: "成功！",
                        duration: 3
                      });
                   // this.fileServerName = response.data[0]
                    //this.data1[params.index].fileTrueName = ;
                    this.data1[params.index].filename = file.name;
                }
                }
              }
              ,[
                  h('Input',{
                    props:{
                      value:this.data1[params.index].filename
                    }
                  }),
                  h('Button',{
                    props: {
                      size: 'small',
                    },
                    style: {
                      position: 'absolute',
                      top:'50%',
                      right:'5px',
                      transform:'translateY(-50%)',
                      backgroundColor: '#6B6B6B',
                      color: '#fff'
                    }
                  },'选择')
              ])
            }
          },
          {
            title: '操作',
            key: 'action',
            align: "center",
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          },
        ],
        data1: [
          {
            filename:'',
            load:'',
            actions: ''
          }
        ],
        data2: this.fileData
      };
    },
    computed: {
      createForm() {
        let newData = Object.assign({}, this.data);
        console.log(newData.releaseDate)
        // newData.releaseDate = newData.releaseDate;
        console.log(newData)
        //如果为待审核协查请求，清空跟进人
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
      checkFile(_file){
        // https://ers.csmc-cloud.com
        let url=window.location.origin+this.$store.state.api.uploadFileController.download()+`?fileServerName=${_file.fileServerName}&fileTrueName=${_file.fileTrueName}`
        window.open(url,'_blank')
      },
      getColumns(_item){
        return [
          {
            title:'上传人:'+_item.userName,
            key: 'fileTrueName',
            align: 'start',
            render: (h, params)=>{
              return h('div',[
                params.row.fileTrueName,
                h('Button', {
                  props: {
                    size: 'small',
                    align:'end'
                  },
                  style: {
                    float: 'right',
                    backgroundColor: '#6B6B6B',
                    color: '#fff'
                  },
                  on: {
                    click: () => {
                      this.checkFile(params.row)
                    }
                  }
                }, '查看')
              ]);
            }
          },
          {
            title:'上传日期:'+_item.uploadDate,
            key: '',
            align: 'start'
          },
        ]
      },
      changeFollowCode(userCode) {
        const followUser = this.followUsersArr.find(item => {
          return item.userCode === userCode;
        });
        if (followUser) {
          this.createForm.followName = followUser.userName;
        }
      },
      submit() {
        this.$refs.createForm.validate(valid => {
          if (valid) {
            this.data1.forEach((item, index) => {
              this.fileArray.push({fileServerName: this.fileServerName[index], fileTrueName: this.fileTrueName[index]})
            })

            var isSubmitFlag = false;
            //
            // //只要发现空的框 就false;不让提交
            // this.fileArray.forEach((obj) => {
            //   if (obj.fileTrueName == undefined || obj.fileTrueName === '' || obj.fileServerName == undefined) {
            //     isSubmitFlag = false;
            //   }
            // })
            // //有几个全未空的上传框
            // var sumOfNull = 0;
            // console.log(this.fileArray)
            //
            // if (this.type === 'findAll') {
            //   isSubmitFlag = true;
            // }else if(this.fileArray.length >= 1) {//大于1时 只要发现全为空，允许提交
            //   this.fileArray.forEach((item, index) => {
            //     if ((item.fileTrueName == '' || item.fileTrueName == undefined)
            //       && item.fileServerName == undefined) {
            //       console.log(item)
            //       console.log((item.fileTrueName === '' || item.fileTrueName == undefined))
            //       sumOfNull++;
            //       isSubmitFlag = true;
            //       console.log(sumOfNull);
            //     }
            //   });
            //   //如果发现空的行 == 存在的行，就说明全空，允许提交
            //   if (sumOfNull == this.data1.length) {
            //     isSubmitFlag = true;
            //   }
            // }
            //
            // //没有上传文件框 允许提交
            // if(this.fileArray.length == 0){
            //   isSubmitFlag = true;
            // }

            //在待审核协查页面判断文件名和文件提交是否符合要求
            if(this.type === 'check') {
              this.fileArray.forEach((obj)=>{
                if((obj.fileTrueName === ''||obj.fileTrueName == undefined) && obj.fileServerName != undefined){
                  //当文件名为空且文件不为空
                  isSubmitFlag = false;
                }else if((obj.fileTrueName !== ''|| obj.fileTrueName != undefined) && obj.fileServerName == undefined){
                  //当文件名不为空且文件为空
                  isSubmitFlag = false;
                }else{
                  isSubmitFlag = true;
                }
              })
            }
            if (isSubmitFlag) {
              this.createForm.uploadFileVO = JSON.stringify(this.fileArray);
              this.loading = true;
              let url =
                this.type === "check"
                  ? this.$store.state.api.flowPathController.updateFlowPath()
                  : this.$store.state.api.flowPathController.updateDocument();
              this.$http
                .post(
                  url,
                  this.createForm
                )
                .then(res => {
                  this.loading = false;
                  if (res.data.result) {
                    this.$refs.createForm.resetFields();
                    this.$emit("submit", res.data.message);
                    //this.fileArray=[]
                  } else {
                    this.$emit("submit", res.data.message);
                    //this.fileArray=[]
                  }
                })
                .catch(() => {
                  this.loading = false;
                });
              this.initData();
            } else {
              this.$Notice.error({
                title: "提交失败",
                desc: "文件名或文件不能为空！",
                duration: 3
              });
              //清空fileArray
              this.fileArray = [];
            }
          }


        });
      },
      cancel() {
        this.initData();
        this.$emit("cancel");
      },
      initData(){
        this.data1 =  [
          {
            filename:'',
            load:'',
            actions: ''
          }
        ];
        this.fileTrueName = [];
        this.fileServerName = [];
        this.fileArray = [];

      },
      deleteSubmit(a) {
        this.$refs.createForm.validate(valid => {
          if (valid) {
            this.$http
              .post(this.$store.state.api.flowPathController.closeFlowPath(), this.createForm)
              .then(()=>{
                if (a) {
                  this.$emit('updateModel')
                  this.$Notice.success({
                    title: `协查请求关闭`,
                    desc: `该协查请求已关闭，转移到历史记录中！`,
                    duration: 3
                  });
                  this.$emit("refresh");
                } else {
                  this.$Notice.error({
                    title: `协查请求关闭失败`,
                    desc: `该协查请求关闭失败，请重试！`,
                    duration: 3
                  });
                }
              })
              .catch(() => {
                this.loading = false;
              });
          }
        })
      },
      handleAdd() {
        this.fileServerName.push(
          {}
        )
        this.data1.push({
          filename: '',
          upload: '',
          actions: ''
        })
      },
      remove(index) {
        this.data1.splice(index,1)
      },
    }
  }
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
  .btn-box {
    border: 1px solid #ddd;
    border-top: none;
    height: 50px;
    align-items: center;
    display: flex;
    justify-content: center;
  }
</style>
