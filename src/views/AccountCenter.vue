<template>
  <div class="info">
    <div class="title">
      账号信息
    </div>
    <div class="body">
      <el-avatar :size="80" :src="avatarUrl" />
      <div class="right">
        <div class="item" v-for="(value, key) in info" :key="key">
          <span>{{ key }}</span>
          <span class="value">{{ value }}</span>
          <el-icon>
            <IEpEdit />
          </el-icon>
        </div>
      </div>
    </div>
  </div>
  <div class="setting">

  </div>
</template>

<script setup>
const avatarUrl = ''
const info = {
  '用户名': '用户名',
  '真实姓名': '111',
  '手机号码': '1111',
  '邮箱': '111'
}
</script>

<style scoped>
.info {
  margin: 10px 14px;

  .title {
    padding: 20px;
    background-color: #fff;
    border-radius: 4px 4px 0 0;
  }
  .body {
    padding: 20px 10px;
    margin-top: 2px;
    background-color: #fff;
    display: flex;
    flex-direction: row;
    border-radius: 0 0 4px 4px;

    .right {
      flex: 1;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      .item {
        flex: 1;
        color: #55585f;
        font-size: 12px;
        display: flex;
        align-items: center;
        .value {
         margin: 0 18px;
         color: #0b1019;
        }
      }
    }
  }
}

</style>