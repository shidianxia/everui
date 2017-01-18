<template>
	<div>
		<div class="head" :class="{ 'themeblue': themeblue, 'themewhite': themewhite }">
			<div class="hedaLeft" >
				<img class="headLogo" src=""/>
				<span class="headSpan1">LOGO</span>
			</div>
			<div class="headCenter">
				<ul class="headCenterUl">
					<li class="headCenterli" @mouseover="lihover(1)" @mouseout="liout" @click="liclick(1)" :class="{ 'selected' : selected== 1 }"><span>基本信息</span>	
                        <ul class="subTabtheme" v-show="displayTab == 1 && subtab" @mouseover="lihover(1)" @mouseout="liout">
                            <li @click="jianzhuwu"><span>建筑物</span></li>
                            <li @click="units"><span>单位</span></li>
                            <li @click="firehydrant"><span>水源</span></li>
                        </ul>
                    </li>
					<li class="headCenterli" @mouseover="lihover(2)" @mouseout="liout" @click="liclick(2)"  :class="{ 'selected' : selected== 2 }"><span>消防管理</span>
                        <ul class="subTabtheme"  v-show="displayTab == 2 && subtab" @mouseover="lihover(2)" @mouseout="liout">
                            <li @click="wuyexunjian"><span>物业巡检</span></li>
                            <li @click="weibaoguanli"><span>维保管理</span></li>
                            <li @click="canyinshangbao"><span>餐饮上报</span></li>
                            <li @click="dianzijiandu"><span>电子监督</span></li>
                            <li @click="xingxishenhe"><span>信息审核</span></li>
                            <li @click="tongzhitonggao"><span>通知报告</span></li>
                            <li @click="beianguanli"><span>备案管理</span></li>
                        </ul>               
                    </li>
					<li class="headCenterli" @mouseover="lihover(3)" @mouseout="liout" @click="liclick(3)"  :class="{ 'selected' : selected== 3 }"><span>统计分析</span>
                        <ul class="subTabtheme" v-show="displayTab == 3 && subtab" @mouseover="lihover(3)" @mouseout="liout">
                            <li @click="fenxiyujing"><span>分析预警</span></li>
                            <li @click="zhifatongji"> <span>执法统计</span> </li>
                            <li @click="wulwangtongji"><span>物联网统计</span> </li>
                        </ul>
                    </li>
					<li class="headCenterli" @mouseover="lihover(4)" @mouseout="liout" @click="liclick(4)" :class="{ 'selected' : selected== 4 }"><span>行业管理</span>
                        <ul class="subTabtheme" v-show="displayTab == 4 && subtab" @mouseover="lihover(4)" @mouseout="liout">
                            <li @click="minfang"><span>民防</span></li>
                            <li @click="anjian"><span>安监</span></li>
                        </ul>                
                    </li>
					<li class="headCenterli" @click="liclick(5)" :class="{ 'selected' : selected== 5 }"><span>大型活动</span></li>
				</ul>
			</div>
		</div>
		<div class="subTab" v-show="displayTab == 1 && !subtab" @mouseover="lihover(1)" @mouseout="liout">
			<ul>
				<li @click="jianzhuwu">
					<div class="subTabDiv11">
						<svg>
							<use xlink:href ="#icon-building1"/>
						</svg>
					</div>
					<span>建筑物</span>
				</li>
				<li @click="units">
					<div class="subTabDiv12">
						<svg>
							<use xlink:href ="#icon-home"/>
						</svg>
					</div>
					<span>单位</span>
				</li>
				<li @click="firehydrant">
					<div class="subTabDiv13">
						<svg>
							<use xlink:href ="#firehydrant"/>
						</svg>
					</div>
					<span>水源</span>
				</li>
			</ul>
		</div>
		<div class="subTab"  v-show="displayTab == 2 && !subtab" @mouseover="lihover(2)" @mouseout="liout">
			<ul>
				<li @click="wuyexunjian">
					<div class="subTabDiv21">
						<svg>
							<use xlink:href ="#wuyexunjian"/>
						</svg>
					</div>
					<span>物业巡检</span>
				</li>
				<li @click="weibaoguanli">
					<div class="subTabDiv22">
						<svg>
							<use xlink:href ="#weibaoguanli"/>
						</svg>
					</div>
					<span>维保管理</span>
				</li>
				<li @click="canyinshangbao">
					<div class="subTabDiv23">
						<svg>
							<use xlink:href ="#canyinshangbao"/>
						</svg>
					</div>
					<span>餐饮上报</span>
				</li>
				<li @click="dianzijiandu">
					<div class="subTabDiv24">
						<svg>
							<use xlink:href ="#dianzijiandu"/>
						</svg>
					</div>
					<span>电子监督</span>
				</li>
				<li @click="xingxishenhe">
					<div class="subTabDiv25">
						<svg>
							<use xlink:href ="#xingxishenhe"/>
						</svg>
					</div>
					<span>信息审核</span>
				</li>
				<li @click="tongzhitonggao">
					<div class="subTabDiv26">
						<svg>
							<use xlink:href ="#tongzhitonggao"/>
						</svg>
					</div>
					<span>通知报告</span>
				</li>
				<li @click="beianguanli">
					<div class="subTabDiv27">
						<svg>
							<use xlink:href ="#beianguanli"/>
						</svg>
					</div>
					<span>备案管理</span>
				</li>
			</ul>
		</div>
		<div class="subTab" v-show="displayTab == 3 && !subtab" @mouseover="lihover(3)" @mouseout="liout">
			<ul>
				<li @click="fenxiyujing">
					<div class="subTabDiv32">
						<svg>
							<use xlink:href ="#fenxiyujing"/>
						</svg>
					</div>
					<span>分析预警</span>
				</li>
				<li @click="zhifatongji">
					<div class="subTabDiv33">
						<svg>
							<use xlink:href ="#zhifatongji"/>
						</svg>
					</div>
					<span>执法统计</span>
				</li>
				<li @click="wulwangtongji">
					<div class="subTabDiv34">
						<svg>
							<use xlink:href ="#wulwangtongji"/>
						</svg>
					</div>
					<span>物联网统计</span>
				</li>
			</ul>
		</div>
		<div class="subTab" v-show="displayTab == 4 && !subtab" @mouseover="lihover(4)" @mouseout="liout">
			<ul>
				<li @click="minfang">
					<div class="subTabDiv41">
						<svg>
							<use xlink:href ="#minfang"/>
						</svg>
					</div>
					<span>民防</span>
				</li>
				<li @click="anjian">
					<div class="subTabDiv42">
						<svg>
							<use xlink:href ="#anjian"/>
						</svg>
					</div>
					<span>安监</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script scoped>
    export default {
        props: {
            theme: {
                type: String,
                default: ''
            },
            subtab: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                displayTab: "",
                themeblue: false,
                themewhite: false,
                selected: 0
            }
        },
        mounted() {
            if(this.theme && this.theme==='#2088EC'){
                this.themeblue = true
            }
            if(this.theme && this.theme==='#FFFFFF'){
                this.themewhite = true
            }
        },
        methods: {
            lihover(val) {
               this.displayTab = val;
            },
            liout(val) {
                this.displayTab = '';
            },
            liclick(val) {
               this.selected = val;
            },
            jianzhuwu() {
                this.liclick(1)
                console.log("建筑物")
            },
            units() {
                this.liclick(1)
                console.log("单位")
            },
            firehydrant() {
                this.liclick(1)
                console.log("水源")
            },
            wuyexunjian() {
                this.liclick(2)
                console.log("物业巡检")
            },
            weibaoguanli() {
                this.liclick(2)
                console.log("维保管理")
            },
            canyinshangbao() {
                this.liclick(2)
                console.log("餐饮上报")
            },
            dianzijiandu() {
                this.liclick(2)
                console.log("电子记录")
            },
            xingxishenhe() {
                this.liclick(2)
               console.log("信息审核")
            },
            tongzhitonggao() {
                this.liclick(2)
                console.log("通知报告")
            },
            beianguanli() {
                this.liclick(2)
                console.log("备案管理")
            },
            zonghetongji() {
                this.liclick(3)
                console.log("综合统计")
            },
            fenxiyujing() {
                this.liclick(3)
                console.log("分析预警")
            },
            zhifatongji() {
                this.liclick(3)
                console.log("执法统计")
            },
            wulwangtongji() {
                this.liclick(3)
                console.log("物联网统计")
            },
            minfang() {
                this.liclick(4)
                console.log("民防")
            },
            anjian() {
                this.liclick(4)
               console.log("安监")
            },
            bigevent() {
                console.log("大型活动")
            }
        }
    }
