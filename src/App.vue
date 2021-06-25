<template>
  <div id="app">
    <main-tab-bar></main-tab-bar>
    <icon></icon>
    <svg-icon></svg-icon>
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MainTabBar from './components/MainTabBar'
import Icon from './components/content/Icon/Icon.vue'
import SvgIcon from './components/content/Icon/svg.vue'
export default {
  name: "App",
  components: {
    MainTabBar,
    Icon,
    SvgIcon
  },
};
</script>

<style>
@import "./assets/css/base.css";

</style>
