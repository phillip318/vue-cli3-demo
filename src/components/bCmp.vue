<template>
  <div class="bCmp-container">
    BBBBBBBBBBB组件
    <cCmp v-bind="$attrs" v-on="$listeners"/>
  </div>
</template>
<script>
  import cCmp from './cCmp'
  export default {
    name: 'BCmp',
    components: {
      cCmp
    },
    data () {
      return {

      }
    },
    created () {
    }
  }
</script>
<style lang="less" scoped>

</style>