</script>
<style scoped lang='less'>
    .head {
        min-width: 1170px;
        width: 100%;
        height: 60px;
        position: relative;
        z-index: 200;
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 rgba(214,218,221,0.55);
        box-sizing: border-box;
        -moz-box-sizing: border-box;
    }
    .themeblue {
        background: #2088EC;
    }
    .hedaLeft {
        line-height: 60px;
        margin-left: 10%;
        float: left;
        display: flex;
        align-items: center;
    }
    .headSpan1 {
        cursor: default;
        font-size: 19px;
        color: #838383;
        margin-left: 8px;
    }
    .themeblue .headSpan1 {
        color: #FFFFFF;
    }
    .headCenter {
        height: 100%;
        float: left;
        margin-left: 56px;
    }
    .headCenter li.headCenterli {
        float: left;
        line-height: 60px;
        text-align: center;
        font-size: 14px;
        color: #A4ACB4;
        position: relative
    }
    .headCenter li.headCenterli.selected {
        color: #2088EC;
    }
   .headCenter li.headCenterli span {
        margin: 0 22px;
    }
   .headCenter li.headCenterli:hover {
        color: #2C3F51;
        cursor: pointer;
    }
    .themeblue .headCenter li.headCenterli {
        color: rgba(255,255,255,0.60);
        letter-spacing: 0;
    }
    .themeblue .headCenter li.headCenterli.selected {
        color: #FFFFFF;
    }
    .themeblue .headCenter li.headCenterli:hover {
        background: rgba(255,255,255,0.12);
        color: #FFFFFF;
    }
    .themewhite .headCenter li.headCenterli:hover {
        box-shadow: 0 -10px 0 0 #FFFFFF, 0 10px 0 0 #FFFFFF, 0 0 10px 0 rgba(214,218,221,0.50);
        color: #2C3F51;
    }
    .subTabtheme {
        width: 160px;
        position: absolute;
        top:61px;
        z-index: 1000;
        background: #FFFFFF;
        box-shadow: 0 16px 30px 0 rgba(84,100,113,0.08);
    }
    .subTabtheme li {
        text-align: left;
        height: 38px;
        line-height: 38px;
        cursor: default;
        font-size: 14px;
        color: #A4ACB4;
    }
    .subTabtheme li:hover {
        background: rgba(31,136,236,0.20);
        color: #2C3F51;
    }
    .subTab {
        width: 100%;
        min-width: 1147px;
        height: 114px;
        position: absolute;
        z-index: 1000;
        background: #FFFFFF;
        border-top: 1px solid #CCCCCC;  
        box-shadow: 0 2px 4px 0 rgba(214,218,221,0.55);
        div {
            width: 42px;
            height: 42px;
            margin: 22px 25px 0 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
        }
        svg {
            width: 20px;
            height: 16px;
            fill: #FFFFFF;
        }
        span {
            font-size: 12px;
            color: #546472;
            cursor: default;
        }
        ul{
            height: 114px;
            margin-left: 20%;
            li {
                float: left;
                height: 114px;
                text-align: center;
            }
        }
    }
    .subTabDiv11 {
        background: -webkit-linear-gradient(#c5c5c5, #939393);
        background: -o-linear-gradient(#c5c5c5, #939393);
        background: -moz-linear-gradient(#c5c5c5, #939393);
        background: linear-gradient(#c5c5c5, #939393);
    }
    .subTabDiv12 {
        background: -webkit-linear-gradient(#95B9FA, #5C83F2);
        background: -o-linear-gradient(#95B9FA, #5C83F2);
        background: -moz-linear-gradient(#95B9FA, #5C83F2);
        background: linear-gradient(#95B9FA, #5C83F2);
    }
    .subTabDiv13 {
        background: -webkit-linear-gradient(#95F0FA, #5CDDF2);
        background: -o-linear-gradient(#95F0FA, #5CDDF2);
        background: -moz-linear-gradient(#95F0FA, #5CDDF2);
        background: linear-gradient(#95F0FA, #5CDDF2);
    }
    .subTabDiv21 {
        background: -webkit-linear-gradient(#95C4FA, #5C92F2);
        background: -o-linear-gradient(#95C4FA, #5C92F2);
        background: -moz-linear-gradient(#95C4FA, #5C92F2);
        background: linear-gradient(#95C4FA, #5C92F2);
    }
    .subTabDiv22 {
        background: -webkit-linear-gradient(#C795FA, #965CF2);
        background: -o-linear-gradient(#C795FA, #965CF2);
        background: -moz-linear-gradient(#C795FA, #965CF2);
        background: linear-gradient(#C795FA, #965CF2);
    }
    .subTabDiv23 {
        background: -webkit-linear-gradient(#95A6FA, #5C6DF2);
        background: -o-linear-gradient(#95A6FA, #5C6DF2);
        background: -moz-linear-gradient(#95A6FA, #5C6DF2);
        background: linear-gradient(#95A6FA, #5C6DF2);
    }
    .subTabDiv24 {
        background: -webkit-linear-gradient(#95E4FA, #5CC4F2);
        background: -o-linear-gradient(#95E4FA, #5CC4F2);
        background: -moz-linear-gradient(#95E4FA, #5CC4F2);
        background: linear-gradient(#95E4FA, #5CC4F2);
    }
    .subTabDiv25 {
        background: -webkit-linear-gradient(#FADE95, #F2BA5C);
        background: -o-linear-gradient(#FADE95, #F2BA5C);
        background: -moz-linear-gradient(#FADE95, #F2BA5C);
        background: linear-gradient(#FADE95, #F2BA5C);
    }
    .subTabDiv26 {
        background: -webkit-linear-gradient(#95FACB, #5CF29C);
        background: -o-linear-gradient(#95FACB, #5CF29C);
        background: -moz-linear-gradient(#95FACB, #5CF29C);
        background: linear-gradient(#95FACB, #5CF29C);
    }
    .subTabDiv27 {
        background: -webkit-linear-gradient(#FACE95, #F2A05C);
        background: -o-linear-gradient(#FACE95, #F2A05C);
        background: -moz-linear-gradient(#FACE95, #F2A05C);
        background: linear-gradient(#FACE95, #F2A05C);
    }
    .subTabDiv31 {
        background: -webkit-linear-gradient(#FAEA95, #F2D15C);
        background: -o-linear-gradient(#FAEA95, #F2D15C);
        background: -moz-linear-gradient(#FAEA95, #F2D15C);
        background: linear-gradient(#FAEA95, #F2D15C);
    }
    .subTabDiv32 {
            background: -webkit-linear-gradient(#FAAF95, #F2775C);
        background: -o-linear-gradient(#FAAF95, #F2775C);
        background: -moz-linear-gradient(#FAAF95, #F2775C);
        background: linear-gradient(#FAAF95, #F2775C);
    }
    .subTabDiv33 {
        background: -webkit-linear-gradient(#BEFA95, #8AF25C);
        background: -o-linear-gradient(#BEFA95, #8AF25C);
        background: -moz-linear-gradient(#BEFA95, #8AF25C);
        background: linear-gradient(#BEFA95, #8AF25C);
    }
    .subTabDiv34 {
        background: -webkit-linear-gradient(#95C9FA, #5C99F2);
        background: -o-linear-gradient(#95C9FA, #5C99F2);
        background: -moz-linear-gradient(#95C9FA, #5C99F2);
        background: linear-gradient(#95C9FA, #5C99F2);
    }
    .subTabDiv41 {
        background: -webkit-linear-gradient(#95AAFA, #5C72F2);
        background: -o-linear-gradient(#95AAFA, #5C72F2);
        background: -moz-linear-gradient(#95AAFA, #5C72F2);
        background: linear-gradient(#95AAFA, #5C72F2);
    }
    .subTabDiv42 {
        background: -webkit-linear-gradient(#95F2FA, #5CE0F2);
        background: -o-linear-gradient(#95F2FA, #5CE0F2);
        background: -moz-linear-gradient(#95F2FA, #5CE0F2);
        background: linear-gradient(#95F2FA, #5CE0F2);
    } 
</style>
