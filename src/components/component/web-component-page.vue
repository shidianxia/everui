<template>
  <div v-show="totalPage > 1">
  <p class="pager-wrapper" v-if="minipager">
    <svg class="pageSpan" :class="{'fontcolor':currentPage == 1}"  @click="go(currentPage - 1)" ><use xlink:href ="#icon-chevron-left"/></svg>      
    <span class="pager-num">{{miniStartCount}}/{{miniEndCount}}</span>
    <svg class="pageSpan" :class="{'fontcolor':minilengthone * currentPage >= this.minilengthall}" @click="go(currentPage + 1)" ><use xlink:href ="#icon-chevron-right"/></svg>
  </p>
  <div class="pager-wrapper" v-if="totalPage > 0 && !minipager">
    <div class="pager-pages">
      <svg :class="{'fontcolor':currentPage == 1}" v-show="showPrev" @click="go(currentPage - 1)" class="ued-pageicon">
                  <use xlink:href="#icon-chevron-left"/>
                </svg>
      <a :class="{active: currentPage == 1 ? true : false}" @click="go(1)"><span>1</span></a>
      <strong v-show="pages[0] > 2">...</strong>
      <a v-for="page in pages" :class="{active: currentPage == page ? true : false}" @click="go(page)"><span>{{page}}</span></a>
      <strong v-show="pages[pages.length-1] < totalPage - 1">...</strong>
      <a v-if="totalPage > 1" :class="{active: currentPage == totalPage ? true : false}" @click="go(totalPage)"><span>{{totalPage}}</span></a>
      <svg :class="{'fontcolor':currentPage == totalPage}" v-show="showNext" @click="go(currentPage + 1)" class="ued-pageicon-right"> <use xlink:href="#icon-chevron-right"/>
</svg>
    </div>
    <div v-if="showJump" v-show="totalPage > 1" class="pager-jump">
      <span>共<em class="jump-total">{{totalPage}}</em>页,前往</span>
      <input type="number" min="1" :max="totalPage" 
       @input="go(jumpPage)" v-model="jumpPage" class="jump-input">
      <span>页</span>
      <!--<a @click="go(jumpPage)">确定</a>-->
    </div>
  </div>
  </div>
</template>
<script>
    /*
     * component pager 翻页页码组件
     */
    export default {
        props: {
            totalPage: { // 总页数
                type: Number,
                default: 1,
                required: true
            },
            showItems: { // 显示出来的页数，如: 1 ... 34[5]67 ... 10
                type: Number,
                default: 5,
            },
            showPrev: { // 是否显示“上一页”
                type: Boolean,
                default: true
            },
            showNext: { // 是否显示“下一页”
                type: Boolean,
                default: true
            },
            showJump: { // 是否显示“跳转”
                type: Boolean,
                default: false
            },
            initPage: {
                type: Number,
                default: 1
            },
            mode: {
                type: String,
                default: 'event' // 'event' | 'query' | 'params'
            },
            routeName: {
                type: String
            },
            minipager: { // 切换minipager(小号的翻页)
                type: Boolean,
                default: false
            },
            minilengthall: { // 数据总条数
                type: Number,
                default: 1
            },
            minilengthone: { // 每页显示的数据条数
                type: Number,
                default: 5
            }
        },
        data() {
            return {
                currentPage: 0,
                jumpPage: 0,

                miniStartCount: 1, //小的翻页开始的数字
                miniEndCount: this.minilengthone //小的翻页结束的数字
            }
        },
        created() {
            this.currentPage = this.initPage
            if (this.mode == 'params' && !this.routeName) {
                throw 'need a route name when choose params mode in pager component'
            }
        },
        computed: {
            pages() {
                let getPages = (start, end) => {
                    if (start <= 1 || start > end || start >= this.totalPage) {
                        start = 2
                    }
                    if (end >= this.totalPage || end < start || end <= 1) {
                        end = this.totalPage - 1
                    }
                    let arr = []
                    for (let i = start; i <= end; i++) {
                        arr.push(i)
                    }
                    return arr
                }
                let counts = this.showItems
                if (this.totalPage < counts + 2) {
                    return getPages(2, this.totalPage)
                } else {
                    if (this.currentPage <= Math.ceil(counts / 2)) {
                        return getPages(2, counts)
                    } else if (this.currentPage >= this.totalPage - Math.floor(counts / 2)) {
                        return getPages(this.totalPage + 1 - counts, this.totalPage - 1)
                    } else {
                        let half = Math.ceil(counts / 2) - 1
                        let end = this.currentPage + half
                        if (counts % 2 === 0) {
                            end++
                        }
                        return getPages(this.currentPage - half, end)
                    }
                }
            }
        },
        methods: {
            go(page) {
                if (page < 1) {
                    page = 1
                }
                if (page > this.totalPage) {
                    page = this.totalPage
                }
                if (page === this.currentPage) {
                    return
                }
                this.currentPage = parseInt(page, 10)
                    // console.log("*******"+this.currentPage)
                if (this.minipager) {
                    if (this.minilengthone * (this.currentPage - 1) >= this.minilengthall) {
                        return
                    } else {
                        this.$emit('go-page', {
                            page: this.currentPage
                        })
                    }
                } else {

                    if (this.mode == 'query') {
                        let query = this.$route.query
                        query.page = this.currentPage
                        this.$router.go({
                            query: query
                        })
                    } else if (this.mode == 'params') {
                        let params = this.$route.params
                        params.page = this.currentPage
                        this.$router.go({
                            name: this.routeName,
                            params: params
                        })
                    } else {
                        this.$emit('go-page', {
                            page: this.currentPage
                        })
                    }
                }

            }
        },
        watch: {
            minilengthall(val) {
                if (this.minilengthall < this.minilengthone) {
                    this.$set("miniEndCount", this.minilengthall)
                } else {
                    this.$set("miniEndCount", this.minilengthone)
                }
            },
            currentPage(newVal) {
                this.jumpPage = newVal
            },
            initPage(newVal) {
                // console.log("newVal" + newVal)
                if (this.currentPage !== newVal) {
                    this.currentPage = newVal
                }
                //minipager点击左右翻页显示的条数
                if (this.minipager) {
                    // console.log("页码----" + this.currentPage)
                    // console.log("总条数----" + this.minilengthall)
                    // console.log("页长度----" + this.minilengthone)
                    // console.log("总页数----"+this.totalPage)
                    var startCount;
                    var endCount;
                    if (this.minilengthone * this.currentPage >= this.minilengthall) { //是否最后一页
                        // startCount = 1 + this.minilengthone * (this.currentPage - 1)
                        startCount = 1 + this.minilengthall - this.minilengthone
                        endCount = this.minilengthall
                    } else {
                        startCount = 1 + this.minilengthone * (this.currentPage - 1)
                        endCount = this.minilengthone * (this.currentPage)
                    }
                    this.miniStartCount = startCount
                    this.miniEndCount = endCount
                }
            }
        }
    }
