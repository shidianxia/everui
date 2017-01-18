<template>
  <div>
    <p class="lineL"><xprogress type="lineL" :percentage="20" :showtext="showtext"></xprogress></p>
    <p class="lineS"><xprogress type="lineS" :percentage="70"></xprogress></p>
    <xprogress type="circle" :percentage="0"></xprogress>
    <xprogress type="circle" :percentage="40"></xprogress>
    <xprogress type="circle" :percentage="75"></xprogress>
    <input class="back" type="button" value="back" @click="back">
  </div>
</template>
<script>
  export default {
    data() {
      return {
         showtext: false
      }
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
p.lineL{
  width: 276px
}
p.lineS{
  width: 166px
}
</style>