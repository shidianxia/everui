<template>
    <div>       
    <div class="main">
        <xmultselect :options="select1" placeholder="请选择" keys="name" valu="value"  :value="value1" @on-change="onChange1"></xmultselect>
   
     <div class="main">
        <xmultselect :options="select" placeholder="请选择" :value="value" @on-change="onChange"></xmultselect>
     </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                select: ["选项一", "选项二", "选项三", "选相四", "选项五", "选项六", "选项七", "选项八", "选项九"],
                select1:[
                    {"name":"选项一","value":"1"},
                    {"name":"选项二","value":"2"},
                    {"name":"选项三","value":"3"},
                    {"name":"选相四","value":"4"},
                ],
                value: [],
                value1: [],
            }
        },
        methods: {
            onChange(val){
                console.log(val)
                this.value = val
            },
             onChange1(val){
                console.log(val)
                this.value1 = val
            }
        }
    }
</script>
<style scoped>
.main{
    width: 500px;
    margin: 20px 20px;
}
</style>