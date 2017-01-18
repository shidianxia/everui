<template>
  <div>
  <xinputnumber v-model="num1" :min="1" :max="10"></xinputnumber>
  <xinputnumber v-model="num2" :disabled="true"></xinputnumber>
   <input class="back" type="button" value="back" @click="back">
  </div>
</template>
<script>
  export default {
    data() {
      return {
         num1: 1,
         num2: 1
      };
    },
    watch: {
      num1(val){
        console.log(val)
      }
    },
    methods: {
      back(){
        this.$router.push('/demolist')
      }
    }
  };
</script>