<template>
  <div class="vux-alert" v-show="show">
    <div class="weui_dialog_hd"><strong class="weui_dialog_title">{{title}}</strong></div>
    <div class="weui_dialog_bd"><slot></slot></div>
    <div class="weui_dialog_ft">
      <a href="javascript:;" class="weui_btn_dialog default" @click="onCancel">{{cancelText}}</a>
      <a href="javascript:;" class="weui_btn_dialog primary" @click="onConfirm">{{confirmText}}</a>
    </div>
  </div>
</template>

<script>
    export default {
        props: {
            show: {       //显示与否 
                type: Boolean,
                default: false,
                twoWay: true
            },
            title: {          //标题
                type: String,
                default: '提示'
                    //              required: true
            },
            confirmText: {    //确定按钮
                type: String,
                default: '确定'
            },
            cancelText: {   //取消按钮
                type: String,
                default: '取消'
            },
            onConfirm: Function,   //按钮响应事件
            onCancel: Function //由于2.0props值不能在子组件中被修改
        },
        methods: {

        },
        watch: {
            show(val) {
                this.$emit(val ? 'on-show' : 'on-hide')
            }
        }
    }
</script>

<style lang="less" scoped>
    .vux-alert {
        width: 400px;
        height: 172px;
        background: #fff;
        text-align: center;
        border-radius: 5px;
        z-index: 1000;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .weui_dialog_hd {
            font-size: 20px;
            margin: 20px 0 15px 0;
            color: #2C3F51;
            line-height: 20px;
        }
        .weui_dialog_bd {
            font-size: 14px;
            line-height: 22px;
            padding: 0 24px;
            text-align: left;
            color: #546472;
        }
        .weui_btn_dialog {
            width: 50%;
            line-height: 44px;
            text-decoration: none;
            border-top: 1px solid #D6DADD;
            box-sizing: border-box;
            position: absolute;
            bottom: 0;
        }
        .default {
            left: 0;
            border-right: 1px solid #D6DADD;
            color: #546472;
            border-radius: 0 0 0 5px;
            &:hover {
                background: #EBF4FD;   
            }
            &:active {
                background: #EBF4FD;
            }
        }
        .primary {
            right: 0;
            color: #2088EC;
            border-radius: 0 0 5px 0;
            &:hover {
                background: #EBF4FD;
            }
            &:active {
                background: #EBF4FD;
            }
        }
    }
</style>