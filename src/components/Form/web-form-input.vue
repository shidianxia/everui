<template>
  <div :class="[
    type === 'textarea' ? 'el-textarea' : 'el-input',
    size ? 'el-input--' + size : '',
    {
      'is-disabled': disabled,
      'el-input-group': $slots.prepend || $slots.append
    }
  ]">
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div class="el-input-group__prepend" v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <!-- input 图标 -->
      <i class="el-input__icon" :class="[icon ? 'el-icon-' + icon : '']" v-if="icon" @click="handleIconClick"></i>
      <input
        v-if="type !== 'textarea'"
        class="el-input__inner"
        :type="type"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :minlength="minlength"
        :autocomplete="autoComplete"
        :autofocus="autofocus"
        :min="min"
        :max="max"
        :form="form"
        :value="value"
        ref="input"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <i class="el-input__icon el-icon-loading" v-if="validating"></i>
      <!-- 后置元素 -->
      <div class="el-input-group__append" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </template>
<textarea v-else class="el-textarea__inner" v-model="currentValue" ref="textarea" :name="name" :placeholder="placeholder" :disabled="disabled" :style="textareaStyle" :readonly="readonly" :rows="rows" :form="form" :autofocus="autofocus" :maxlength="maxlength"
    :minlength="minlength" @focus="handleFocus" @blur="handleBlur">
    </textarea>
</div>
</template>
<script>
    import emitter from '../Data/date-picker/src/utils/emitter';
    import calcTextareaHeight from './textheight';
    export default {
        name: 'ElInput',

        mixins: [emitter],

        props: {
            value: [String, Number],
            placeholder: String,
            size: String,
            readonly: Boolean,
            autofocus: Boolean,
            icon: String,
            disabled: Boolean,
            type: {
                type: String,
                default: 'text'
            },
            name: String,
            autosize: {
                type: [Boolean, Object],
                default: false
            },
            rows: {
                type: Number,
                default: 2
            },
            autoComplete: {
                type: String,
                default: 'off'
            },
            form: String,
            maxlength: Number,
            minlength: Number,
            max: {},
            min: {}
        },

        methods: {
            handleBlur(event) {
                this.$emit('blur', event);
                this.dispatch('form-item', 'el.form.blur', [this.currentValue]);
            },
            inputSelect() {
                this.$refs.input.select();
            },
            resizeTextarea() {
                var {
                    autosize,
                    type
                } = this;
                if (!autosize || type !== 'textarea') {
                    return;
                }
                const minRows = autosize.minRows;
                const maxRows = autosize.maxRows;

                this.textareaStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
            },
            handleFocus(event) {
                this.$emit('focus', event);
            },
            handleInput(event) {
                this.currentValue = event.target.value;
            },
            handleIconClick(event) {
                this.$emit('click', event);
            }
        },

        data() {
            return {
                currentValue: this.value,
                textareaStyle: {}
            };
        },

        created() {
            this.$on('inputSelect', this.inputSelect);
        },

        mounted() {
            this.resizeTextarea();
        },

        computed: {
            validating() {
                return this.$parent.validating;
            }
        },

        watch: {
            'value' (val, oldValue) {
                this.currentValue = val;
            },
            'currentValue' (val) {
                this.$nextTick(_ => {
                    this.resizeTextarea();
                });
                this.$emit('input', val);
                this.$emit('change', val);
                this.dispatch('form-item', 'el.form.change', [val]);
            }
        }
    };
</script>

