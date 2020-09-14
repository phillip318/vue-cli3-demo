<template>
  <div class="cCmp-container">
    <span @click="$emit('submit')">CCCCCCCCCCCCC</span>
  </div>
</template>
<script>
  export default {
    name: 'cCmp',
    props: ['a', 'flag'],
    data () {
      return {}
    },
    created () {
      console.log(this.a, this.flag)
    }
  }
</script>
<style lang="less" scoped>

</style>