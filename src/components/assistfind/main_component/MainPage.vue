<template>
  <div class="main">
    <Row class="row">
      <Col offset="1" span="4">
      <Select class="long" placeholder="状态" v-model="status" @on-change="search">
        <Option v-for="item in searchStatusList" :key="item.value" :value="item.value">{{item.title}}</Option>
      </Select>
      </Col>
      <Col span="4">
      <DatePicker type="date" class="long" placeholder="起始日期" v-model="start"></DatePicker>
      </Col>
      <Col span="4">
      <DatePicker type="date" class="long" placeholder="终止日期" v-model="end"></DatePicker>
      </Col>
      <Col span="4">
      <Input v-model.trim="keyword" placeholder="搜索内容" class="long" @on-enter="getList"></Input>
      </Col>
      <Col span="2">
      <Button type="info" @click="search" class="long">
        搜索
        <Icon type="search"></Icon>
      </Button>
      </Col>
      <Col span="2" offset="2">
      <Button type="primary" @click="create" class="long" v-if="type==='check'||type==='findAll'"
              v-show="this.$store.state.userInfo.roleId === 14">
        创建
        <Icon type="plus-round"></Icon>
      </Button>
      <Button type="primary" @click="download" class="long" v-if="type==='history'">
        下载
        <Icon type="ios-download"></Icon>
      </Button>
      </Col>
    </Row>
    <data-table :data="data" :type="type" :loading="loading" @refresh="refresh"></data-table>
    <Page :current="currentPage+1" :total="totalElements" show-elevator show-total class="page" @on-change="changePage"></Page>
  </div>
</template>

<script>
  import DataTable from "./DataTable.vue";

  export default {
    name: "mainPage",
    props: {
      type: String,
      searchStatusList: Array,
      defaultStatus: String,
      orderName: String,
      order: String
    },
    components: {
      DataTable
    },
    data() {
      return {
        data: [],
        loading: false,
        status: this.defaultStatus,
        start: "",
        end: "",
        keyword: "",
        currentPage: 0,
        totalElements: 0
      };
    },
    methods: {
      getList({ status, start, end, keyword, pageNumber, pageSize = 10 } = {}) {
        this.loading = true;
        let url =
          this.type === "viewAll"
            ? this.$store.state.api.flowPathController.allFlowPath()
            : this.$store.state.api.flowPathController.listBySidebarStatus();
        let data = {
          status: status || this.status,
          start: start || this.start,
          end: end || this.end,
          content: keyword || this.keyword,
          pageNumber: pageNumber || this.currentPage,
          pageSize,
          orderName: this.orderName,
          order: this.order,
          flag:'1'
        };
        if (data.status === "all") {
          data.status = "";
        }
        this.$http
          .post(url, data)
          .then(res => {
            this.loading = false;
            if (res.data.result) {
              if (!res.data.data.content.length && this.currentPage !== 0) {
                this.currentPage -= 1;
                this.getList();
              } else {
                this.data = res.data.data.content;
                this.totalElements = res.data.data.totalElements;
              }
            } else {
              this.$Message.error("获取数据失败");
            }
          })
          .catch(() => {
            this.loading = false;
          });
      },
      search() {
        this.currentPage = 0;
        this.getList();
      },
      create() {
        this.$store.commit("navigateToAssist", "/assistindex/create");
        this.$router.push("/assistindex/create");
      },
      refresh() {
        this.getList();
      },
      changePage(page) {
        this.currentPage = page - 1;
        this.getList();
      },
      download() {
        const start = this.start ? this.formatDate(this.start) : "";
        const end = this.end ? this.formatDate(this.end) : "";
        const url =
          this.$store.state.api.flowPathController.flowPathHistoryExport() +
          `?start=${start}&end=${end}&content=${this.keyword}&flag=1`;
        location.href = url;
      },
      formatDate(date) {
        return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
          .map(item => {
            if (item < 10) {
              return "0" + item;
            } else {
              return "" + item;
            }
          })
          .join("-");
      }
    },
    created() {
      //初始化搜索状态
      this.status = this.$store.state.searchStatus || this.status;
      this.keyword = this.$store.state.searchWaybillCode;
      this.$store.commit("resetSearch");
      //初始化列表数据
      this.getList();
    }
  };
</script>

<style scoped>
  .main {
    position: relative;
    padding-top: 10px;
    padding-bottom: 55px;
    min-height: 670px;
  }
  .row {
    padding-top: 20px;
  }
  .long {
    width: 90%;
  }
  .page {
    position: absolute;
    bottom: 10px;
    right: 45px;
  }
</style>