<style scoped>
    .el-input__inner,
    .el-textarea__inner {
        box-sizing: border-box;
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1)
    }
    
    .el-input {
        position: relative;
        font-size: 14px
    }
    
    .is-disabled .el-input__inner {
        background-color: #EFF2F7;
        border-color: #D3DCE6;
        color: #bbb;
        cursor: not-allowed
    }
    
    .is-disabled .el-input__inner:hover {
        box-shadow: 0 0 1px 1px #d6dadd;
    }
    
    .el-input.is-disabled .el-input__inner {
        background-color: #EFF2F7;
        border-color: #D3DCE6;
        color: #bbb;
        cursor: not-allowed
    }
    
    .el-input.is-disabled .el-input__inner::-webkit-input-placeholder {
        color: #C0CCDA
    }
    
    .el-input.is-disabled .el-input__inner::-moz-placeholder {
        color: #C0CCDA
    }
    
    .el-input.is-disabled .el-input__inner:-ms-input-placeholder {
        color: #C0CCDA
    }
    
    .el-input.is-disabled .el-input__inner::placeholder {
        color: #C0CCDA
    }
    
    .el-input.is-active .el-input__inner {
        outline: 0;
        border-color: #20a0ff
    }
    
    .el-input__inner {
        display: block;
        padding: 3px 10px;
        width: 100%;
        height: 36px;
        color: #395164;
        background-color: #fff;
        background-image: none;
        /*border: 1px solid #C0CCDA;*/
        border: none;
        box-shadow: 0 0 1px 1px #d6dadd;
        border-radius: 4px;
        outline: 0;
        font-size: inherit;
        line-height: normal
    }
    
    .el-input__inner::-webkit-input-placeholder {
        color: #B9BFC5;
        font-size: 14px;
    }
    
    .el-input__inner::-moz-placeholder {
        color: #B9BFC5;
        font-size: 14px;
    }
    
    .el-input__inner:-ms-input-placeholder {
        color: #B9BFC5;
        font-size: 14px;
    }
    
    .el-input__inner::placeholder {
        color: #B9BFC5;
        font-size: 14px;
    }
    
    .el-input__inner:hover {
        box-shadow: 0 0 1px 1px #2088EC;
    }
    
    .el-input__inner:focus {
        box-shadow: 0 0 1px 1px #2088EC;
    }
    
    .el-input__icon {
        position: absolute;
        width: 35px;
        height: 100%;
        right: 0;
        text-align: center;
        color: #C0CCDA
    }
    
    .el-input__icon:after {
        content: '';
        height: 100%;
        width: 0;
        display: inline-block;
        vertical-align: middle
    }
    
    .el-input__icon+.el-input__inner {
        padding-right: 35px
    }
    
    .el-input--L {
        font-size: 16px
    }
    
    .el-input--L .el-input__inner {
        height: 46px
    }
    
    .el-input--M {
        font-size: 14px
    }
    
    .el-input--M .el-input__inner {
        height: 38px
    }
    
    .el-input--S {
        font-size: 12px
    }
    
    .el-input--S .el-input__inner {
        height: 26px
    }
    
    .el-input-group {
        line-height: normal;
        display: table;
        border-collapse: separate
    }
    
    .el-input-group>.el-input__inner {
        vertical-align: middle;
        display: table-cell
    }
    
    .el-input-group .el-input__inner:first-child {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0
    }
    
    .el-input-group .el-input__inner:last-child {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0
    }
    
    .el-input-group .el-input__inner:not(:first-child):not(:last-child) {
        border-radius: 0
    }
    
    .el-input-group__append,
    .el-input-group__prepend {
        background-color: #f9fafc;
        color: #99a9bf;
        vertical-align: middle;
        display: table-cell;
        position: relative;
        border: 1px solid #C0CCDA;
        border-radius: 4px;
        padding: 0 10px;
        width: 1%;
        white-space: nowrap
    }
    
    .el-input-group__append .el-button,
    .el-input-group__append .el-select,
    .el-input-group__prepend .el-button,
    .el-input-group__prepend .el-select {
        display: block;
        margin: -10px
    }
    
    .el-input-group__append .el-button,
    .el-input-group__append .el-select .el-input__inner,
    .el-input-group__append .el-select:hover .el-input__inner,
    .el-input-group__prepend .el-button,
    .el-input-group__prepend .el-select .el-input__inner,
    .el-input-group__prepend .el-select:hover .el-input__inner {
        border-color: transparent;
        background-color: transparent;
        color: inherit;
        border-top: 0;
        border-bottom: 0
    }
    
    .el-input-group__append .el-button,
    .el-input-group__append .el-input,
    .el-input-group__prepend .el-button,
    .el-input-group__prepend .el-input {
        font-size: inherit
    }
    
    .el-input-group__prepend {
        border-right: 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0
    }
    
    .el-input-group__append {
        border-left: 0;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0
    }
    
    .el-textarea.is-disabled .el-textarea__inner {
        background-color: #EFF2F7;
        border-color: #D3DCE6;
        color: #bbb;
        cursor: not-allowed
    }
    
    .el-textarea.is-disabled .el-textarea__inner::-webkit-input-placeholder {
        color: #C0CCDA
    }
    
    .el-textarea.is-disabled .el-textarea__inner::-moz-placeholder {
        color: #C0CCDA
    }
    
    .el-textarea.is-disabled .el-textarea__inner:-ms-input-placeholder {
        color: #C0CCDA
    }
    
    .el-textarea.is-disabled .el-textarea__inner::placeholder {
        color: #C0CCDA
    }
    
    .el-textarea__inner {
        display: block;
        resize: vertical;
        padding: 5px 7px;
        line-height: 1.5;
        width: 100%;
        font-size: 14px;
        color: #1f2d3d;
        background-color: #fff;
        background-image: none;
        border: 1px solid #C0CCDA;
        border-radius: 4px
    }
    
    .el-textarea__inner::-webkit-input-placeholder {
        color: #99a9bf
    }
    
    .el-textarea__inner::-moz-placeholder {
        color: #99a9bf
    }
    
    .el-textarea__inner:-ms-input-placeholder {
        color: #99a9bf
    }
    
    .el-textarea__inner::placeholder {
        color: #99a9bf
    }
    
    .el-textarea__inner:hover {
        border-color: #8492a6
    }
    
    .el-textarea__inner:focus {
        outline: 0;
        border-color: #20a0ff
    }
</style>