</script>
<style scoped>
    .ued-pageicon {
        fill: #A4ACB4;
        width: 26px;
        height: 26px;
        float: left;
        cursor: pointer;
        margin: 1px auto;
    }
    
    .ued-pageicon-right {
        fill: #A4ACB4;
        width: 26px;
        height: 26px;
        float: right;
        cursor: pointer;
        margin: 1px auto;
    }
    
    .ued-pageicon:hover,
    .ued-pageicon-right:hover {
        box-sizing: border-box;
        border: 1px solid #f5f6f6;
        border-radius: 12px;
    }
    
    .pager-num {
        color: #757575;
        margin: 10px;
    }
    
    .pager-wrapper .fontcolor {
        fill: #DDD;
        cursor: not-allowed
    }
    
    .pager-wrapper .fontcolor:hover {
        border-radius: 0;
        border: none
    }
    
    .graycolor {
        color: #B0B0B0!important;
    }
    
    .pageSpan {
        cursor: pointer;
        width: 26px;
        height: 26px;
        /*margin-top: 25px;*/
        fill: #757575;
    }
    
    .pageSpan:hover {
        box-sizing: border-box;
        border: 1px solid #f5f6f6;
        border-radius: 12px;
    }
    
    .pager-wrapper {
        display: inline-block;
        text-align: center;
        color: #757575;
        float: right;
        display: flex;
        align-items: center;
    }
    
    .pager-pages {
        display: inline-block;
        height: 32px;
        font-size: 0;
    }
    
    .pager-wrapper a,
    .pager-wrapper strong {
        display: inline-block;
        min-width: 7px;
        height: 14px;
        padding: 3px 5px 3px 5px;
        margin: 0 5px;
        font-size: 14px;
        line-height: 14px;
        text-align: center;
        cursor: default;
        /*color: #222;*/
        color: #757575;
    }
    
    .pager-wrapper a {
        /*border: 1px solid #ddd;*/
        border-radius: 2px;
        background-color: #fff;
        /*transition: all .2s;*/
    }
    
    .pager-wrapper a:hover {
        color: #2b82f1;
        border-color: rgb(33, 150, 243);
    }
    
    .pager-wrapper .active span {
        font-family: Arial;
        display: block;
        text-align: center;
        font-size: 14px;
        margin: 3px 0;
    }
    
    .pager-wrapper .active {
        height: 26px;
        width: 26px;
        background-color: #2b82f1;
        box-sizing: border-box;
        border-radius: 13px;
        color: #fff;
        text-align: center;
        /*line-height: 13px;*/
    }
    
    .pager-wrapper .active:hover {
        color: #fff;
    }
    
    .pager-jump {
        margin-top: -8px;
        display: inline-block;
        height: 32px;
        margin-left: 20px;
    }
    
    .pager-jump span {
        line-height: 32px;
    }
    
    .pager-jump em {
        margin: 0 5px;
        font-style: normal;
    }
    
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    
    .pager-jump .jump-input {
        -moz-appearance: textfield;
        width: 20px;
        /*height: 32px;*/
        padding: 5px;
        /*outline: none;*/
        border: none;
        box-shadow: 0 0 1px 1px #d6dadd;
        border-radius: 5px;
        /*border: 1px solid #ddd;*/
        font-size: 14px;
        /*vertical-align: top;*/
    }
    
    .pager-jump .jump-input:focus {
        border-color: rgb(33, 150, 243);
    }
</style>