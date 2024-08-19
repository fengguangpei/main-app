<template>
  <!-- 员工概况 -->
  <div class="employee">
    <div class="employee-title twoLines" v-tip>员工概括</div>
    <div class="employee-box">
      <div v-for="item of employees" :key="item.name" class="employee-item" @click="redirectDetail">
        <div class="icon" :style="{ 'background-color': item.color }">
          <i :class="['iconfont', item.icon]"></i>
        </div>
        <div class="count">
          {{ item.count }}
        </div>
        <div class="name">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const $router = useRouter()
const employees = reactive([
  {
    name: '在职员工',
    icon: '',
    count: 0,
    color: '#2561ef'
  },
  {
    name: '待入职员工',
    icon: 'icon-yuangong',
    count: 0,
    color: '#666ee8'
  },
  {
    name: '试用期员工',
    icon: '',
    count: 0,
    color: '#3DD4A7'
  },
  {
    name: '正式员工',
    icon: '',
    count: 0,
    color: '#fa746b'
  },
  {
    name: '待离职员工',
    icon: '',
    count: 0,
    color: '#fddb78'
  },
  {
    name: '已离职员工',
    icon: '',
    count: 0,
    color: '#ccc'
  }
])
const redirectDetail = () => {
  $router.push({
    path: '/CarManage/123'
  })
}
</script>

<style scoped lang="scss">
.employee {
  padding: 20px;
  border: 1px solid #e2e2e2;
  background-color: #fff;

  &-title {
    width: 100px;
    line-height: 18px;
    color: #0b1019;
    font-weight: 600;
  }

  &-box {
    display: flex;
    margin-top: 30px;
  }

  &-item {
    flex: 1;
    border: 1px solid #f2f2f2;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    border-radius: 4px;
    cursor: pointer;

    .icon {
      width: 40px;
      height: 40px;
      position: absolute;
      top: -20px;
      left: calc(50% - 20px);
      border-radius: 4px;
      line-height: 40px;
      text-align: center;
      color: #fff;

      .iconfont {
        font-size: 22px;
      }
    }

    .count {
      color: #333;
      font-size: 24px;
      font-weight: 600;
    }

    .name {
      line-height: 32px;
      font-size: 12px;
      color: #999;
    }
  }

  &-item + &-item {
    margin-left: 20px;
  }
}
</style>
