<template>
  <Card>
    <p slot="title">
      <Icon type="document-text"></Icon>
      协查请求 日志
    </p>
    <div v-if="loading">
      <p class="loading">loading......</p>
    </div>
    <template v-else-if="logCardList.length">
      <div v-for="(item, itemIndex) in logCardList" :key="item.waybillCode">
        <h3 class="caption ml">运单号码：
          <a @click="choose(item)">{{item.waybillCode}}</a>
        </h3>
        <Timeline class="ml">
          <TimelineItem v-for="(operation, index) in item.flowPathHistories" :color="showColor(operation.status, item.flowPathHistories[index-1])" :key="operation.id">
            <p class="log-title">该协查请求{{showOperation(operation.status, item.flowPathHistories[index-1])}}</p>
            <p class="log-content">操作人： {{operation.updateUserName}}</p>
            <p class="log-content">操作时间： {{operation.updateDate}}</p>
            <p class="log-content">备注： {{operation.followPostil}}</p>
          </TimelineItem>
        </Timeline>
        <div class="divide" v-if="itemIndex !== logCardList.length - 1"></div>
      </div>
    </template>
    <div v-else>
      <p class="loading">当前无可查看日志</p>
    </div>
  </Card>
</template>

<script>
  export default {
    name: "logCard",
    data() {
      return {
        logCardList: [],
        loading: false
      };
    },
    methods: {
      getList() {
        this.loading = true;
        let data = {
          pageNumber: 0,
          userCode: this.$store.state.userInfo.userCode,
          orderName: "updateDate",
          order: "DESC",
          flag:'1'
        };
        this.$http
          .post(
            this.$store.state.api.flowPathController.listBySidebarStatus(),
            data
          )
          .then(res => {
            this.loading = false;
            if (res.data.result) {
              this.logCardList = res.data.data.content;
            } else {
              this.$Message.error("获取日志失败");
            }
          })
          .catch(() => {
            this.loading = false;
          });
      },
      showOperation(status, last) {
        const operationMap = {
          pending: "提交成功!",
          delete: "审核失败！",
          success: "审核成功！",
          progress: "更新成功！",
          close: "关闭成功！",
          first: "升级为一级响应！",
          second: "升级为二级响应！",
          third: "升级为三级响应！"
        };
        if (last && last.status === "pending" && status === "progress") {
          status = "success";
        } else if (
          !last &&
          (status === "progress" ||
            status === "first" ||
            status === "second" ||
            status === "third")
        ) {
          status = "pending";
        }
        return operationMap[status];
      },
      showColor(status, last) {
        const colorMap = {
          pending: "green",
          delete: "red",
          success: "green",
          progress: "green",
          close: "red",
          first: "blue",
          second: "blue",
          third: "blue"
        };
        if (last && last.status === "pending" && status === "progress") {
          status = "success";
        } else if (
          !last &&
          (status === "progress" ||
            status === "first" ||
            status === "second" ||
            status === "third")
        ) {
          status = "pending";
        }
        return colorMap[status];
      },
      choose(item) {
        const lastStatus =
          item.flowPathHistories[item.flowPathHistories.length - 1].status;
        this.$store.commit("search", {
          searchWaybillCode: item.waybillCode
        });
        if (lastStatus === "close" || lastStatus === "delete") {
          this.$store.commit("navigateToAssist", "/assistindex/history");
          this.$router.push("/assistindex/history");
        } else if (lastStatus === "pending") {
          this.$store.commit("navigateToAssist", "/assistindex/check");
          this.$router.push("/assistindex/check");
        } else {
          this.$store.commit("navigateToAssist", "/assistindex/findall");
          this.$router.push("/assistindex/findall");
        }
      }
    },
    created() {
      this.getList();
    }
  };
</script>

<style scoped>
  .caption {
    margin-bottom: 10px;
  }
  .log-title {
    font-size: 14px;
    font-weight: bold;
    padding-left: 20px;
    line-height: 200%;
  }
  .log-content {
    padding-left: 25px;
    line-height: 200%;
  }
  .divide {
    width: 95%;
    margin: 0 auto;
    border-bottom: 1px #aaa solid;
    margin-bottom: 30px;
  }
  .ml {
    margin-left: 30px;
  }
  .loading {
    font-size: 20px;
    text-align: center;
  }
</style>
