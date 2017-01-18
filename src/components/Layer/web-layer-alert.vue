<template>
  <div class="vux-alert" v-show="show">
      <div class="weui_dialog_hd"><strong class="weui_dialog_title">{{title}}</strong></div>
      <div class="weui_dialog_bd"><slot></slot></div>
      <div class="weui_dialog_ft">
        <a href="javascript:;" class="primary" @click="onhide">{{buttonText}}</a>
      </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        props: {
            show: {                 //显示与否
                type: Boolean,
                default: false
            },
            title: {                //标题
                type: String,
                default: '提示'
            },
            buttonText: {             //确定按钮
                type: String,
                default: '确定'
            },
            onhide: Function      //响应事件
        },
        methods: {

        },
        watch: {
            show(val) {
                this.$emit(val ? 'on-show' : 'onhide')
            }
        }
    }
</script>

<style lang="less" scoped>
    .vux-alert {
        width: 400px;
        height: 172px;
        text-align: center;
        border-radius: 5px;
        background: #FFFFFF;
        border: 1px solid #F5F6F6;
        box-shadow: 0 22px 50px 0 rgba(4,26,48,0.41);
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
            text-align: left;
            font-size: 14px;
            line-height: 22px;
            padding: 0 24px;
            color: #546472;
        }
        .primary {
            width: 100%;
            height: 44px;
            line-height: 44px;
            border-radius: 0 0 5px 5px;
            position: absolute;
            right: 0;
            bottom: 0;
            text-decoration: none;
            color: #2088EC;
            background: #FFFFFF;
            box-shadow: inset 0 1px 0 0 #D6DADD;
            &:hover {
                background: rgba(31,136,236,0.09);
            }
            &:active {
                background: #EBF4FD;
            }
        }
    }
</style>