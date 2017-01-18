<template>
  <div class="el-autocomplete" v-clickoutside="handleBlur">
    <xinput
      :value="value"
      :placeholder="placeholder"
      :size="size"
      @change="handleChange"
      @focus="handleFocus"
      @keydown.up.native="highlight(highlightedIndex - 1)"
      @keydown.down.native="highlight(highlightedIndex + 1)"
      @keydown.enter.native="select(highlightedIndex)"
    ></xinput>
    <transition name="md-fade-bottom">
      <ul
        v-if="suggestionVisible"
        class="el-autocomplete__suggestions"
        :class="{ 'is-loading': loading }"
        ref="suggestions"
      >
        <li v-if="loading" class="loadingheight"><svg class="ued-loading"><use xlink:href="#icon-loading"></use></svg></li>
        <template v-for="(item, index) in suggestions" v-else>
          <li
            v-if="!customItem"
            :class="{'highlighted': highlightedIndex === index}"
            @click="select(index)"
          >
            {{item.value}}
          </li>
          <component
            v-else
            :class="{'highlighted': highlightedIndex === index}"
            @click="select(index)"
            :is="customItem"
            :item="item"
            :index="index">
          </component>
        </template>
</ul>
</transition>
</div>
</template>
<script>
    // import ElInput from 'element-ui/packages/input';
    import Clickoutside from './date-picker/src/utils/clickoutside';

    export default {
        name: 'ElAutocomplete',

        // components: {
        //     ElInput
        // },
        directives: {
            Clickoutside
        },
        props: {
            placeholder: String, //输入框占为文本
            disabled: Boolean, //禁用
            name: String, //
            size: String, //输入框尺寸
            value: String, //所选择的值
            fetchSuggestions: Function, //返回输入建议的方法，仅当你的输入建议数据 resolve 时，通过调用 callback(data:[]) 来返回它
            triggerOnFocus: {
                type: Boolean,
                default: true
            }, //
            customItem: String //通过该参数指定自定义的输入建议列表项的组件名
        },
        data() {
            return {
                suggestions: [],
                suggestionVisible: false,
                loading: false,
                highlightedIndex: -1
            };
        },
        mounted() {
            this.$parent.popperElm = this.popperElm = this.$el;
        },
        methods: {
            handleChange(value) {
                this.$emit('input', value);
                this.showSuggestions(value);
            },
            handleFocus() {
                if (this.triggerOnFocus) {
                    this.showSuggestions(this.value);
                }
            },
            handleBlur() {
                this.hideSuggestions();
            },
            select(index) {
                if (this.suggestions && this.suggestions[index]) {
                    this.$emit('input', this.suggestions[index].value);
                    this.$emit('select', this.suggestions[index]);
                    this.$nextTick(() => {
                        this.hideSuggestions();
                    });
                }
            },
            hideSuggestions() {
                this.suggestionVisible = false;
                this.suggestions = [];
                this.loading = false;
            },
            showSuggestions(value) {
                this.suggestionVisible = true;
                this.loading = true;
                this.fetchSuggestions(value, (suggestions) => {
                    this.loading = false;
                    if (Array.isArray(suggestions) && suggestions.length > 0) {
                        this.suggestions = suggestions;
                    } else {
                        this.hideSuggestions();
                    }
                });
            },
            highlight(index) {
                if (!this.suggestionVisible || this.loading) {
                    return;
                }
                if (index < 0) {
                    index = 0;
                } else if (index >= this.suggestions.length) {
                    index = this.suggestions.length - 1;
                }

                var elSuggestions = this.$refs.suggestions;
                var elSelect = elSuggestions.children[index];
                var scrollTop = elSuggestions.scrollTop;
                var offsetTop = elSelect.offsetTop;

                if (offsetTop + elSelect.scrollHeight > (scrollTop + elSuggestions.clientHeight)) {
                    elSuggestions.scrollTop += elSelect.scrollHeight;
                }
                if (offsetTop < scrollTop) {
                    elSuggestions.scrollTop -= elSelect.scrollHeight;
                }

                this.highlightedIndex = index;
            }
        }
    };
</script>
<style scoped>
    /*.loadingheight {
        height: 38px;
        width: 80%;
    }
    */
    
    .ued-loading:before {
        height: 30px;
        width: 30px;
    }
    
    @-webkit-keyframes icon1 {
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
    
    .ued-loading {
        margin-left:32%;
        height: 26px;
        width: 26px;
        fill: #2088EC;
        animation: icon1 1s linear infinite both reverse;
        -webkit-animation: icon1 1s linear infinite both reverse;
    }
    
    .el-input {
        position: relative;
        font-size: 14px
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
        box-sizing: border-box;
        width: 100%;
        height: 36px;
        color: #395164;
        background-color: #fff;
        background-image: none;
        border: none;
        /*border: 1px solid #C0CCDA;d6dadd*/
        box-shadow: 0 0 1px 1px #d6dadd;
        border-radius: 4px;
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
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
        /*border: none;
        border-color: #2088EC*/
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
    
    .el-input--large {
        font-size: 16px
    }
    
    .el-input--large .el-input__inner {
        height: 42px
    }
    
    .el-input--small {
        font-size: 13px
    }
    
    .el-input--small .el-input__inner {
        height: 30px
    }
    
    .el-input--mini {
        font-size: 12px
    }
    
    .el-input--mini .el-input__inner {
        height: 22px
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
    
    .el-autocomplete__suggestions,
    .el-textarea__inner {
        background-color: #fff;
        width: 100%;
        box-sizing: border-box
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
        font-size: 14px;
        color: #1f2d3d;
        background-image: none;
        border: 1px solid #C0CCDA;
        border-radius: 4px;
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1)
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
        border-color: #2088EC
    }
    
    .el-textarea__inner:focus {
        outline: 0;
        border-color: #20a0ff
    }
    
    .el-autocomplete {
        position: relative
    }
    
    .el-autocomplete__suggestions {
        background: #FFFFFF;
        border: 1px solid #F5F6F6;
        box-shadow: 0 16px 30px 0 rgba(84, 100, 113, 0.08);
        border-radius: 3px;
        position: absolute;
        left: 0;
        top: 110%;
        margin: 0;
        padding: 6px 0;
        z-index: 10;
        max-height: 280px;
        overflow: auto;
    }
    
    .el-autocomplete__suggestions li {
        list-style: none;
        line-height: 38px;
        padding: 0 10px;
        margin: 0;
        cursor: pointer;
        color: #395164;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis
    }
    
    .el-autocomplete__suggestions li:hover {
        background-color: #d3e6fd;
        /*opacity: 0.2;*/
        /*color: #395164;*/
    }
    
    .el-autocomplete__suggestions li.highlighted {
        background-color: #d3e6fd;
        color: #fff
    }
    
    .el-autocomplete__suggestions li:active {
        background-color: #d3e6fd
    }
    
    .el-autocomplete__suggestions li.divider {
        margin-top: 6px;
        border-top: 1px solid #D3DCE6
    }
    
    .el-autocomplete__suggestions li.divider:last-child {
        margin-bottom: -6px
    }
    
    .el-autocomplete__suggestions.is-loading li {
        text-align: center;
        height: 38px;
        line-height: 38px;
        font-size: 20px;
        color: #999
    }
    
    .el-autocomplete__suggestions.is-loading li:after {
        display: inline-block;
        content: "";
        height: 100%;
        vertical-align: middle
    }
    
    .el-autocomplete__suggestions.is-loading li:hover {
        background-color: #fff
    }
    
    .el-autocomplete__suggestions.is-loading .el-icon-loading {
        vertical-align: middle
    }
</style>