<template>  
    <div>
    <div class="labledemo"> 
        <span>左对齐</span>
    <div class="lable">
      <xlable placeholder="请输入" title="这是一个标签" place="left" :value.sync="value1" ></xlable>
    </div>
     <div class="lable">
      <xlable placeholder="请输入" title="一个标签" place="left"  :value.sync="value2" ></xlable>
    </div>
     <div class="lable">
      <xlable placeholder="请输入" title="标签" :value.sync="value3" place="left"></xlable>
    </div>
        </div>
    <div class="labledemo">
          <span>右对齐</span>
    <div class="lable">
      <xlable placeholder="请输入" title="这是一个标签" place="right" :value.sync="value1" ></xlable>
    </div>
     <div class="lable">
      <xlable placeholder="请输入" title="一个标签" place="right"  :value.sync="value2" ></xlable>
    </div>
     <div class="lable">
      <xlable placeholder="请输入" title="标签" :value.sync="value3" place="right"></xlable>
    </div>
    </div>
    <div class="labledemo">
          <span>顶部对齐</span>
    <div class="lable">
      <xlable placeholder="请输入" title="这是一个标签" place="top" :value.sync="value1" ></xlable>
    </div>
     <div class="lable">
      <xlable placeholder="请输入" title="一个标签" place="top"  :value.sync="value2" ></xlable>
    </div>
     <div class="lable">
      <xlable placeholder="请输入" title="标签" :value.sync="value3" place="top"></xlable>
    </div>
    </div>
    <input class="back" type="button" value="back" @click="back">
    </div>
</template>
<script>
    export default {
        data() {
            return {
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
<style>
    .labledemo {
        margin: 30px 50px;
        /*display: flex;*/
        /*align-items: center*/
        /*justify-content: center*/
    }
    
    .lable {
        height: 40px;
        margin-bottom: 30px;
    }
</style>