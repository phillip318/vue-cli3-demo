<template>
  <div class="home-container">
    home
    <template v-if="show">
      <later1></later1>
      <later2></later2>
      <later3></later3>
    </template>
    <button @click="toggle">加载</button>
    <div class="footBar">
      <div>主页</div>
      <div>商城</div>
      <div>我的</div>
    </div>
    <bCmp :flag="true" a="123" @submit="submit" @confirm="confirm"/>
  </div>
</template>
<script>
export default {
  name: 'Home',
  components: {
    later1:() => import('@/components/later1.vue'),
    later2:() => import('@/components/later2.vue'),
    later3:() => import('@/components/later3.vue'),
    bCmp: () => import('@/components/bCmp'),
  },
  data () {
    return {
      show: false
    }
  },
  created () {
  },
  methods: {
    toggle () {
      this.show = !this.show;
    },
    submit () {
      console.log('Home Submit')
    },
    confirm () {
      console.log('Home Confirm')
    }
  }
}
</script>
<style lang="less" scoped>
.home-container {

}
</style>