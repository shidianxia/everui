<template>
    <div class="home">
        <div class="select">
            <span >点击下拉</span>
            <xselect class="sleect" :options="select" :value="value" placeholder="请选择" @on-change="onChange"></xselect>
        </div>
        <div class="select">
            <span>禁止下拉</span>
            <xselect class="sleect" :options="select" :value="value2" placeholder="请选择" :stop="stop"></xselect>
        </div>
        <div class="select">
            <span>选择器赋值</span>
            <xselect class="sleect" :options="sel" keys="name"  valu="value" :value="value3" placeholder="请选择"  @on-change="onChange1"></xselect>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                select: ["测试1", "测试2", "测试3"],
                value: "",
                value2: "",
                value3: "a",
                stop: true,
                sel:[
                    {"name":"1","value":"a"},
                    {"name":"2","value":"b"},
                    {"name":"3","value":"c"},
                    {"name":"4","value":"d"},
                    ]
            }
        },
        methods: {
            onChange(val) {
                // console.log(val)
                this.value = val
            },
            onChange1(val) {
                this.value3 = val
            }
        }
    }
</script>
<style scoped lang="less">
    .sleect {
        margin: 10px 0 50px 0;
    }
    
    .home {
        width: 100%;
        height: 520px;
        padding-top: 50px;
    }
    
    .select {
        width: 500px;
        margin: 0 auto;
        margin-top: 30px;
        span {
            margin-bottom: 50px;
        }
    }
</style>