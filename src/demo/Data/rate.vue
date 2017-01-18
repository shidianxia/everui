<template>
	<div>
    <div class="block">
      <xrate v-model="value0"></xrate>
      <xrate v-model="value1"></xrate>
      <xrate v-model="value2"></xrate>
      <xrate v-model="value3"></xrate>
      <xrate v-model="value4"></xrate>
      <xrate v-model="value5"></xrate>
    </div>
    <div class="block">
      <xrate v-model="value0" disabled></xrate>
      <xrate v-model="value1" disabled></xrate>
      <xrate v-model="value2" disabled></xrate>
      <xrate v-model="value3" disabled></xrate>
      <xrate v-model="value4" disabled></xrate>
      <xrate v-model="value5" disabled></xrate>
      <xrate v-model="value6" disabled></xrate>
    </div>
    <input class="back" type="button" value="back" @click="back">
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value0: 0,
        value1: 1,
        value2: 2,
        value3: 3,
        value4: 4,
        value5: 5,
        value6: 3.7,
      }
    },
    watch: {
      value0(val) {
        console.log("value0 = " +val)
      },
      value1(val) {
        console.log("value1 = " +val)
      },
      value2(val) {
        console.log("value2 = " +val)
      },
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