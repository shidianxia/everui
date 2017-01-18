<template>
    <div class="home">
        <div class="select">
            <xdropdown class="sleect" :options="select" placeholder="我是下拉菜单" @on-change="onChange"></xdropdown>
        </div>
        <div class="select">
            <xdropdown class="sleect" :options="select" type="settings" @on-change="onChange1"></xdropdown>
        </div>
        <div class="select">
            <xdropdown class="sleect" :options="select" placeholder="更多功能"  type="bordercard"  @on-change="onChange2"></xdropdown>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                select: ["测试一", "测试二", "测试三"]
            }
        },
        methods: {
            onChange(val) {
                console.log(val)
            },
            onChange1(val) {
                console.log(val)
            },
            onChange2(val) {
                console.log(val)
            }
        }
    }
</script>
<style scoped lang="less">
    .home {
        width: 100%;
        height: 520px;
        padding: 50px 50px;
    }
    
    .select {
        float: left;
        width: 120px;
        margin: 0 50px;
        span {
            margin-bottom: 50px;
        }
    }
</style>