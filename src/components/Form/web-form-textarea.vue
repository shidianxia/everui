<template>
  <div class="weui_cell">
    <div class="weui_cell_bd">
      <textarea
              :disabled="readonly"
              :placeholder="placeholder"
              :name="name"
              :rows="rows"
              :cols="cols"
              v-model="value"
              :style="textareaStyle"
              :maxlength="max"
              ref="textarea">
      </textarea>
      <div class="count" v-show="showCounter && max"><span>{{count}}</span>/{{max}}</div>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                value: ""
            }
        },
        props: {
            readonly: {
                type: Boolean,
                default: false
            },
            //控制最大输入数显不显示
            showCounter: {
                type: Boolean,
                default: true
            },
            //输入最大数
            max: Number,
            // value: {
            //     type: String,
            //     default: '',
            //     twoWay: true
            // },
            name: String,
            placeholder: {
                type: String,
                default: ''
            },
            rows: {
                type: Number,
                default: 5
            },
            cols: {
                type: Number,
                default: 30
            },
            height: Number,
            width: Number,
            onchange: Function
                // https://github.com/yisibl/blog/issues/3
        },
        mounted() {
            if (this.readonly) {
                this.$refs.textarea.style.backgroundColor = "#F5F6F6"
                this.$refs.textarea.style.boxShadow = "0 0 1px 1px #ccc"
            }
        },
        watch: {
            value(newVal) {
                if (this.max && this.value.length > this.max) {
                    this.value = newVal.slice(0, this.max)
                }
                this.$emit('onchange', this.value)
            }
        },
        computed: {
            count() {
                return this.value.length
            },
            textareaStyle() {
                if (this.height || this.width) {
                    return {
                        height: `${this.height}px`,
                        width: `${this.width}`
                    }
                }
            }
        }
    }
</script>
<style lang="less" scoped="scoped">
    .weui_cell_bd {
        position: relative;
    }
    
    .count {
        /*float: right;*/
        position: absolute;
        right: 10px;
        bottom: 15px;
        color: #ccc;
        font-size: 15px;
    }
    
    textarea {
        font-size: 14px;
        outline: none;
        border: 0;
        text-indent: 11px;
        /*margin-bottom: 20px;*/
        border-radius: 5px;
        box-shadow: 0 0 1px 1px #ccc;
        /*height: 80px;*/
        width: 100%;
        padding-top: 10px;
        font-size: 14px;
        border: 0;
        resize: none;
        &:hover {
            box-shadow: 0 0 1px 1px #3291EE;
        }
    }
</style>