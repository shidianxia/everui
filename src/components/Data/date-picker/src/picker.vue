<template>
  <span
    class="el-date-editor"
    v-clickoutside="handleClose"
    :class="{
      'is-have-trigger': haveTrigger,
      'is-active': pickerVisible,
      'is-filled': !!this.internalValue
    }">

    <input
      class="el-date-editor__editor"
      :class="{ 'is-disabled': disabled }"
      :readonly="!editable || readonly"
      :disabled="disabled"
      type="text"
      :placeholder="placeholder"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
      ref="reference"
      v-model.lazy="visualValue" />
      <svg  class="ued-datapicker">
        <use xlink:href="#icon-datepicker"></use>
      </svg>

    <!--<span
      @click.stop="handleClickIcon"
      class="el-date-editor__trigger el-icon"
      :class="[showClose ? 'el-icon-close' : triggerClass]"
      @mouseenter="handleMouseEnterIcon"
      @mouseleave="showClose = false"
      v-if="haveTrigger">
    </span>-->
  </span>
</template>

<script>
    import Vue from 'vue';
    import Clickoutside from './utils/clickoutside';
    import {
        formatDate,
        parseDate,
        getWeekNumber
    } from './util';
    import Popper from './utils/vue-popper';
    import Emitter from './utils/emitter';

    const NewPopper = {
        props: {
            appendToBody: Popper.props.appendToBody,
            offset: Popper.props.offset,
            boundariesPadding: Popper.props.boundariesPadding
        },
        methods: Popper.methods,
        data: Popper.data,
        beforeDestroy: Popper.beforeDestroy
    };

    const RANGE_SEPARATOR = ' - ';
    const DEFAULT_FORMATS = {
        date: 'yyyy-MM-dd',
        month: 'yyyy-MM',
        datetime: 'yyyy-MM-dd HH:mm:ss',
        time: 'HH:mm:ss',
        timerange: 'HH:mm:ss',
        daterange: 'yyyy-MM-dd',
        datetimerange: 'yyyy-MM-dd HH:mm:ss'
    };
    const HAVE_TRIGGER_TYPES = [
        'date',
        'datetime',
        'time',
        'time-select',
        'week',
        'month',
        'year',
        'daterange',
        'timerange',
        'datetimerange'
    ];
    const DATE_FORMATTER = function(value, format) {
        return formatDate(value, format);
    };
    const DATE_PARSER = function(text, format) {
        text = text.split(':');
        if (text.length > 1) text = text.map(item => item.slice(-2));
        text = text.join(':');

        return parseDate(text, format);
    };
    const RANGE_FORMATTER = function(value, format) {
        if (Array.isArray(value) && value.length === 2) {
            const start = value[0];
            const end = value[1];

            if (start && end) {
                return formatDate(start, format) + RANGE_SEPARATOR + formatDate(end, format);
            }
        }
        return '';
    };
    const RANGE_PARSER = function(text, format) {
        const array = text.split(RANGE_SEPARATOR);
        if (array.length === 2) {
            const range1 = array[0].split(':').map(item => item.slice(-2)).join(':');
            const range2 = array[1].split(':').map(item => item.slice(-2)).join(':');
            return [parseDate(range1, format), parseDate(range2, format)];
        }
        return [];
    };
    const TYPE_VALUE_RESOLVER_MAP = {
        default: {
            formatter(value) {
                if (!value) return '';
                return '' + value;
            },
            parser(text) {
                if (text === undefined || text === '') return null;
                return text;
            }
        },
        week: {
            formatter(value) {
                if (value instanceof Date) {
                    const weekNumber = getWeekNumber(value);
                    return value.getFullYear() + 'w' + (weekNumber > 9 ? weekNumber : '0' + weekNumber);
                }
                return value;
            },
            parser(text) {
                const array = (text || '').split('w');
                if (array.length === 2) {
                    const year = Number(array[0]);
                    const month = Number(array[1]);

                    if (!isNaN(year) && !isNaN(month) && month < 54) {
                        return text;
                    }
                }
                return null;
            }
        },
        date: {
            formatter: DATE_FORMATTER,
            parser: DATE_PARSER
        },
        datetime: {
            formatter: DATE_FORMATTER,
            parser: DATE_PARSER
        },
        daterange: {
            formatter: RANGE_FORMATTER,
            parser: RANGE_PARSER
        },
        datetimerange: {
            formatter: RANGE_FORMATTER,
            parser: RANGE_PARSER
        },
        timerange: {
            formatter: RANGE_FORMATTER,
            parser: RANGE_PARSER
        },
        time: {
            formatter: DATE_FORMATTER,
            parser: DATE_PARSER
        },
        month: {
            formatter: DATE_FORMATTER,
            parser: DATE_PARSER
        },
        year: {
            formatter(value) {
                if (!value) return '';
                return '' + value;
            },
            parser(text) {
                const year = Number(text);
                if (!isNaN(year)) return year;

                return null;
            }
        },
        number: {
            formatter(value) {
                if (!value) return '';
                return '' + value;
            },
            parser(text) {
                let result = Number(text);

                if (!isNaN(text)) {
                    return result;
                } else {
                    return null;
                }
            }
        }
    };
    const PLACEMENT_MAP = {
        left: 'bottom-start',
        center: 'bottom-center',
        right: 'bottom-end'
    };

    export default {
        mixins: [Emitter, NewPopper],

        props: {
            format: String,
            readonly: Boolean,
            placeholder: String,
            disabled: Boolean,
            editable: {
                type: Boolean,
                default: true
            },
            align: {
                type: String,
                default: 'left'
            },
            value: {},
            haveTrigger: {},
            pickerOptions: {}
        },

        directives: {
            Clickoutside
        },

        data() {
            return {
                pickerVisible: false,
                showClose: false,
                internalValue: ''
            };
        },

        watch: {
            pickerVisible(val) {
                if (this.readonly || this.disabled) return;
                val ? this.showPicker() : this.hidePicker();
            },
            internalValue(val) {
                if (!val && this.picker && typeof this.picker.handleClear === 'function') {
                    this.picker.handleClear();
                }
                this.dispatch('form-item', 'el.form.change');
            },
            value: {
                immediate: true,
                handler(val) {
                    this.internalValue = val;
                }
            }
        },

        computed: {
            valueIsEmpty() {
                const val = this.internalValue;
                if (Array.isArray(val)) {
                    for (let i = 0, j = val.length; i < j; i++) {
                        if (val[i]) {
                            return false;
                        }
                    }
                } else {
                    if (val) {
                        return false;
                    }
                }
                return true;
            },

            triggerClass() {
                return this.type.indexOf('time') !== -1 ? 'el-icon-time' : 'el-icon-date';
            },

            selectionMode() {
                if (this.type === 'week') {
                    return 'week';
                } else if (this.type === 'month') {
                    return 'month';
                } else if (this.type === 'year') {
                    return 'year';
                }

                return 'day';
            },

            haveTrigger() {
                if (typeof this.showTrigger !== 'undefined') {
                    return this.showTrigger;
                }
                return HAVE_TRIGGER_TYPES.indexOf(this.type) !== -1;
            },

            visualValue: {
                get() {
                    const value = this.internalValue;
                    const formatter = (
                        TYPE_VALUE_RESOLVER_MAP[this.type] ||
                        TYPE_VALUE_RESOLVER_MAP['default']
                    ).formatter;
                    const format = DEFAULT_FORMATS[this.type];

                    return formatter(value, this.format || format);
                },

                set(value) {
                    if (value) {
                        const type = this.type;
                        const parser = (
                            TYPE_VALUE_RESOLVER_MAP[type] ||
                            TYPE_VALUE_RESOLVER_MAP['default']
                        ).parser;
                        const parsedValue = parser(value, this.format || DEFAULT_FORMATS[type]);

                        if (parsedValue) {
                            this.picker.value = parsedValue;
                        }
                        return;
                    }
                    this.picker.value = value;
                }
            }
        },

        created() {
            // vue-popper
            this.options = {
                boundariesPadding: 0,
                gpuAcceleration: false
            };
            this.placement = PLACEMENT_MAP[this.align] || PLACEMENT_MAP.left;
        },

        methods: {
            handleMouseEnterIcon() {
                if (!this.valueIsEmpty) {
                    this.showClose = true;
                }
            },

            handleClickIcon() {
                if (this.valueIsEmpty) {
                    this.pickerVisible = !this.pickerVisible;
                } else {
                    this.internalValue = '';
                }
            },

            handleClose() {
                this.pickerVisible = false;
            },

            handleFocus() {
                const type = this.type;

                if (HAVE_TRIGGER_TYPES.indexOf(type) !== -1 && !this.pickerVisible) {
                    this.pickerVisible = true;
                }
                this.$emit('focus', this);
            },

            handleBlur() {
                this.$emit('blur', this);
                this.dispatch('form-item', 'el.form.blur');
            },

            handleKeydown(event) {
                const keyCode = event.keyCode;
                const target = event.target;
                let selectionStart = target.selectionStart;
                let selectionEnd = target.selectionEnd;
                let length = target.value.length;

                // tab
                if (keyCode === 9) {
                    this.pickerVisible = false;
                    // enter
                } else if (keyCode === 13) {
                    this.pickerVisible = this.picker.visible = false;
                    this.visualValue = target.value;
                    target.blur();
                    // left
                } else if (keyCode === 37) {
                    event.preventDefault();

                    if (selectionEnd === length && selectionStart === length) {
                        target.selectionStart = length - 2;
                    } else if (selectionStart >= 3) {
                        target.selectionStart -= 3;
                    } else {
                        target.selectionStart = 0;
                    }
                    target.selectionEnd = target.selectionStart + 2;
                    // right
                } else if (keyCode === 39) {
                    event.preventDefault();
                    if (selectionEnd === 0 && selectionStart === 0) {
                        target.selectionEnd = 2;
                    } else if (selectionEnd <= length - 3) {
                        target.selectionEnd += 3;
                    } else {
                        target.selectionEnd = length;
                    }
                    target.selectionStart = target.selectionEnd - 2;
                }
            },

            hidePicker() {
                if (this.picker) {
                    this.picker.resetView && this.picker.resetView();
                    this.pickerVisible = this.picker.visible = false;
                    this.destroyPopper();
                }
            },

            showPicker() {
                if (!this.picker) {
                    this.panel.defaultValue = this.internalValue;
                    this.picker = new Vue(this.panel).$mount(document.createElement('div'));
                    this.popperElm = this.picker.$el;
                    this.picker.width = this.$refs.reference.getBoundingClientRect().width;
                    this.picker.showTime = this.type === 'datetime' || this.type === 'datetimerange';
                    this.picker.selectionMode = this.selectionMode;
                    if (this.format) {
                        this.picker.format = this.format;
                    }

                    const options = this.pickerOptions;

                    if (options && options.selectableRange) {
                        let ranges = options.selectableRange;
                        const parser = TYPE_VALUE_RESOLVER_MAP.datetimerange.parser;
                        const format = DEFAULT_FORMATS.timerange;

                        ranges = Array.isArray(ranges) ? ranges : [ranges];
                        this.picker.selectableRange = ranges.map(range => parser(range, format));
                    }

                    if (this.type === 'time-select' && options) {
                        this.$watch('pickerOptions.minTime', val => {
                            this.picker.minTime = val;
                        });
                    }

                    for (const option in options) {
                        if (options.hasOwnProperty(option) &&
                            // 忽略 time-picker 的该配置项
                            option !== 'selectableRange') {
                            this.picker[option] = options[option];
                        }
                    }

                    this.$el.appendChild(this.picker.$el);
                    this.pickerVisible = this.picker.visible = true;
                    this.picker.resetView && this.picker.resetView();

                    this.picker.$on('dodestroy', this.doDestroy);
                    this.picker.$on('pick', (date, visible = false) => {
                        this.$emit('input', date);
                        this.pickerVisible = this.picker.visible = visible;
                        this.picker.resetView && this.picker.resetView();
                    });

                    this.picker.$on('select-range', (start, end) => {
                        setTimeout(() => {
                            this.$refs.reference.setSelectionRange(start, end);
                            this.$refs.reference.focus();
                        }, 0);
                    });
                } else {
                    this.pickerVisible = this.picker.visible = true;
                }

                this.updatePopper();

                if (this.internalValue instanceof Date) {
                    this.picker.date = new Date(this.internalValue.getTime());
                    this.picker.resetView && this.picker.resetView();
                } else {
                    this.picker.value = this.internalValue;
                }

                this.$nextTick(() => {
                    this.picker.ajustScrollTop && this.picker.ajustScrollTop();
                });
            }
        }
    };
