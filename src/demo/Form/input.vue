<template>  
    <div> 
    <div class="inputdemo">
      <xinput  placeholder="请输入内容" v-model="input">></xinput>
    </div>
     <div class="inputdemo">
      <xinput placeholder="请输入内容" v-model="input1" :disabled="true"></xinput>         
    </div>
     <div class="inputdemo">
      <xinput  class="inline-input" size="L" placeholder="请输入内容"v-model="input6"></xinput>  
    </div>
      <div class="inputdemo">
      <xinput  class="inline-input" size="M" placeholder="请输入内容"v-model="input6"></xinput>  
    </div>
      <div class="inputdemo">
      <xinput  class="inline-input" size="S" placeholder="请输入内容"v-model="input6"></xinput>  
    </div>
     <input class="back" type="button" value="back" @click="back">
    </div>
</template>
<script>
    export default {
        data() {
            return {
                input6: "",
                input: "",
                input1: "",
                value1: "",
                value2: "",
                value3: "",
                readonly: true
            }
        },
        methods: {
            back() {
                this.$router.push('/demolist')
            }
        }
    }
</script>
<style scoped>
    .inputdemo {
        margin: 30px auto;
        width: 300px
    }
</style>