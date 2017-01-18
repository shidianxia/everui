<template>
	<div>
  <div class="block">
    <span class="demonstration">默认</span>
    <xrange v-model="value1"></xrange>
  </div>
  <div class="block">
    <span class="demonstration">自定义初始值</span>
    <xrange v-model="value2" :min="10" :max="110"></xrange>
  </div>
  <div class="block">
    <span class="demonstration">禁用</span>
    <xrange v-model="value3" disabled></xrange>
  </div>
   <input class="back" type="button" value="back" @click="back">
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value1: 0,
        value2: 50,
        value3: 42
      }
    },
    watch: {
      value1 (val) {
        console.log("value1 = " + val)
      },
      value2 (val) {
        console.log("value2 = " + val)
      }
    },
    methods: {
      back() {
        this.$router.push('/demolist')
      }
    }
  }
</script>
<style scoped="scoped">
div.block{
  width: 500px;
  margin-left: 100px;
  margin-top: 100px;
}
</style>