<template>
  <label class="el-checkbox">
    <span class="el-checkbox__input">
      <span class="el-checkbox__inner"
        :class="{
          'is-disabled': disabled,
          'is-checked': isChecked,
          'is-indeterminate': indeterminate,
          'is-focus': focus
        }"
      ></span>
      <input
        v-if="trueLabel || falseLabel"
        class="el-checkbox__original"
        type="checkbox"
        :name="name"
        :disabled="disabled"
        :true-value="trueLabel"
        :false-value="falseLabel"
        v-model="_value"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
        ref="checkbox">
      <input
        v-else
        class="el-checkbox__original"
        type="checkbox"
        :disabled="disabled"
        :value="label"
        :name="name"
        v-model="_value"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange">
    </span>
    <span class="el-checkbox__label" v-show="lableshow" v-if="$slots.default || label">
      <slot></slot>
      <template >{{label}}</template>
</span>
</label>
</template>
<script>
    // import Emitter from 'element-ui/src/mixins/emitter';

    export default {
        // mixins: [Emitter],
        props: {
            lableshow: {
                type: Boolean,
                default: true
            },
            value: {},
            label: String,
            indeterminate: Boolean,
            disabled: Boolean,
            checked: Boolean,
            name: String,
            trueLabel: [String, Number],
            falseLabel: [String, Number]
        },

        computed: {
            _value: {
                get() {
                    // alert(this.$parent.value)
                    return !this.wrapInGroup ? this.value : this.$parent.value;
                },
                set(newValue) {
                    if (!this.wrapInGroup) {
                        this.$emit('input', newValue);
                    } else {
                        this.$parent.$emit('input', newValue);
                    }
                }
            },
            isChecked() {
                // if (this.$parent.value == 'undefied') {
                var type = Object.prototype.toString.call(this._value);
                // } else {
                //     var type = Object.prototype.toString.call(this.$parent.value);
                // }
                if (type === '[object Boolean]') {
                    return this._value;
                } else if (type === '[object Array]') {
                    // if (this.$parent.value == 'undefied') {
                    return this._value.indexOf(this.label) > -1;
                    // } else {
                    // return this.$parent.value.indexOf(this.label) > -1;
                    // }
                } else if (type === '[object String]' || type === '[object Number]') {
                    return this._value === this.trueLabel;
                }
            }
        },

        data() {
            return {
                focus: false,
                wrapInGroup: this.$parent.$options.componentName === 'ElCheckboxGroup'
            };
        },

        watch: {
            checked: {
                immediate: true,
                handler(value) {
                    if (value) {
                        let type = Object.prototype.toString.call(this._value);
                        if (type !== '[object Array]') {
                            this._value = this.trueLabel || true;
                        } else {
                            this._value.push(this.label);
                        }
                    }
                }
            }
        },

        methods: {
            handleChange(ev) {
                this.$emit('change', ev);
            }
        }
    };
</script>
<style scoped>
    .el-checkbox,
    .el-checkbox__input {
        white-space: nowrap;
        cursor: pointer
    }
    
    .el-checkbox,
    .el-checkbox__inner,
    .el-checkbox__input {
        display: inline-block;
        position: relative
    }
    
    .el-checkbox {
        color: #1f2d3d;
        -moz-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none
    }
    
    .el-checkbox+.el-checkbox {
        margin-left: 15px
    }
    
    .el-checkbox__input {
        outline: 0;
        line-height: 1;
        vertical-align: middle
    }
    
    .el-checkbox__inner {
        margin-top: -8px;
        border: 1px solid #C0CCDA;
        border-radius: 4px;
        box-sizing: border-box;
        width: 18px;
        height: 18px;
        background-color: #fff;
        z-index: 1;
        transition: border-color .25s cubic-bezier(.71, -.46, .29, 1.46), background-color .25s cubic-bezier(.71, -.46, .29, 1.46)
    }
    
    .el-checkbox__inner:not(.is-disabled):hover {
        border-color: #20a0ff
    }
    
    .el-checkbox__inner::after {
        content: "";
        border: 2px solid #20a0ff;
        border-left: 0;
        border-top: 0;
        height: 8px;
        left: 5px;
        position: absolute;
        top: 1px;
        -ms-transform: rotate(45deg) scaleY(0);
        transform: rotate(45deg) scaleY(0);
        width: 4px;
        transition: transform .15s cubic-bezier(.71, -.46, .88, .6) .05s;
        -ms-transform-origin: center;
        transform-origin: center
    }
    
    .el-checkbox__inner.is-disabled.is-checked {
        background-color: #D3DCE6;
        border-color: #D3DCE6
    }
    
    .el-checkbox__inner.is-disabled.is-checked::after {
        border-color: #fff
    }
    
    .el-checkbox__inner.is-disabled.is-indeterminate {
        background-color: #D3DCE6;
        border-color: #D3DCE6
    }
    
    .el-checkbox__inner.is-disabled.is-indeterminate::before {
        border-color: #fff
    }
    
    .el-checkbox__inner.is-indeterminate {
        /*background-color: #20a0ff;*/
        border-color: #2e90fe
    }
    
    .el-checkbox__inner.is-indeterminate::before {
        content: '';
        position: absolute;
        display: block;
        border: 1px solid #fff;
        margin-top: -1px;
        left: 3px;
        right: 3px;
        top: 50%
    }
    
    .el-checkbox__inner.is-indeterminate::after {
        display: none
    }
    
    .el-checkbox__inner.is-focus {
        border-color: #20a0ff
    }
    
    .el-checkbox__inner.is-checked {
        /*background-color: #20a0ff;*/
        border-color: #2e90fe
    }
    
    .el-checkbox__inner.is-checked::after {
        -ms-transform: rotate(45deg) scaleY(1);
        transform: rotate(45deg) scaleY(1)
    }
    
    .el-checkbox__inner.is-disabled {
        background-color: #EFF2F7;
        border-color: #D3DCE6;
        cursor: not-allowed
    }
    
    .el-checkbox__inner.is-disabled::after {
        cursor: not-allowed;
        border-color: #EFF2F7
    }
    
    .el-checkbox__inner.is-disabled+.el-checkbox__label {
        cursor: not-allowed
    }
    
    .el-checkbox__original {
        opacity: 0;
        outline: 0;
        position: absolute;
        margin: 0;
        left: -999px
    }
    
    .el-checkbox__label {
        font-size: 14px;
        padding-left: 5px
    }
</style>