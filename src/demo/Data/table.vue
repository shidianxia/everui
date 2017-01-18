<template>
     <div class="tabledemo">
      <xtable :checkshow="checkshow" :titles.sync="titles" v-on:selall="selall" :checklist.sync="checklist" :contents="contents" @choosecell="clickCell"></xtable>
      <xtable :titles.sync="titles" v-on:selall="selall" :checklist.sync="checklist" :contents="content" @choosecell="clickCell"></xtable>                       
     </div>
  </template>

<script>
    export default {
        data() {
            return {
                content: [],
                checkshow: true,
                checklist: [],
                titles: [{
                    title: '姓名',
                    key: 'jdyName'
                }, {
                    title: '电话号码',
                    key: 'taskNum'
                }, {
                    title: '地址',
                    key: 'hiddenDangerNum'
                }, {
                    title: '上报人',
                    key: 'taskRate'
                }, {
                    title: '上报时间',
                    key: 'issuedOrderNum'
                }],
                contents: [{
                    jdyName: "朱雷雨1",
                    taskNum: "18155469772",
                    hiddenDangerNum: "上海市杨浦区长阳路1684号",
                    taskRate: "朱雷雨",
                    issuedOrderNum: "2016-12-01"
                }, {
                    jdyName: "朱雷雨2",
                    taskNum: "18155469772",
                    hiddenDangerNum: "上海市杨浦区长阳路1684号",
                    taskRate: "朱雷雨",
                    issuedOrderNum: "2016-12-01"
                }, {
                    jdyName: "朱雷雨3",
                    taskNum: "18155469772",
                    hiddenDangerNum: "上海市杨浦区长阳路1684号",
                    taskRate: "朱雷雨",
                    issuedOrderNum: "2016-12-01"
                }, {
                    jdyName: "朱雷雨4",
                    taskNum: "18155469772",
                    hiddenDangerNum: "上海市杨浦区长阳路1684号",
                    taskRate: "朱雷雨",
                    issuedOrderNum: "2016-12-01"
                }]
            }
        },
        methods: {
            selall(val) {
                console.log(val) //监听checkbox修改选项事件 默认传值时index
            },
            change(val) {
                alert(this.checklist)
            },
            clickCell(index) {
                console.log(index) //监听鼠标点击表格事件 默认传值时index
            }
        }
    }
</script>
<style scoped>
    .tabledemo {
        /*margin-top: 30px;*/
        width: 80%;
        /*margin-left: 50px;*/
        margin: 30px auto;
    }
</style>