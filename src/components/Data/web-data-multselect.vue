<template>
    <div class="dropdown" :class="dropdownClasses">
        <div ref="toggle" @mousedown.prevent="toggleDropdown" class="dropdown-toggle clearfix" type="button">
            <span class="selected-tag" v-for="option in valueAsArray">
                {{ getOptionLabel(option) }}
                <button  @click="deletes(option)" type="button" class="close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </span>
            <input
                    ref="search"
                    @blur="open = false"
                    @focus="open = true"
                    readOnly="true"
                    type="search"
                    :placeholder="searchPlaceholder"
            >
            <svg v-show="!open" class="chevron" @click="selected">
                   <use xlink:href ="#icon-chevron-down"/>
            </svg>
            <svg v-show="open"  class="chevron" @click="selected">
                   <use xlink:href ="#icon-chevron-up"/>
            </svg>
        </div>
        <ul v-show="open" ref="dropdown-menu" :transition="transition" :style="{ 'max-height': maxHeight }"
            class="dropdown-menu animated">
            <li v-for="option in filteredOptions"
                :class="{ active: isOptionSelected(option), highlight: $index === typeAheadPointer }"
                @mouseover="typeAheadPointer = $index">
                <a @mousedown.prevent="select(option)">
                    {{ getOptionLabel(option) }}
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        props: {
            value: {
                default: null
            },
            options: {
                type: Array,
                default () {
                    return []
                },
            },
              keys:{
                type:String,
                default:''
            },
            valu:{
                type:String,
                default:''
            },
            maxHeight: {
                type: String,
                default: '400px'
            },
            placeholder: {
                type: String,
                default: ''
            },
            transition: {
                type: String,
                default: 'expand'
            },
            clearSearchOnSelect: {
                type: Boolean,
                default: true
            },
        },

        data() {
            return {
                osign:[],
                open: false,
                typeAheadPointer: -1,
                newvalue: this.value
            }
        },
        watch: {
            newvalue(val, old) {
                this.$emit('on-change', val)
            },
            filteredOptions() {
                this.typeAheadPointer = 0;
            },
        },
        methods: {
            deletes(option){
                if(this.keys !=""){
                     var index = this.newvalue.indexOf(option[this.valu])
                 this.newvalue.splice(index, 1)
                  var indexs = this.osign.indexOf(option[this.keys])
                 this.osign.splice(indexs, 1)
                }else{
                     var index = this.newvalue.indexOf(option)
                 this.newvalue.splice(index, 1)
                  var indexs = this.osign.indexOf(option)
                 this.osign.splice(indexs, 1)
                }
                
            },
            select(option) {
                if (!this.isOptionSelected(option)) {
                    if (!this.newvalue) {
                        this.newvalue= [option]
                        this.osign=[option]
                    } else {
                        if(this.keys !=""){
                             this.newvalue.push(option[this.valu])
                        this.osign.push(option[this.keys])
                        }else{
                            this.newvalue.push(option)
                        this.osign.push(option)
                        }
                        
                    }
                }
            },
            toggleDropdown(e) {
                if (e.target === this.$refs.search || e.target === this.$refs.toggle || e.target === this.$refs) {
                    if (this.open) {
                        this.$refs.search.blur()
                    } else {
                        this.open = true
                        this.$refs.search.focus()
                    }
                }
            },
            selected() {
                if (this.open) {
                    this.$refs.search.blur()
                } else {
                    this.open = true
                    this.$refs.search.focus()
                }
            },
            isOptionSelected(option) {
                if (this.keys !='') {
                    return this.newvalue.indexOf(option[this.valu]) !== -1
                }else{
                    //  console.log(this.newvalue === option)                                      
                     return  this.newvalue.indexOf(option) !== -1
                }
            },
            getOptionLabel(option) {
                if (this.keys !="") {
                    if (option[this.keys]) {
                        return option[this.keys];
                    } else if (option) {
                        return option
                    }
                }
                return option;
            },
        },

        computed: {
            dropdownClasses() {
                return {
                    open: this.open,
                    searchable: true
                }
            },
            searchPlaceholder() {
                if (this.isValueEmpty && this.placeholder) {
                    return this.placeholder;
                }
            },
            filteredOptions() {
                return this.options;
            },
            isValueEmpty() {
                if (this.value) {
                    if (typeof this.value === 'object') {
                        return !Object.keys(this.value).length
                    }
                    return !this.value.length
                }
                return true;
            },
            valueAsArray() {
                return this.osign
            }
        }

    }
</script>
<style scoped>
    .dropdown {
        position: relative;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        max-height: 400px;
    }
    .open .dropdown-toggle,
    .open .dropdown-menu {
        overflow: auto;
        margin-bottom: 50px;
    }  
    .open .dropdown-menu {
        border-top: none;
    }    
    .dropdown-toggle {
        min-height: 38px;
        border: 1px solid #D6DADD;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        display: block;
        padding: 0;
        border-radius: 3px;
        background: #FFFFFF;
        box-shadow: 0 0 2px 0 rgba(4,26,48,0.12);
        white-space: normal
    }
    .dropdown-toggle:hover {
        border: 1px solid #2088EC;
        box-shadow: 0 0 2px 0 rgba(0,0,0,0.12);
    }
    .open .dropdown-toggle {
        border: 1px solid #2088EC;
        box-shadow: 0 0 4px 0 rgba(31,136,236,0.60);   
    } 
    .selected-tag {
        background: #F5F6F6;
        border-radius: 3px;
        font-size: 14px;
        color: #041B30;
        line-height: 28px;
        position: relative;
        height: 28px;
        margin: 5px 0px 5px 5px;
        padding: 0 1.75em 0 0.25em;
        float: left;
        cursor: default;
    }
    .selected-tag .close {
        position: absolute;
        top: 0;
        right: 7px;
        font-size: 13px;
        border: none;
        color: #B9BFC5;
        background-color: transparent;
    }
    .chevron{
        width: 26px;
        height: 26px;
        fill: #A9A9A9;
        position: absolute;
        top: 8px;
        right: 6px;
    }
    .dropdown-menu {
        margin: 0;
        width: 100%;
        margin-top: 5px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 1000;
        min-width: 160px;
        padding: 5px 0;
        font-size: 14px;
        text-align: left;
        list-style: none;
        -webkit-background-clip: padding-box;
        background-clip: padding-box;
        background: #FFFFFF;
        border: 1px solid #F5F6F6;
        box-shadow: 0 16px 30px 0 rgba(84,100,113,0.08);
        border-radius: 3px;
    }
    .dropdown-menu li {
        height: 38px;
        line-height: 38px;
    }
    li a {
        height: 100%;
        display: block;
        cursor: pointer;
        text-indent: 12px;
    }
    .active a {
        color: #2088EC;
        font-family: PingFangSC-Semibold;
    }
    li:hover>a {
        background: rgba(31,136,236,0.20);
    }
    input[type=search],
    input[type=search]:focus {
        border-radius: 3px;
        height: 38px;
        display: inline-block;
        outline: none;
        text-indent: 12px;
        width: 100px;
        border: none;
        clear: none;
    }
</style>

