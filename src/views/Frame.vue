<template>
  <div class="frame">
    <!-- 一级菜单 -->
    <div class="aside">
      <img src="../assets/images/favicon.png" alt="" />
      <div
        v-for="item of aside"
        :key="item.name"
        :class="{
          group: true,
          'aside-item': true,
          'aside-item__active': item.name === (showMenu ? focusTab : activeAside)
        }"
        @click="changeFocusTab(item.name), changeMenu(true)"
      >
        <i :class="['iconfont', item.icon]"></i>
        <span>
          {{ item.text }}
        </span>
      </div>
    </div>
    <!-- 二级菜单 -->
    <transition name="collapse">
      <div class="menu" v-show="showMenu">
        <div class="menu-box" v-for="item of menu" :key="item.name">
          <div class="menu-box__title">
            {{ item.text }}
          </div>
          <router-link v-for="child of item.children" :to="child.path" :key="child.name">
            <div class="menu-box__item" @click="changeMenu(false)">
              {{ child.text }}
            </div>
          </router-link>
        </div>
      </div>
    </transition>
    <!-- 主体 -->
    <div class="main">
      <tabs></tabs>
      <div class="body">
        <router-view v-slot="{ Component }">
          <keep-alive :include="keepAlive">
            <component :is="Component"></component>
          </keep-alive>
        </router-view>
        <!-- 微应用 -->
        <div id="micro-one" class="oa-width-100p oa-height-100p" v-show="activeAside === 'Card'"></div>
      </div>
      <div class="mask" v-show="showMenu" @click.stop="changeMenu(false)"></div>
    </div>
  </div>
</template>

<script setup>
import Tabs from './Tabs.vue'
import { useMenusStore } from '../stores/menus.js'
import { useTabsStore } from '../stores/tabs.js'
import { storeToRefs } from 'pinia'

const menusInstance = useMenusStore()
const tabsInstance = useTabsStore()
const { keepAlive, activeAside } = storeToRefs(tabsInstance)
const { changeMenu, changeFocusTab } = menusInstance
const { focusTab, menu, aside, showMenu } = storeToRefs(menusInstance)
</script>

<style scoped lang="scss">
.frame {
  width: 100vw;
  height: 100vh;
  display: flex;
  position: relative;

  .aside {
    width: 56px;
    height: 100vh;
    // background-color: #0b1019;
    @apply bg-[#0b1019];
    z-index: 9999;

    img {
      width: 50px;
      height: 50px;
      margin-left: 3px;
    }

    &-item {
      width: 56px;
      height: 56px;
      color: hsl(0deg 0% 100% / 54%);
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &:first-child {
        margin-top: 56px;
      }

      &:hover {
        color: #fff;
      }

      &__active {
        background-color: hsl(0deg 0% 100% / 20%);
        color: #fff;
      }

      i {
        font-size: 18px;
      }

      span {
        font-size: 14px;
      }
    }
  }

  .menu {
    position: absolute;
    background-color: #fff;
    padding-left: 56px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 100%;
    z-index: 9998;

    &-box {
      padding-top: 16px;
      background-color: #fff;

      a {
        text-decoration: none;
      }

      &__title {
        width: 180px;
        padding: 8px 16px;
        color: #888c94;
        font-size: 12px;
      }

      &__item {
        width: 180px;
        padding: 8px 16px 8px 32px;
        color: #0b1019;
        font-size: 12px;
        cursor: pointer;
        border-radius: 4px;

        &:hover {
          background: rgb(0 91 245 / 6%);
        }
      }

      &:last-child {
        flex: 1;
      }
    }
  }

  .collapse-enter-active,
  .collapse-leave-active {
    transition: transform 0.2s linear;
  }

  .collapse-enter-from {
    transform: translateX(-100%);
  }

  .collapse-leave-to {
    transform: translateX(-100%);
  }

  .main {
    width: calc(100% - 56px);
    height: 100vh;
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    background: #f0f2f5;

    .body {
      height: calc(100% - 42px);

      #micro-app1 {
        height: 100%;

        div {
          height: 100%;
        }
      }
    }
  }

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0 0 0 / 25%);
    z-index: 20;
  }
}
</style>
