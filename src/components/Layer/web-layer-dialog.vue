<template>
	<div class="dialog" v-show="show">
		<p>{{title}}</p>
		<div class="dialogContent">
			<div class="weui_dialog_bd"><slot></slot></div>
			<div class="btnClose" @click="close">
				<img src="http://rayeye-img.oss-cn-shanghai.aliyuncs.com/images/closeImgBox.png"/>
			</div>
		</div>
	</div>
	
</template>
<script>
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: ''
            },
            btnTitle: {
                type: String,
                default: ''
            },
            close: Function
        },
        methods: {}
    }
</script>
<style lang="less" scoped>
    .dialog {
        width: 589px;
        z-index: 1000;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        p {
            font-size: 28px;
            color: #fff;
            text-align: center;
            margin: 30px 0;
        }
        .dialogContent {
            width: 589px;
            height: 338px;
            background: #fff;
            border-radius: 5px;
            position: relative;
            .sureBtn {
                position: absolute;
                right: 21px;
                bottom: 24px;
            }
            .btnClose {
                width: 44px;
                height: 44px;
                border-radius: 50%;
                text-align: center;
                line-height: 44px;
                position: absolute;
                right: -57px;
                top: 0;
                &:hover {
                    background: #041B30;
                }
            }
        }
    }
</style>