</script>
<style>
    .pickeryear {
        font-size: 18px;
        float: left;
        color: #546472;
        font-family: Arial;
    }
    
    .datepickicon {
        width: 26px;
        height: 26px;
        fill: "#f5ff6f6";
        float: left;
        cursor: pointer;
    }
    
    .onlydatepickicon {
        width: 26px;
        height: 26px;
        fill: "#f5ff6f6";
        float: right;
        cursor: pointer;
    }
    
    .onlydatepickicon:hover {
        box-sizing: border-box;
        border: 1px solid #f5f6f6;
        border-radius: 10px;
    }
    
    .prepickeryear {
        font-family: Arial;
        font-size: 18px;
        float: right;
        color: #546472;
    }
    
    .predatepickicon {
        width: 26px;
        height: 26px;
        fill: "#f5ff6f6";
        float: left;
        cursor: pointer;
    }
    
    .predatepickicon:hover {
        box-sizing: border-box;
        border: 1px solid #f5f6f6;
        border-radius: 10px;
    }
    
    .datepickicon:hover {
        box-sizing: border-box;
        border: 1px solid #f5f6f6;
        border-radius: 10px;
    }
    
    .el-month-table,
    .el-year-table {
        margin: -1px;
        border-collapse: collapse
    }
    
    .el-date-table {
        border-collapse: separate;
        border-spacing: 0 5px;
        font-size: 12px;
        min-width: 224px;
        /*height: 300px;*/
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none
    }
    
    .el-date-table td {
        width: 30px;
        height: 30px;
        /*padding: 2px;*/
        font-size: 14px;
        box-sizing: border-box;
        text-align: center;
        cursor: pointer;
        color: #546472;
        font-family: Arial;
    }
    
    .el-month-table td .cell,
    .el-year-table td .cell {
        width: 48px;
        height: 32px;
        display: block;
        line-height: 32px
    }
    
    .el-date-table td.next-month,
    .el-date-table td.prev-month {
        color: #ddd
    }
    
    .el-date-table td.today {
        color: #20a0ff
    }
    
    .el-date-table td.available:hover {
        border-radius: 15px;
        background-color: #e5e9f2
    }
    
    .el-date-table td.in-range:first-child {
        box-sizing: border-box;
        border-radius: 15px 0 0 15px;
        background-color: #EBF4FD
    }
    
    .el-date-table td.in-range:last-child {
        box-sizing: border-box;
        border-radius: 0 15px 15px 0;
        background-color: #EBF4FD
    }
    
    .el-date-table td.in-range {
        box-sizing: border-box;
        background-color: #EBF4FD
    }
    
    .el-date-table td.in-range:hover {
        background-color: #AFDCFF
    }
    
    .el-date-table td.current,
    .el-date-table td.end-date,
    .el-date-table td.start-date {
        border-radius: 15px !important;
        background-color: #2088EC!important;
        color: #fff;
        position: relative
    }
    
    .start-data::after {
        content: "";
        width: 15px;
        height: 15px;
        background: red;
        position: absolute;
        top: 0;
        right: 30px
    }
    
    .el-date-table td.disabled {
        background-color: #f4f4f4;
        opacity: 1;
        cursor: not-allowed;
        color: #ccc
    }
    
    .fade-in-enter,
    .fade-in-leave-active,
    .fade-in-linear-enter,
    .fade-in-linear-leave,
    .fade-in-linear-leave-active {
        opacity: 0
    }
    
    .el-date-table td.week {
        font-size: 80%;
        color: #8492a6
    }
    
    .el-date-table__row {
        /*display: block;
        padding: 5px;*/
        /*display: inline-block;*/
        /*margin-top: 100px;*/
    }
    
    .el-date-table th {
        padding: 5px;
        color: #8492a6;
        font-weight: 400
    }
    
    .el-date-table.is-week-mode .el-date-table__row:hover {
        background-color: #e5e9f2
    }
    
    .el-date-table.is-week-mode .el-date-table__row.current {
        background-color: #D3ECFF
    }
    
    .el-month-table {
        font-size: 12px
    }
    
    .el-month-table td {
        text-align: center;
        padding: 20px 3px;
        cursor: pointer
    }
    
    .el-month-table td .cell {
        color: #475669
    }
    
    .el-month-table td .cell:hover {
        background-color: #e5e9f2
    }
    
    .el-month-table td.disabled .cell {
        background-color: #f4f4f4;
        cursor: not-allowed;
        color: #ccc
    }
    
    .el-month-table td.current .cell {
        background-color: #20a0ff!important;
        color: #fff
    }
    
    .el-year-table {
        font-size: 12px
    }
    
    .el-year-table .el-icon {
        color: #99a9bf
    }
    
    .el-year-table td {
        text-align: center;
        padding: 20px 3px;
        cursor: pointer
    }
    
    .el-year-table td .cell {
        color: #475669
    }
    
    .el-year-table td .cell:hover {
        background-color: #e5e9f2
    }
    
    .el-year-table td.disabled .cell {
        background-color: #f4f4f4;
        cursor: not-allowed;
        color: #ccc
    }
    
    .el-year-table td.current .cell {
        background-color: #20a0ff!important;
        color: #fff
    }
    
    .el-time-spinner__wrapper {
        height: 190px;
        overflow: hidden;
        -ms-flex: 1;
        flex: 1;
        vertical-align: top;
        position: relative;
        -ms-overflow-style: none
    }
    
    .el-time-spinner__wrapper:hover {
        overflow-y: auto
    }
    
    .el-time-spinner__list {
        padding: 0;
        margin: 0;
        list-style: none;
        text-align: center
    }
    
    .el-time-spinner__list::after,
    .el-time-spinner__list::before {
        content: '';
        display: block;
        width: 100%;
        height: 80px
    }
    
    .el-time-spinner__item {
        height: 32px;
        line-height: 32px;
        font-size: 12px
    }
    
    .el-time-spinner__item:hover:not(.disabled):not(.active) {
        background: #E5E9F2;
        cursor: pointer
    }
    
    .el-time-spinner__item.active:not(.disabled) {
        color: #fff
    }
    
    .el-time-spinner__item.disabled {
        color: #d3dce6;
        cursor: not-allowed
    }
    
    .fade-in-linear-enter-active,
    .fade-in-linear-leave-active {
        transition: opacity .2s linear
    }
    
    .fade-in-enter-active,
    .fade-in-leave-active,
    .md-fade-center-enter-active,
    .md-fade-center-leave-active {
        transition: all .3s cubic-bezier(.55, 0, .1, 1)
    }
    
    .md-fade-bottom-enter-active,
    .md-fade-bottom-leave-active,
    .md-fade-left-enter-active,
    .md-fade-left-leave-active,
    .md-fade-right-enter-active,
    .md-fade-right-leave-active,
    .md-fade-top-enter-active,
    .md-fade-top-leave-active {
        transition: transform .3s cubic-bezier(.23, 1, .32, 1) .1s, opacity .3s cubic-bezier(.23, 1, .32, 1) .1s
    }
    
    .md-fade-center-enter,
    .md-fade-center-leave,
    .md-fade-center-leave-active {
        opacity: 0;
        -ms-transform: scaleY(0);
        transform: scaleY(0)
    }
    
    .md-fade-bottom-enter-active,
    .md-fade-bottom-leave-active {
        opacity: 1;
        -ms-transform: scaleY(1);
        transform: scaleY(1);
        -ms-transform-origin: center top;
        transform-origin: center top
    }
    
    .md-fade-bottom-enter,
    .md-fade-bottom-leave,
    .md-fade-bottom-leave-active {
        opacity: 0;
        -ms-transform: scaleY(0);
        transform: scaleY(0)
    }
    
    .md-fade-top-enter-active,
    .md-fade-top-leave-active {
        opacity: 1;
        -ms-transform: scaleY(1);
        transform: scaleY(1);
        -ms-transform-origin: center bottom;
        transform-origin: center bottom
    }
    
    .md-fade-top-enter,
    .md-fade-top-leave,
    .md-fade-top-leave-active {
        opacity: 0;
        -ms-transform: scaleY(0);
        transform: scaleY(0)
    }
    
    .md-fade-left-enter-active,
    .md-fade-left-leave-active {
        opacity: 1;
        -ms-transform: scaleX(1);
        transform: scaleX(1);
        -ms-transform-origin: right center;
        transform-origin: right center
    }
    
    .md-fade-left-enter,
    .md-fade-left-leave,
    .md-fade-left-leave-active {
        opacity: 0;
        -ms-transform: scaleX(0);
        transform: scaleX(0)
    }
    
    .md-fade-right-enter-active,
    .md-fade-right-leave-active {
        opacity: 1;
        -ms-transform: scaleX(1);
        transform: scaleX(1);
        -ms-transform-origin: left center;
        transform-origin: left center
    }
    
    .md-fade-right-enter,
    .md-fade-right-leave,
    .md-fade-right-leave-active {
        opacity: 0;
        -ms-transform: scaleX(0);
        transform: scaleX(0)
    }
    
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity .3s cubic-bezier(.645, .045, .355, 1)
    }
    
    .fade-enter,
    .fade-leave-active {
        opacity: 0
    }
    
    .list-enter-active,
    .list-leave-active,
    .list-move {
        transition: all .5s cubic-bezier(.55, 0, .1, 1)
    }
    
    .el-date-editor__editor,
    .el-date-picker__editor,
    .el-date-range-picker__editor {
        transition: border .3s;
        box-sizing: border-box
    }
    
    .list-enter,
    .list-leave-active {
        opacity: 0;
        -ms-transform: translate(0, -30px);
        transform: translate(0, -30px)
    }
    
    .el-date-editor {
        position: relative;
        display: inline-block;
        box-sizing: border-box;
        height: 36px;
        width: 182px
    }
    
    .el-date-editor__editor:hover {
        box-shadow: 0 0 1px 1px #3291EE;
    }
    
    .el-date-editor .el-picker-panel {
        position: absolute;
        min-width: 180px;
        box-sizing: border-box;
        box-shadow: 0 2px 6px #ccc;
        background: #fff;
        z-index: 10;
        top: 41px
    }
    
    .el-date-editor.lg .el-date-editor__editor {
        padding: 6px 4px
    }
    
    .el-date-editor.sm .el-date-editor__editor {
        padding: 1px
    }
    
    .el-date-editor.is-have-trigger .el-date-editor__editor {
        padding-right: 20px
    }
    
    .el-date-editor.is-have-trigger .el-date-editor__clear {
        right: 22px
    }
    
    .el-date-editor__editor {
        /*border: 1px solid #c0ccda;*/
        font-family: Arial;
        font-size: 14px;
        text-align: left;
        border: none;
        box-shadow: 0 0 1px 1px #ccc;
        border-radius: 4px;
        line-height: 18px;
        height: 38px;
        padding: 3px 10px;
        width: 100%;
        color: #666;
        font-size: 14px
    }
    
    .el-date-editor__editor::-webkit-input-placeholder {
        color: #bbb;
        font-size: 14px
    }
    
    .el-date-editor__editor::-moz-placeholder {
        color: #bbb;
        font-size: 14px
    }
    
    .el-date-editor__editor:-ms-input-placeholder {
        color: #bbb;
        font-size: 14px
    }
    
    .el-date-editor__editor::placeholder {
        color: #bbb;
        font-size: 14px
    }
    
    .el-date-editor__editor.is-disabled {
        background-color: #EFF2F7;
        border-color: #D3DCE6;
        color: #bbb;
        cursor: not-allowed
    }
    
    .el-date-editor__editor.is-disabled::-webkit-input-placeholder {
        color: #C0CCDA
    }
    
    .el-date-editor__editor.is-disabled::-moz-placeholder {
        color: #C0CCDA
    }
    
    .el-date-editor__editor.is-disabled:-ms-input-placeholder {
        color: #C0CCDA
    }
    
    .el-date-editor__editor.is-disabled::placeholder {
        color: #C0CCDA
    }
    
    .ued-datapicker {
        /*cursor: pointer;*/
        position: absolute;
        width: 26px;
        height: 26px;
        top: 5px;
        right: 9px;
        bottom: 0;
        fill: #c0ccda;
    }
    
    .el-date-editor__trigger.el-icon {
        cursor: pointer;
        position: absolute;
        display: inline-block;
        width: 16px;
        right: 10px;
        top: 0;
        bottom: 0;
        color: #c0ccda;
        font-size: 16px;
        line-height: 38px
    }
    
    .el-date-editor__clear {
        cursor: pointer;
        position: absolute;
        width: 20px;
        right: 0;
        top: 0;
        bottom: 0;
        line-height: 36px;
        color: #99a9bf
    }
    
    .el-date-editor__clear:hover {
        color: #20a0ff
    }
    
    .el-date-editor.is-active>.el-date-editor__editor,
    .el-date-editor:hover>.el-date-editor__editor,
    .el-date-editor__editor:focus {
        outline: 0;
        border-color: #20a0ff
    }
    
    .el-date-editor .el-date-editor__clear {
        display: none
    }
    
    .el-date-editor.is-filled.is-active>.el-date-editor__clear,
    .el-date-editor.is-filled:hover .el-date-editor__clear {
        display: inline-block
    }
    
    .el-picker-panel {
        color: #475669;
        box-shadow: 0 1px 6px #ccc;
        background: #fff;
        border-radius: 2px;
        /*line-height: 25px;*/
        margin: 5px 0
    }
    
    .el-picker-panel__body-wrapper::after,
    .el-picker-panel__body::after {
        content: "";
        display: table;
        clear: both
    }
    
    .el-picker-panel__content {
        position: relative;
        margin: 15px
    }
    
    .el-picker-panel__footer {
        border-top: 1px solid #e4e4e4;
        padding: 4px;
        text-align: right;
        background-color: #fff;
        position: relative
    }
    
    .el-picker-panel__shortcut {
        display: block;
        width: 100%;
        border: 0;
        background-color: transparent;
        line-height: 28px;
        font-size: 14px;
        color: #475669;
        padding-left: 12px;
        text-align: left;
        outline: 0;
        cursor: pointer
    }
    
    .el-picker-panel__shortcut:hover {
        background-color: #e5e9f2
    }
    
    .el-picker-panel__shortcut.active {
        background-color: #e6f1fe;
        color: #20a0ff
    }
    
    .el-picker-panel__btn {
        border: 1px solid #dcdcdc;
        color: #333;
        line-height: 24px;
        border-radius: 2px;
        padding: 0 20px;
        cursor: pointer;
        background-color: transparent;
        outline: 0;
        font-size: 12px
    }
    
    .el-picker-panel__btn[disabled] {
        color: #ccc;
        cursor: not-allowed
    }
    
    .el-picker-panel__icon-btn {
        font-size: 12px;
        color: #99a9bf;
        border: 0;
        background: 0 0;
        cursor: pointer;
        outline: 0;
        margin-top: 3px
    }
    
    .el-picker-panel__icon-btn:hover {
        height: 20px;
        width: 20px;
        border: 1px solid #f5f6f6;
        border-radius: 10px;
    }
    
    .el-picker-panel__link-btn {
        cursor: pointer;
        color: #55a4ff;
        text-decoration: none;
        padding: 15px;
        font-size: 12px
    }
    
    .el-picker-panel [slot=sidebar],
    .el-picker-panel__sidebar {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 110px;
        border-right: 1px solid #e4e4e4;
        box-sizing: border-box;
        padding-top: 6px;
        background-color: #f9fafc
    }
    
    .el-picker-panel [slot=sidebar]+.el-picker-panel__body,
    .el-picker-panel__sidebar+.el-picker-panel__body {
        margin-left: 110px
    }
    
    .el-date-picker {
        height: 300px;
        min-width: 254px
    }
    
    .el-date-picker .el-picker-panel__content {
        min-width: 224px
    }
    
    .el-date-picker table {
        table-layout: fixed;
        width: 100%
    }
    
    .el-date-picker.has-sidebar.has-time {
        min-width: 434px
    }
    
    .el-date-picker.has-sidebar {
        min-width: 370px
    }
    
    .el-date-picker.has-time {
        min-width: 324px
    }
    
    .el-date-picker__editor-wrap {
        position: relative;
        display: table-cell;
        padding: 0 5px
    }
    
    .el-date-picker__editor {
        position: relative;
        border: 1px solid #c0ccda;
        border-radius: 4px;
        padding: 5px 10px;
        height: 28px;
        outline: 0;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        width: 100%
    }
    
    .el-date-picker__editor:hover {
        border-color: #20a0ff
    }
    
    .el-date-picker__time-header {
        position: relative;
        border-bottom: 1px solid #e4e4e4;
        font-size: 12px;
        padding: 8px 5px 5px;
        display: table;
        width: 100%;
        box-sizing: border-box
    }
    
    .el-date-picker__header {
        margin: 12px;
        text-align: center
    }
    
    .el-date-picker__header-label {
        /*width: 100%;*/
        font-family: Arial;
        font-size: 18px;
        /*margin: 0 5px;*/
        /*line-height: 22px;*/
        text-align: center;
        /*cursor: pointer;*/
        /*float: left;*/
    }
    /*.el-date-picker__header-label.active,
    .el-date-picker__header-label:hover {
        /*color: #20a0ff
    }*/
    
    .el-date-picker__prev-btn {
        float: left
    }
    
    .el-date-picker__next-btn {
        float: right
    }
    
    .el-date-picker__time-wrap {
        padding: 10px;
        text-align: center
    }
    
    .el-date-picker__time-label {
        float: left;
        cursor: pointer;
        line-height: 30px;
        margin-left: 10px
    }
    
    .el-date-range-picker {
        height: 300px;
        min-width: 520px
    }
    
    .el-date-range-picker table {
        table-layout: fixed;
        width: 100%
    }
    
    .el-date-range-picker .el-picker-panel__body {
        min-width: 513px
    }
    
    .el-date-range-picker .el-picker-panel__content {
        margin: 0
    }
    
    .el-date-range-picker.has-sidebar.has-time {
        min-width: 766px
    }
    
    .el-date-range-picker.has-sidebar {
        min-width: 620px
    }
    
    .el-date-range-picker.has-time {
        min-width: 660px
    }
    
    .el-date-range-picker__editor {
        position: relative;
        border: 1px solid #c0ccda;
        border-radius: 4px;
        padding: 5px 10px;
        height: 28px;
        outline: 0;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        width: 100%
    }
    
    .el-date-range-picker__editor:hover {
        border-color: #20a0ff
    }
    
    .el-date-range-picker__header {
        position: relative;
        text-align: center;
        height: 28px
    }
    
    .el-date-range-picker__header button {
        float: left
    }
    
    .el-date-range-picker__header div {
        /*font-size: 14px;*/
        margin-right: 50px
    }
    
    .el-date-range-picker__content {
        float: left;
        width: 50%;
        box-sizing: border-box;
        margin: 0;
        padding: 16px 16px 0 16px;
    }
    
    .el-date-range-picker__content.is-right .el-date-range-picker__header button {
        float: right
    }
    
    .el-date-range-picker__content.is-right .el-date-range-picker__header div {
        margin-left: 45px;
        margin-right: 45px
    }
    
    .el-date-range-picker__content.is-left {
        border-right: 1px solid #e4e4e4
    }
    
    .el-date-range-picker__editors-wrap {
        box-sizing: border-box;
        display: table-cell
    }
    
    .el-date-range-picker__editors-wrap.is-right {
        text-align: right
    }
    
    .el-date-range-picker__time-header {
        position: relative;
        border-bottom: 1px solid #e4e4e4;
        font-size: 12px;
        padding: 8px 5px 5px;
        display: table;
        width: 100%;
        box-sizing: border-box
    }
    
    .el-date-range-picker__time-header>.el-icon-arrow-right {
        font-size: 20px;
        vertical-align: middle;
        display: table-cell;
        color: #99a9bf
    }
    
    .el-date-range-picker__time-picker-wrap {
        position: relative;
        display: table-cell;
        padding: 0 5px
    }
    
    .el-date-range-picker__time-picker-wrap .el-picker-panel {
        position: absolute;
        top: 13px;
        right: 0;
        z-index: 1;
        background: #fff
    }
    
    .el-time-range-picker {
        min-width: 354px;
        overflow: visible
    }
    
    .el-time-range-picker__content {
        position: relative;
        text-align: center;
        padding: 10px;
        display: -ms-flexbox;
        display: flex
    }
    
    .el-time-range-picker__cell {
        box-sizing: border-box;
        margin: 0;
        padding: 4px 7px 7px;
        -ms-flex: 1;
        flex: 1
    }
    
    .el-time-range-picker__header {
        margin-bottom: 5px;
        text-align: center;
        font-size: 14px
    }
    
    .el-time-range-picker__body {
        display: -ms-flexbox;
        display: flex;
        border-radius: 2px;
        border: 1px solid #d3dce6
    }
</style>