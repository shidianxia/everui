<template>   
    <div>
        <div class="head">
            <div class="headCenter">
                <ul>
                    <li @click="success"><span>success</span></li>
                    <li @click="wait"><span>wait</span></li>
                    <li @click="failure"><span>failure</span></li>
                    <li @click="warning"><span>warning</span></li>
                </ul>
            </div>
        </div>
        <div class="notification"><notification class="uedTip" :showtype="tip.showtype" :content="tip.content"></notification></div>
		<br />
        <xmask class="appdialog" :show="alert.show || confirm.show || dialog.show" :can-close="false"></xmask>
        
        <button @click="alertShow">alert</button>
        <xalert :show.sync="alert.show" :title="alert.title" :onhide="onhide">{{ alert.msg }} </xalert>
        
        <button @click="confirmShow">confirm</button>
        <xconfirm :onConfirm="onConfirm" :onCancel="onCancel" :show.sync="confirm.show" :title="confirm.title">{{ confirm.msg }}</xconfirm>
        
        <button @click="dialogShow">dialog</button>
        <xdialog :show.sync="dialog.show" :close="close" :title="dialog.title" :btn-title="dialog.btnTitle"></xdialog>
    </div>
    
</template>
<script>
    import xmask from '../../components/mask.vue'
    export default {
        components: {
            xmask
        },
        data() {
            return {
                alert: {
                    show: false,
                    msg: '这里显示Alert的内容，文字大小14px，行高22px，颜色值'
                },
                confirm: {
                    show: false,
                    msg: '这里显示Confirm的内容，文字大小14px，行高22px，颜色值'
                },
                dialog: {
                    show: false,
                    title: 'aaa',
                    btnTitle: '确定'
                },
                tip: {
                    content: '',
                    showtype: ''
                }
            }
        },
        methods: {
            close() {
                this.dialog.show = false
            },
            onCancel() {
                this.confirm.show = false
            },
            onConfirm() {
                this.confirm.show = false
            },
            onhide() {
                this.alert.show = false

            },
            alertShow() {
                this.alert.show = true
            },
            confirmShow() {
                this.confirm.show = true
            },
            dialogShow() {
                this.dialog.show = true
            },
            success() {
                this.tip = {
                    content: '成功',
                    showtype: 'success'
                };
            },
            wait() {
                this.tip = {
                    content: '加载中...',
                    showtype: 'waiting'
                };
            },
            failure() {
                this.tip = {
                    content: '失败',
                    showtype: 'error'
                };
            },
            warning() {
                this.tip = {
                    content: '警告',
                    showtype: 'warning'
                };
            }
        }

    }
</script>
<style lang="less" scoped>
    .iconbtn {
        width: 26px;
        height: 35px;
        float: left;
        fill: #4F7AF7;
        margin-right: 18px;
    }
    
    * {
        margin: 0;
        padding: 0;
    }
    
    .test {
        width: 200px;
        height: 200px;
        background: #f0f0f0
    }
    
    button {
        border: none;
        background: #ccc;
        outline: none;
        padding: 5px;
        color: #000;
        margin-left: 10px;
        &:hover {
            background: #3291EE;
        }
        &:active {
            background: #42B983;
        }
    }
    
    .head {
        width: 100%;
        height: 60px;
        border-bottom: 1px solid #8FC3F5;
        box-sizing: border-box;
        box-shadow: 0 -2px 2px 2px #ccc;
        .headCenter {
            width: 80%;
            height: 60px;
            margin: 0 auto;
            li {
                float: left;
                line-height: 60px;
                text-align: center;
                list-style: none;
                font-size: 14px;
                color: #999999;
            }
            span {
                margin: 0 22px;
                &:hover {
                    color: #41BCA0;
                    cursor: pointer;
                }
            }
        }
    }
    .notification{
        position: relative
    }
</style>