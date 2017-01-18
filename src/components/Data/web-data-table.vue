<template>
	<div class="v-table">
		<table border="0"  >
			<thead>
				<tr> 
					<th  v-show="checkshow"> 
					 <xcheckbox v-model="checked" class="ued-zly-check" @change="chooseall"></xcheckbox>
					</th>		
					<th v-for="item in titles"  :class="{'select-title': titleIndex == index && item.showOrder != undefined}">
						{{ item.title }}
						<div class="table-arrow" v-if="item.showOrder != undefined && index != 0">
							<div class="orderup" v-show="item.showOrder.arrow == 1"></div>
							<div class="orderdown" v-show="item.showOrder.arrow == -1"></div>
							<div class="orderdefault" v-show="item.showOrder.arrow == 0"></div>
						</div>
					</th>
				</tr>
			</thead>
			<tbody v-show="contents.length != 0">
				<tr v-for="(obj,index ) of contents" class="a" :class="{'checktr':trstyle==1}">
				<xcheckboxgroup v-model="checklist" class="tablecheckbox" v-show="checkshow">					
					<!--<td v-show="firstorder">{{ index + 1 }}</td>-->
				  <td class="tablecheck"><xcheckbox  class="checkboxchoose"  @change="choose()" :lableshow="lableshow" :label="JSON.stringify(obj)"></xcheckbox></td>		
				</xcheckboxgroup>					
         <td v-for="item in titles " @click="clickCell(obj)"   @mouseleave="resetCurrentValue()" @mousemove="setCurrentValue(index)">{{ obj[item.key] }}</td>
					<td v-show="options.length > 0 || optionbg.length > 0">
						<img class="relative-bg" v-show="hasRelativeBg" v-for="(i, item) in ops[index]" @click="clickOptions(index, i)" :src="item.url" :title="item.title" />
						<a class="v-options" v-show="!hasRelativeBg" v-for="(i, doc) in ops[index]" @click="clickOptions(index, i)" :title="doc">{{ doc }}</a>
					</td>
				</tr>
			</tbody>
		</table>
		<div v-show="contents.length == 0" class="v-no-data">暂无记录</div>
	</div>
</template>

<script>
    export default {
        data() {
            return {
                trstyle: 0,
                checked: false, //
                checklist: [], //
                lableshow: false, //
                i: 0,
                old: 0,
                orderKey: '',
                orderValue: 0,
                hasRelativeBg: false,
                titleIndex: -1
            }
        },

        props: {
            checkshow: {
                type: Boolean,
                default: false
            }, //是否显示check
            titles: {
                type: Array,
                default: []
            }, //表明＝名

            contents: {
                type: Array,
                default: []
            }, //表内容
            options: {
                type: Array,
                default: () => []
            }, //
            optionbg: {
                type: Array,
                default: () => []
            },
            firstorder: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            filterFirstHead(val) {
                if (val.key !== '' && val.key !== null && val.key !== undefined) {
                    return val;
                }
            },
            ops: function() {
                if (this.options.length > 0) {
                    this.$set('hasRelativeBg', false);
                    return this.options;
                } else if (this.options.length == 0 && this.optionbg.length > 0) {
                    this.$set('hasRelativeBg', true);
                    return this.optionbg;
                } else {
                    return [];
                }
            },
        },
        methods: {
            resetCurrentValue() {
                var oldtrs = document.getElementsByTagName('tr')[this.old]
                oldtrs.style.boxShadow = '0px 0px 0px 0px #EEEEEE'
            },
            setCurrentValue(index) {
                index = index + 1
                this.trstyle = 1
                var trs = document.getElementsByTagName('tr')[index]
                if (this.i != 0) {
                    var oldtrs = document.getElementsByTagName('tr')[this.old]
                    oldtrs.style.boxShadow = '0px 0px 0px 0px #EEEEEE'
                    trs.style.boxShadow = ' 0 0 24px 0 rgba(84,100,113,0.12)'
                } else {
                    trs.style.boxShadow = ' 0 0 24px 0 rgba(84,100,113,0.12)'
                }
                this.old = index
                this.i = this.i + 1;
                // this.$emit('choosecell', index);
            },
            choose(val) {
                this.$emit("selall", this.checklist) //触发checkbox修改选项事件
            },
            chooseall(val) {
                this.checklist = []
                if (this.checked) {
                    for (let i = 0; i < this.contents.length; i++) {
                        this.checklist.push(JSON.stringify(this.contents[i]))
                    }
                } else {
                    this.checklist = []
                }
                this.$emit("selall", this.checklist) //触发checkbox修改选项事件
            },
            changeArrow(item, index) {
                if (index == 0 || item.showOrder == undefined) {
                    return;
                }
                this.titleIndex = index;
                if (item.showOrder.arrow == 0) {
                    item.showOrder.arrow = 1;
                } else if (item.showOrder.arrow == 1) {
                    item.showOrder.arrow = -1;
                } else if (item.showOrder.arrow == -1) {
                    item.showOrder.arrow = 1;
                }
                this.sortArray(item.key, item.showOrder.arrow);
            },
            clickCell(item) {
                // console.log(e.target)
                // index = index + 1
                // this.trstyle = 1
                // var trs = document.getElementsByTagName('tr')[index]
                // if (this.i != 0) {
                //     var oldtrs = document.getElementsByTagName('tr')[this.old]
                //     oldtrs.style.boxShadow = '0px 0px 0px 0px #EEEEEE'
                //     trs.style.boxShadow = ' 0 0 24px 0 rgba(84,100,113,0.12)'
                // } else {
                //     trs.style.boxShadow = ' 0 0 24px 0 rgba(84,100,113,0.12)'
                // }
                // this.old = index
                // this.i = this.i + 1;
                this.$emit('choosecell', item);
            },
            clickOptions(index, i) {
                this.$emit('clickoptions', index, i);
            }
        }
    }
