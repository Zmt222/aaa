
<template>
  <div>
    <Row class="expand-row">
      <Col span="8">
      <span>提交人: </span>
      <span>{{data.createUserName}}</span>
      </Col>
      <Col span="8">
      <span>登记日期: </span>
      <span>{{data.createDate}}</span>
      </Col>
      <Col span="8">
      <span>到货日期: </span>
      <span>{{data.arrivalDate}}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="8">
      <span>清关状态: </span>
      <span>{{data.clearanceStatus}}</span>
      </Col>
      <Col span="8" v-if="data.groupName">
      <span>客联小组: </span>
      <span>{{data.groupName}}</span>
      </Col>
      <Col span="8" v-if="data.directorName">
      <span>客联主管: </span>
      <span>{{data.directorName}}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="24">
      <span>客户信息: </span>
      <span>{{data.customerInfo}}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="24">
      <span>留言({{data.flowPathHistories.length}}条) : </span>
      </Col>
    </Row>
    <template v-for="item in data.flowPathHistories">
      <Row class="expand-row" :key="item.id">
        <Col span="3">
        <span class="remarks">{{item.updateUserName}}: </span>
        </Col>
        <Col offset="17" span="4">
        <span>发布于: {{item.updateDate}}</span>
        </Col>
      </Row>
      <Row class="expand-row" :key="item.id">
        <Col span="24">
        <span>{{item.followPostil}}</span>
        </Col>
      </Row>
    </template>
  </div>
</template>

<script>
  export default {
    props: {
      data: Object
    }
  };
</script>

<style scoped>
  .expand-row {
    margin-bottom: 16px;
  }
  .remarks {
    font-weight: bold;
  }
</style>