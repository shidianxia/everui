<template>
    <div>
    <div>
    <div>
    <span>primary</span>        
<div class="button"> 
    <xbutton size="S"  type="primary" :msg="value1"></xbutton>
</div>
<div class="button"> 
    <xbutton size="M" type="primary" :msg="value2"></xbutton>
</div>
<div class="button"> 
    <xbutton size="L" type="primary" :msg="value3"></xbutton>
</div>
    </div>
    <div>
        <span>success</span>
<div class="button"> 
    <xbutton size="S" type="success" :msg="value1"></xbutton>
</div>
<div class="button"> 
    <xbutton size="M" type="success" :msg="value2"></xbutton>
</div>
<div class="button"> 
    <xbutton size="L" type="success" :msg="value3"></xbutton>
</div>
    </div>
    <div>
        <span>waiting</span>
<div class="button"> 
    <xbutton size="S" type="waiting" :msg="value1"></xbutton>
</div>
<div class="button"> 
    <xbutton size="M" type="waiting" :msg="value2"></xbutton>
</div>
<div class="button"> 
    <xbutton size="L" type="waiting" :msg="value3"></xbutton>
</div>
    </div>
    </div>
    <div>
        <div>
           <span>error</span>
<div class="button"> 
    <xbutton size="S" type="error" :msg="value1"></xbutton>
</div>
<div class="button"> 
    <xbutton size="M" type="error" :msg="value2"></xbutton>
</div>
<div class="button"> 
    <xbutton size="L" type="error" :msg="value3"></xbutton>
</div>
    </div>
    </div>
    <div >
    <span>默认样式</span>
    <div class="button">
       <xbutton  :msg="value2"></xbutton>
    </div>
    
    </div>
     <div class="ghost1">
    <span>ghost</span>
    <div class="button">
       <xbutton type="ghost" :msg="value2" @click="aa"></xbutton>
    </div>
    
    </div>
    <input class="back" type="button" value="back" @click="back">
    </div>
</template>
<script>
    export default {
        data() {
            return {
                value1: "小按钮",
                value2: "中按钮",
                value3: "大按钮",
            }
        },
        methods: {
            aa() {
                alert("我是ghost")
            },
            back() {
                this.$router.push('/demolist')
            }
        }
    }
</script>
<style scoped="scoped">
    .ghost1 {
        margin-top: 20px;
        width: 10 0px;
        height: 100px;
        background-color: #F5F6F6;
    }
    
    .button {
        padding: 10px 100px;
    }
    
    .iconbtn {
        fill: blue
    }
    
    .right {}
</style>