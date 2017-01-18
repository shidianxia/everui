<template>
  <div class="demo1">
    <h3>第一组</h3>
    <xradio v-model="radio" label="1" name="first">选项一</xradio>
    <xradio v-model="radio" label="2" name="first">选项二</xradio>
    <xradio v-model="radio" label="3" name="first">选项三</xradio>
    <h3>第二组</h3>
    <xradio disabled v-model="radio1" label="4" name="second">选项一</xradio>
    <xradio disabled v-model="radio1" label="5" name="second">选项一</xradio>
    <h3>第三组</h3>
    <xradio v-model="radio2" label="A" name="third">A</xradio>
    <xradio v-model="radio2" label="B" name="third">B</xradio>
    <xradio v-model="radio2" label="C" name="third">C</xradio>
    <input class="back" type="button" value="back" @click="back">
  </div>
</template>

<script>
export default {
     data () {
      return {
        radio: '1',
        radio1: '4',
        radio2: 'B',
      };
    },
    watch: {
      radio(val) {
        console.log(val)
      },
      radio2(val) {
        console.log(val)
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
.demo1{
  margin-left: 20px;
  margin-top: 20px;
}
</style>
