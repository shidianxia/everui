<template>
    <div>
    <div class="textarea">
         <span>限制输入为20个字符</span>  
        <xtextarea :max="20" v-model="value1" :height=300 @onchange="onChange"   placeholder="请添加备注" ></xtextarea>
    </div>
     <div class="textarea">
          <span>不限制输入大小</span>         
        <xtextarea  v-model="value2" :height=200 placeholder="请添加备注" :show-counter="false"></xtextarea>
    </div>
      <div class="textarea">
          <span>只读</span>
        <xtextarea :max="20" v-model="value3" :height=100 placeholder="请添加备注" readonly="readonly"></xtextarea>
    </div>
    <input class="back" type="button" value="back" @click="back">
    </div>
</template>
<script>
    export default {
        data() {
            return {
                readonly: true,
                value1: "",
                value2: "",
                value3: "",
            }
        },
        methods: {
            onChange(val) {
                // this.value1 = val
            },
            back() {
                this.$router.push('/demolist')
            }
        }
    }
</script>
<style scoped>
    .textarea {
        width: 300px;
        margin: 30px auto;
    }
    
    span {
        color: #ccc;
        font-size: 14px;
    }
</style>