<template>
  <div class="dropdown" :class="dropdownClasses" >
    <div ref="toggle" @mousedown.prevent="toggleDropdown" class="dropdown-toggle clearfix" type="button">
        <span class="selected-tag" v-for="option in valueAsArray">
          {{ getvalue(option) }}
        </span>
        <input
            ref="search"
            readonly unselectable="on"
            :stop="stop"
            @blur="open = false" 
            @focus="focus"
            type="search"
            class="form-control"
            :placeholder="searchPlaceholder"
        >
         <svg v-show="!open" class="chevron" >
                   <use xlink:href ="#icon-chevron-down"/>
            </svg>
            <svg v-show="open"  class="chevron">
                   <use xlink:href ="#icon-chevron-up"/>
            </svg>
		<i ref="open-indicator" role="presentation" class="open-indicator"></i>
	</div>
    <ul ref="dropdown-menu" v-show="open" :transition="transition" class="dropdown-menu" :style="{ 'max-height': maxHeight }">
        <li v-for="option in options" :class="{ active: isOptionSelected(option), highlight: $index === typeAheadPointer }" @mouseover="typeAheadPointer = $index">
            <a @mousedown.prevent="select(option)">{{ getshow(option) }}</a>
        </li>
    </ul>
  </div>
</template>
<script>
    export default {
        props: {
            value: {
                type: String,
                default: ''
            },
            keys:{
                type:String,
                default:''
            },
            valu:{
                type:String,
                default:''
            },
            options: {
                type: Array,
                default () {
                    return []
                },
            },
            maxHeight: {
                type: String,
                default: '400px'
            },
            stop: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
                default: ''
            },
            transition: {
                type: String,
                default: 'expand'
            },
        },
        data() {
            return {
                osign:"",
                newvalue: this.value,
                open: false,
                typeAheadPointer: -1,
            }
        },
        mounted() {
            if(this.value !="" && this.keys !=""){
                this.valueAsArray=[]
                for(let i=0;i<this.options.length;i++){
                    if(this.value==this.options[i][this.valu]){
                       console.log(this.options[i][this.keys])
                    //    this.valueAsArray.push(this.options[i][this.keys])
                    this.osign=this.options[i][this.keys]
                    }
                }
            }
            if (this.stop) {
                this.$refs.search.style.background = "#F5F6F6"
                this.$refs.search.style.boxShadow = "0 0 1px 1px #ccc"
            }
        },
        watch: {
            newvalue(val, old) {
                this.$emit('on-change', val)
            },
        },
        methods: {
            getvalue(val){ 
                 if(this.keys !=''){
                    return val[0]
                }else{
                    return val                 
                }
            },
            getshow(val){
                if(this.keys !=''){
                    return val[this.keys]
                }else{
                    return val                 
                }
            },
            focus() {
                if (this.stop) {
                    if (this.open) {
                        this.open = false
                    }
                } else {
                    this.open = true
                }
            },
            select(option) {
                // var that=this
                if (!this.isOptionSelected(option)) {
                     if(this.keys !=''){
                          this.newvalue = option[this.valu]
                          this.osign=option[this.keys]
                    }else{
                          this.newvalue = option
                           this.osign=option               
                        }
                } else(
                    this.newvalue = ''
                )
                this.onAfterSelect(option)
            },
            onAfterSelect(option) {
                this.open = !this.open
                this.$refs.search.blur()
            },
            toggleDropdown(e) {
                if (e.target === this.$refs.search || e.target === this.$refs.toggle || e.target === this.$refs) {
                    if (this.open) {
                        this.$refs.search.blur()
                    } else {
                        if (!this.stop) {
                            this.open = true
                            this.$refs.search.focus()
                        }
                    }
                }
            },
            isOptionSelected(option) {
                 if(this.keys !=''){
                      return this.newvalue === option[this.valu]
                    // return true
                 }else{
                     return this.newvalue === option;                     
                 }
            },
        },
        computed: {
            dropdownClasses() {
                return {
                    open: this.open,
                    searchable: true,
                }
            },
            searchPlaceholder() {
                if (this.isValueEmpty && this.placeholder) {
                    return this.placeholder;
                }
            },
            isValueEmpty() {
                if (this.value) {
                    return !this.value.length
                }
                return true;
            },
            valueAsArray() {
                if(this.osign){
                    return [this.osign]
                }
                return []
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
        top: 5px;
        right: 6px;
    }
    
    .open .dropdown-toggle,
    .open .dropdown-menu {
        border: 1px solid rgba(60, 60, 60, .26);
    }
    
    .open-indicator:before {
        float: right;
        margin-right: 15px;
        border-color: rgba(60, 60, 60, .5);
        /*border-style: solid;*/
        /*border-width: 0.15em 0.15em 0 0;*/
        content: '';
        display: inline-block;
        height: 8px;
        width: 8px;
        /*-ms-transform: rotate(133deg);*/
        /*-o-transform: rotate(133deg);*/
        /*-webkit-transform: rotate(133deg);*/
        /*-moz-transform: rotate(133deg);*/
        /*transform: rotate(133deg);*/
        -o-transition: all 150ms cubic-bezier(1.000, -0.115, 0.975, 0.855);
        -webkit-transition: all 150ms cubic-bezier(1.000, -0.115, 0.975, 0.855);
        -moz-transition: all 150ms cubic-bezier(1.000, -0.115, 0.975, 0.855);
        transition: all 150ms cubic-bezier(1.000, -0.115, 0.975, 0.855);
    }
    
    .open .open-indicator {
        bottom: 50%;
    }
    
    .open .open-indicator:before {
        -ms-transform: translateY(8px) rotate(313deg);
        -o-transform: translateY(8px) rotate(313deg);
        -webkit-transform: translateY(8px) rotate(313deg);
        -moz-transform: translateY(8px) rotate(313deg);
        transform: translateY(8px) rotate(313deg);
    }
    
    .dropdown-toggle {
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        display: block;
        height: 38px;
        padding: 10px 5px;
        border-radius: 5px;
        white-space: normal;
        background: #fff;
        margin-bottom: 12px;
    }
    
    .searchable .dropdown-toggle {
        cursor: text;
    }
    
    .open .dropdown-toggle {
        border-bottom-color: transparent;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }
    
    .dropdown-menu {
        background: #FFFFFF;
        box-shadow: 0 16px 30px 0 rgba(84, 100, 113, 0.08);
        border-radius: 3px;
        margin: 0;
        overflow-y: auto;
        border: none !important;
        box-sizing: border-box;
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 1000;
        float: left;
        width: 100%;
        padding: 5px 0;
        font-size: 14px;
        text-align: left;
        list-style: none;
        margin-top: 5px;
        max-height: 400px;
    }
    
    .dropdown-menu li {
        /*font-family: PingFangSC-Regular, Helvetica Neue;*/
        font-size: 14px;
        color: #000021;
        line-height: 38px;
    }
    
    .selected-tag {
        position: absolute;
        line-height: 17px !important;
        font-size: 14px !important;
        color: #484848 !important;
        padding: 0 1.75em 0 0.25em;
        float: left;
    }
    
    .selected-tag .close {
        position: absolute;
        top: 0;
        right: 0.25em;
        margin-right: 0;
        font-size: 13px;
        border: none;
        background-color: transparent;
    }
    
    input[type=search],
    input[type=search]:focus {
        text-indent: 11px;
        height: 38px;
        display: inline-block;
        border: none !important;
        outline: none;
        color: #484848;
        border-radius: 5px;
        box-shadow: 0 0 1px 1px #ccc;
        font-size: 14px;
        line-height: 17px;
        margin-top: -10px;
        width: 100% !important;
        left: 0;
        right: 0;
        max-width: 100%;
        background: none;
        position: absolute;
        clear: none;
    }
    
    input[type=search]:disabled {
        cursor: pointer;
    }
    
    input[type=search]:hover {
        box-shadow: 0 0 1px 1px #3291EE;
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
    
    .active a {
        color: #2088EC;
    }
    
    li:hover>a {
        background: #D3E8FC;
    }
</style>