</script>

<style scoped>
    .checktr {
        /*box-shadow: 0 0 24px 0 rgba(84, 100, 113, 0.12)*/
    }
    
    .el-checkbox-group {
        width: 0;
        margin-top: 15px;
        height: 28px;
    }
    
    .v-table {
        clear: both;
        padding: 0 0 30px 0;
    }
    
    .v-table table {
        border: 1px solid #f5f6f6;
        margin: 0;
        width: 100%;
        border-spacing: 0;
    }
    
    .v-table td {
        height: 48px;
        text-align: left;
    }
    ued-zly-check .el-checkbox__input .el-checkbox__inner{
        margin:0 !important
    }
    .v-table th {
        height: 48px;
        text-align: left;
    }
    
    .a {
        box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        border-bottom: solid 1px #F5F6F6;
    }
    
    .v-table th {
        padding-left: 10px;
        font-size: 12px;
        color: #3e3e3e;
        background-color: #f5f6f6;
        word-break: keep-all;
        white-space: nowrap;
        cursor: default;
    }
    
    .v-table td {
        cursor: pointer;
        padding-left: 10px;
        color: #546472;
        font-size: 12px;
        word-break: keep-all;
        white-space: nowrap;
    }
    
    .v-table td a {
        font-size: 12px;
    }
    
    .v-table td>label {
        height: 31px;
    }
    
    .v-table td>label>span {
        margin-left: 10px;
    }
    
    .table-arrow {
        display: inline;
    }
    
    .v-no-data {
        height: 146px;
        text-align: center;
        line-height: 146px;
        font-size: 18px;
        color: #e0e0e0;
        background: url('http://rayeye-img.oss-cn-shanghai.aliyuncs.com/images/components-v-table/bg-nohistory.png') no-repeat 40% 33px #fafafa;
    }
    
    .v-options {
        color: #41BCA0;
        padding-left: 10px;
    }
    
    .v-options:first-child {
        padding-left: 0;
    }
    
    .relative-bg {
        height: 18px;
        width: 15px;
        padding-left: 10px;
        cursor: pointer;
    }
    
    .relative-bg:first-child {
        padding-left: 0;
    }
    
    .select-title {
        background-color: rgb(236, 243, 242)!important;
    }
</style>