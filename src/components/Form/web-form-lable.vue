<template>
  <div class="weui_cell" >
      <div class="inputLeft"  :style="topstyle">
        <label class="uedlable" :style="lableStyle" v-if="title">{{title}}</label>
      </div>
      <div class="inputRight":style="topstyle">
        <input
                class="btnS"
                type="type"
                :name="name"
                :placeholder="placeholder"
                :readonly="readonly"
                v-model="value"
                ref="input"></input>
    </div>
    <div class="weui_cell_ft">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
    export default {
        mounted() {
            if (this.readonly) {
                this.$refs.input.style.background = "#F5F6F6"
            }
        },
        computed: {
            lableStyle() {
                if (this.place == 'right') {
                    return {
                        float: `${"right"}`
                    }
                } else if (this.place == 'left') {
                    return {
                        float: `${"left"}`
                    }
                } else {
                    return {
                        clear: `${"both"}`,
                        lineHeight: `${"25"}px`,
                    }
                }
            },
            topstyle() {
                if (this.place == 'top') {
                    return {
                        clear: `${"both"}`,
                    }
                }
            }

        },
        props: {
            place: {
                type: String,
                default: 'left'
            },
            title: {
                type: String,
                default: ''
            },
            placeholder: String,
            value: {
                type: [String, Number],
                twoWay: true
            },
            name: String,
            readonly: {
                type: Boolean,
                default: false
            },
            showClear: {
                type: Boolean,
                default: true
            },
            type: {
                type: String,
                default: 'S'
            }
        }
    }
</script>
<style lang="less" scoped>
    .weui_cell {
        width: 340px;
        height: inherit;
        /*margin-bottom: 12px;*/
    }
    
    .inputLeft {
        float: left;
        width: 80px;
        margin-right: 20px;
    }
    
    .ipputRight {
        /*width: 240px;*/
        float: right;
    }
    
    .top {}
    
    .right {
        text-align: right;
        /*float: left;*/
        display: block;
    }
    
    .left {
        float: left;
    }
    
    .uedlable {
        font-size: 12px;
        line-height: 40px;
        color: #546472;
        /*float: right;*/
    }
    
    .btnS {
        /*float: right;*/
        /*height: 46px;*/
        height: 38px;
        font-size: 14px;
        outline: none;
        border: 0;
        text-indent: 11px;
        /*margin-bottom: 20px;*/
        border-radius: 5px;
        box-shadow: 0 0 1px 1px #ccc;
        &:hover {
            box-shadow: 0 0 1px 1px #3291EE;
        }
    }
</style>