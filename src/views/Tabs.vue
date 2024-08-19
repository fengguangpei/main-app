<template>
  <div class="tabs">
    <router-link v-for="item of statusTabs" :key="item.name" :to="item.path">
      <div class="box" :class="item.class" @click="changeTab(item.name)">
        <div class="tab-item" :class="item.class">
          {{ item.text }}
          <el-icon
            v-if="item.name !== 'HomePage'"
            class="close"
            @click.prevent.stop="closeTab(item.name, $router)"
          >
            <IEpClose />
          </el-icon>
          <i v-if="item.line" class="iconfont icon-vertical_line line"></i>
        </div>
      </div>
      <div class="white"></div>
    </router-link>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useTabsStore } from '../stores/tabs.js'

const tabsInstance = useTabsStore()
const { changeTab, closeTab } = tabsInstance
const { statusTabs } = storeToRefs(tabsInstance)
</script>

<style lang="scss" scoped>
$positions: (
  'active': 6px 6px 0 0,
  'activeLeft': 0 0 6px 0,
  'activeRight': 0 0 0 6px
);
@each $p, $value in $positions {
  .#{$p} {
    border-radius: $value;
  }
}

.tabs {
  background-color: #252c38;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  height: 38px;
  padding-top: 6px;
  z-index: 9997;

  a {
    text-decoration: none;
  }

  .pre-line {
    height: 100%;
    width: 12px;
    background-color: #eef0f5;
  }

  .box {
    background-image: linear-gradient(#eef0f5, #fff);
    position: relative;
  }

  .tab-item {
    background-color: #252c38;
    height: 36px;
    font-size: 12px;
    display: block;
    line-height: 36px;
    color: hsl(0deg 0% 100% / 80%);
    cursor: pointer;
    min-width: 120px;
    padding: 0 25px 0 16px;
    box-sizing: border-box;
    user-select: none;
    text-align: left;
    white-space: nowrap;
    max-width: 130px;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;

    .close {
      visibility: hidden;
      font-size: 16px;
      position: absolute;
      top: 10px;
      right: 10px;
      color: hsl(0deg 0% 100% / 60%);
      background: hsl(0deg 0% 100% / 16%);
      border-radius: 50%;

      svg {
        width: 12px;
        height: 12px;
      }
    }

    &:hover {
      .close {
        visibility: visible;
      }
    }

    .line {
      position: absolute;
      right: -6px;
      font-size: 18px;
      color: hsl(0deg 0% 100% / 40%);
    }
  }

  .activedItem {
    color: #333;
    background-color: #fff;
    border-radius: 6px 6px 0 0;

    .close {
      color: #333;
      visibility: visible;

      &:hover {
        background-color: #f0f2f5;
      }
    }
  }
}
</style>
