<template>
    <div class="weui_dialog_alert" v-show="show" :transition="maskTransition">
        <div class="weui_mask modal-active" @click="close"></div>
    </div>
</template>

<script>
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            },
            maskTransition: {
                type: String,
                default: 'vux-fade'
            },
            canClose: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            close() {
                if (this.canClose) {
                    this.show = false
                }
            }
        },
        watch: {
            show(val) {
                this.$emit(val ? 'on-show' : 'on-hide')
                if(this.show){
//              		document.getElementsByClassName("appmasker")[0].style.filter = "blur(3px)";
                }else{
//              		document.getElementsByClassName("appmasker")[0].style.filter = "blur(0)";
                }
            }
        }
    }
</script>

<style scoped>
    
    .weui_mask {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #11334B;
        opacity: .7;
        z-index: 999;
    }
</style>