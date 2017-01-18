<template>
    <div class="saveSuccess" ref="content">
        <div class="vux-toast" v-show="show == 1">
            <div ref="waiting">
                <svg class="ued-loading"><use xlink:href="#icon-loading"></use></svg>
                <span class="weui_toast_content">{{ content }}</span>
            </div>
            
        </div>
        <div class="vux-toast" v-show="show == 2">
            <div ref="success">
                <img class="icon" src="http://rayeye-img.oss-cn-shanghai.aliyuncs.com/images/done.png"/>
                <span class="weui_toast_content">{{ content }}</span>
            </div>
            
        </div>
        <div class="vux-toast" v-show="show == 3">
            <div ref="error">
              <svg class="iconsvg">
                   <use class="white" xlink:href ="#icon-o-error"/>
              </svg>
                <span class="weui_toast_content">{{ content }}</span>
            </div>
            
        </div>
        <div class="vux-toast" v-show="show == 4">
            <div  ref="warning">
                <img  class="icon" src="http://rayeye-img.oss-cn-shanghai.aliyuncs.com/images/warning.png"/>
                <span class="weui_toast_content">{{ content }}</span>
            </div>
            
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        props: {
            content: { //提示内容
                type: String,
                default: ''
            },
            showtype: { //提示类型
                type: String,
                default: 'none'
            }
        },
        computed: {
            show: function() {
                if (this.showtype == 'none') {
                    return 0;
                } else if (this.showtype == 'waiting') {
                    return 1;
                } else if (this.showtype == 'success') {
                    return 2;
                } else if (this.showtype == 'error') {
                    return 3;
                } else if (this.showtype == 'warning') {
                    return 4;
                } else {
                    return -1;
                }
            },
        },
        watch: {
            'show': function(val, old) {
        
                    clearTimeout(window.uedTipTimeOut1);
            
     
                    clearTimeout(window.uedTipTimeOut2);
        
                switch (val) {
                    case 0:
                        {
                            this.$refs.content.style.top = -50 + 'px';
                            this.$refs.content.style.display = 'none';
                        }
                        break;
                    case 1:
                        {
                            this.$refs.content.style.background = "rgba(84,100,114,.9)";
                            this.$refs.content.style.display = 'block';
                            this.$refs.waiting.style.display = "block";
                            this.$refs.content.style.top = 0;       
                        }
                        break;
                    case 2:
                        {
                            this.$refs.content.style.display = "block";
                            this.$refs.content.style.background = "rgba(84,100,114,.9)";
                            // if (old !== 1) {
                            this.$refs.success.style.display = "block";
                            this.$refs.content.style.top = 0;
                            // }
                            window.uedTipTimeOut1 = setTimeout(() => {
                                this.$refs.success.style.display = "none";
                                this.$refs.content.style.top = -50 + 'px';
                                this.$refs.content.style.background = "rgba(84,100,114,0)";
                            }, 2000)
                            window.uedTipTimeOut2 = setTimeout(() => {
                                this.$refs.content.style.display = "none";
                            }, 3000)
                        }
                        break;
                    case 3:
                        {   
                            this.$refs.content.style.display = "block";
                            this.$refs.content.style.background = "rgba(245,105,96,0.80)";
                            // if (old !== 1) {
                            this.$refs.error.style.display = 'block';
                            this.$refs.content.style.top = 0;
                            // }
                             window.uedTipTimeOut1 = setTimeout(() => {
                                 this.$refs.error.style.display = 'none';                                
                                 this.$refs.content.style.top = -50 + 'px';
                                 this.$refs.content.style.background = "rgba(245,105,96,0)";
                             }, 2000)
                             window.uedTipTimeOut2 = setTimeout(() => {
                                 this.$refs.content.style.display = "none";
                             }, 3000)
                        }
                        break;
                    case 4:
                        {
                            this.$refs.content.style.display = "block";
                            this.$refs.content.style.background = "rgba(84,100,114,.9)";
                            // if (old !== 1) {
                            this.$refs.warning.style.display = 'block';
                            this.$refs.content.style.top = 0;
                            // }
                            window.uedTipTimeOut = setTimeout(() => {
                                this.$refs.warning.style.display = 'none';
                                this.$refs.content.style.top = -50 + 'px';
                                this.$refs.content.style.background = "rgba(84,100,114,0)";

                            }, 2000)
                            window.uedTipTimeOut2 = setTimeout(() => {
                                this.$refs.content.style.display = "none";
                            }, 3000)
                        }
                        break;
                    default:
                }
            }
        }
    }
</script>

<style lang="less">
    .saveSuccess {
        width: 400px;
        height: 50px;
        border-radius: 0 0 5px 5px;
        font-size: 14px;
        color: #fff;
        position: absolute;
        text-align: center;
        display: none;
        top: -50px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
        transition: all 1s;
        .weui_toast_content {
            line-height: 50px;
        }
    }
    
    .icon {
        width: 20px;
        height: 20px;
        float: left;
        position: absolute;
        left: 40px;
        top: 15px;
    }
    .iconsvg {
        width: 26px;
        height: 26px;
        float: left;
        position: absolute;
        left: 40px;
        top: 15px;
        fill: #FFFFFF;
    }
    svg #icon-o-error path:nth-of-type(3) {
        fill: #F56960;
    }
    .ued-loading {
        width: 26px;
        height: 26px;
        float: left;
        position: absolute;
        left: 40px;
        top: 15px;
        fill: #FFFFFF;
        animation: icon1 1s linear infinite both reverse;
        -webkit-animation: icon1 1s linear infinite both reverse;
    }
    @-webkit-keyframes icon1 {
        from {
            transform: rotate(360deg);
        }
        to {
            transform: rotate(0deg);
        }
    }
    
    @-moz-keyframes icon1 {
        from {
            transform: rotate(360deg);
        }
        to {
            transform: rotate(0deg);
        }
    }
    
    @-o-keyframes icon1 {
        from {
            transform: rotate(360deg);
        }
        to {
            transform: rotate(0deg);
        }
    }
    
    @keyframes icon1 {
        from {
            transform: rotate(360deg);
        }
        to {
            transform: rotate(0deg);
        }
    }
    
    #icon1 {
        -webkit-animation: icon1 1s linear infinite both reverse;
        -moz-animation: icon1 1s linear infinite both reverse;
        -o-animation: icon1 1s linear infinite both reverse;
        animation: icon1 1s linear infinite both reverse;
    }
</style>