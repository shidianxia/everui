<template>
  <div>
    <xswitch v-model="value0" ></xswitch><br><br>
    <xswitch v-model="value1" ></xswitch><br><br>
    <xswitch v-model="value2" on-color="#13ce66"></xswitch><br><br>
    <xswitch v-model="value3" on-color="#EFD444"></xswitch><br><br>
    <xswitch v-model="value4" on-color="#F56960"></xswitch><br><br>
    <xswitch v-model="value6" disabled></xswitch><br><br>
    <input class="back" type="button" value="back" @click="back">
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value0: false,
        value1: true,
        value2: true,
        value3: true,
        value4: true,
        value6: false,
      }
    },
    watch:{
      value0(val) {
        console.log(val)
      },
      value1(val) {
        console.log(val)
      },
      value2(val) {
        console.log(val)
      },
      value3(val) {
        console.log(val)
      },
      value4(val) {
        console.log(val)
      },
      value6(val) {
        console.log(val)
      },
    },
    methods: {
      back() {
        this.$router.push('/demolist')
      }
    }
  };
</script>
<style scoped>
div{
  margin-left: 30px;
  margin-top: 30px
}
</style>