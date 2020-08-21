<template>
  <div class="TabBar-container">
    <!-- <keep-alive>
      <component v-bind:is="currentTab.component" class="tab"></component>
    </keep-alive> -->
    <router-view></router-view>
    <div class="TabBar">
      <div v-for="tab in tabs" :key="tab.name" @click="to(tab.path)">{{ tab.title }}</div>
    </div>
  </div>
</template>
<script>
import Home from '@/views/Home'
import Mall from '@/views/Mall'
import My from '@/views/My'
const tabs = [
  {name: 'Home', component: () => import('@/views/Home'), title: '主页', path: '/'}, 
  {name: 'Mall', component: () => import('@/views/Mall'), title: '商城', path: '/mall'},
  {name: 'My', component: () => import('@/views/My'), title: '我的', path: '/my'}]
export default {
  name: 'TabBar',
  components: {
  },
  data () {
    return {
      currentTab: tabs[2],
      tabs
    }
  },
  methods: {
    to (arg) {
      this.$router.push(arg)
    }
  }
}
</script>
<style lang="less" scoped>
.TabBar-container {
  min-height: 100vh;
  .TabBar {
    width: 100%;
    height: 50px;
    position: fixed;
    display: flex;
    align-items: center;
    bottom: 0;
    background: lime;
    >div {
      flex: 1;
      height: 100%;
    }
  }
}
</style>