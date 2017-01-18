<template>
	<div class="btnS" :style="buttonstyle" :class="{'ghost':type=='ghost','normal' :type=='normal','primary':type=='primary','success':type == 'success','waiting':type == 'waiting','error':type == 'error'}" @click="btnclick">
	    <!--<xsvg class="iconbtn">
	        <use xlink:href ="#icon-f-error"/>
	    </xsvg>-->
	    <span type="button" class="span" ref="spanvalue" :disabled = "isdisabled">{{msg}}</span>
   </div>
</template>

<script>
    export default {
        data() {
            return {}
        },

        props: {
            'msg': {
                type: String,
                default: ''
            },
            'isdisabled': {
                type: Boolean,
                default: false
            },
            'isicon': {
                type: Boolean,
                default: false
            },
            'type': {
                type: String,
                default: 'normal'
            },
            'size': {
                type: String,
                default: 'M' //默认按钮大小的中按钮即高度为38px
            }
        },
        mounted() {
            if (this.size == 'S') {
                this.$refs.spanvalue.style.fontSize = "12px"

            } else if (this.size == 'M') {
                this.$refs.spanvalue.style.fontSize = "14px"

            } else {
                this.$refs.spanvalue.style.fontSize = "16px"

            }
        },
        computed: {
            buttonstyle() {
                if (this.size == 'S') {
                    return {
                        height: `${26}px`,
                    }
                } else if (this.size == 'M') {
                    return {
                        height: `${38}px`,
                    }
                } else {
                    return {
                        height: `${46}px`,
                    }
                }
            }
        },

        methods: {
            btnclick() {
                this.$emit('on-click')
            }
        }
    }
</script>

<style lang="less" scoped>
    .success {
        border: 1px solid #5ABA69;
        background: #5ABA69;
        &:hover {
            background: #77D388;
            border: 1px solid #77D388;
        }
        &:active {
            background: #51A75E;
            border: 1px solid #51A75E;
        }
    }
    
    .waiting {
        border: 1px solid #EFB444;
        background: #EFB444;
        &:hover {
            background: #F6CE5C;
            border: 1px solid #F6CE5C;
        }
        &:active {
            background: #D6A13D;
            border: 1px solid #D6A13D;
        }
    }
    /*默认样式*/
    
    .normal {
        background: #F5F6F6;
        border: 1px solid #F5F6F6;
        &:hover {
            border: 1px solid #2EA7F4;
            background: #fff;
            .span {
                color: #2EA7F4;
            }
        }
        &:active {
            background: #fff;
            border: 1px solid #1C79D3;
        }
    }
    /*typr='primary'的样式*/
    
    .primary {
        border: 1px solid #2088EC;
        background: #2088EC;
        &:hover {
            background: #2EA7F4;
            border: 1px solid #2EA7F4;
        }
        &:active {
            background: #1C79D3;
            border: 1px solid #1C79D3;
        }
    }
    
    .ghost {
        border: 1px solid #2EA7F4;
        /*background: #fff;*/
        .span {
            color: #2EA7F4;
        }
        &:hover {
            background: #2088EC;
            border: 1px solid #2088EC;
            .span {
                color: #fff;
            }
        }
        &:active {
            background: #1C79D3;
            border: 1px solid #1C79D3;
        }
    }
    
    .error {
        border: 1px solid #F56960;
        background: #F56960;
        &:hover {
            background: #F9887E;
            border: 1px solid #F9887E;
        }
        &:active {
            background: #DC5E56;
            border: 1px solid #DC5E56;
        }
    }
    
    .btnS {
        width: 74px;
        height: 38px;
        color: #fff;
        border-radius: 3px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
            cursor: pointer;
        }
    }
    
    .span {
        color: #fff;
    }
    
    .iconbtn {
        width: 14px;
        height: 14px;
        fill: #fff;
    }
</style>