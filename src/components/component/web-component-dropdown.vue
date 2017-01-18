<template>
  <div class="dropdown" :class="dropdownClasses" @mouseleave.prevent="togglePickup">
    <div ref="toggle" @mouseover.prevent="toggleDropdown" class="dropdown-toggle" :class="{'toggletop': bordercard, 'togglesize': settings }" type="button">
        <label v-show="chevron">
            <span ref="search" :class="{ 'bordercard': bordercard}">{{ placeholder }}</span>
            <svg v-show="!open" class="chevron" >
                <use xlink:href ="#icon-chevron-down"/>
            </svg>
            <svg v-show="open"  class="chevron">
                <use xlink:href ="#icon-chevron-up"/>
            </svg>
        </label>
        <svg v-show="!chevron" ref="settings" class="settings" >
                <use xlink:href ="#icon-settings"/>
        </svg>
	</div>
    <ul ref="dropdown-menu" :class="{'topdistance': bordercard }" v-show="open" class="dropdown-menu" :style="{ 'max-height': maxHeight }">
        <li v-for="option in options">
            <a @mousedown.prevent="select(option)">{{ option }}</a>
        </li>
    </ul>
  </div>
</template>
<script>
    export default {
        props: {
            options: {  //下拉列表
                type: Array,
                default () {
                    return []
                },
            },
            maxHeight: {
                type: String,
                default: '400px'
            },
            placeholder: {  //显示语句
                type: String,
                default: ''
            },
            type: {   //下拉列表类型
                type: String,
                defalut: ''
            }
        },
        data() {
            return {
                newvalue: '',
                open: false,
                bordercard: false,
                settings: false,
                chevron: true
            }
        },
        watch: {
            newvalue(val, old) {
                this.$emit('on-change', val)
            },
        },
        methods: {
            select(option) {
                this.newvalue = option
                this.open = false
            },
            toggleDropdown(e) {
                if (e.target === this.$refs.search || e.target === this.$refs.toggle || e.target === this.$refs.settings || e.target === this.$refs) {
                    this.open = true
                }
            },
            togglePickup(e){
                    this.open = false
            },
        },
        computed: {
            dropdownClasses() {
                return {
                    open: this.open
                }
            }
        },
        created() {
            if(this.type === "bordercard"){
                this.bordercard = true
            }else if(this.type === "settings"){
                this.chevron = false;
                this.settings = true
            }
        }
    }
</script>
<style scoped>
    .dropdown {
        position: relative;
        border: none !important;
        max-height: 400px;
    }
    .chevron {
        width: 26px;
        height: 26px;
        fill: #A9A9A9;
        position: absolute;
        top: 6px;
        right: 6px;
    }
    .settings{
        width: 26px;
        height: 26px;
        fill:#B9BFC5;
    }
    .dropdown-toggle {
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        display: block;
        height: 38px;
        padding: 10px 5px;
        white-space: normal;
        margin-bottom: 12px;
        background: transparent;
    }
    .toggletop.dropdown-toggle{
        height: 43px;
    }
    .togglesize.dropdown-toggle{
        height: 26px;
        width: 26px
    }
    .open .dropdown-toggle {
        border-bottom-color: transparent;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }
    .dropdown-menu {
        background: #FFFFFF;
        border-radius: 3px;
        margin: 0;
        overflow-y: auto;
        box-sizing: border-box;
        position: absolute;
        top: 36px;
        left: 0;
        z-index: 1000;
        float: left;
        width: 100%;
        padding: 5px 0;
        font-size: 14px;
        text-align: left;
        list-style: none;
        max-height: 400px;
        border: 1px solid #F5F6F6;
        box-shadow: 0 16px 30px 0 rgba(84,100,113,0.08);
    }
    .topdistance.dropdown-menu {
        top: 41px;
    }
    .dropdown-menu li {
        font-size: 14px;
        height: 38px;
        line-height: 38px;
        color: #2C3F51;
    }
    

    span {
        background: transparent;
        height: 38px;
        display: inline-block;
        outline: none;
        font-size: 14px;
        line-height: 38px;
        margin-top: -10px;
        width: 100% !important;
        left: 0;
        right: 0;
        max-width: 100%;
        position: absolute;
        clear: none;
        color: #A4ACB4;
        letter-spacing: 0;
    }
    .bordercard{
        text-indent: 12px;
        background: #F5F6F6;
        border: 1px solid #A4ACB4;
        box-shadow: 0 0 2px 0 rgba(4,26,48,0.12);
        border-radius: 3px;
        box-sizing: border-box;
        color: #546472;
    }
    li a {
        height: 100%;
        display: block;
        cursor: pointer;
        font-size: 14px;
        text-indent: 1em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }    
    li:hover>a {
        background: rgba(31,136,236,0.20);
    }
</style>