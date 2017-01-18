<script>
    export default{
        props: {
            type: String,//风格类型
            activeName: String //默认选中选项卡的 name
        },
        data() {
            return {
                currentName: 0,
            }
        },
        methods: {
            tabclick(tab, event){
                this.currentName= tab.index;
				this.$emit('tab-click', tab, event);
            },
            calcBarStyle() {
                if(this.type==="border-card" || !this.$refs.tabs) return{};
                var style={};
                var offset = 0;
                var tabWidth = 0;
				this.$children.every((panel, index) => {
					let $el = this.$refs.tabs[index];
					if(!$el) {return false}
					if(panel.index !== this.currentName){
						offset += $el.clientWidth;
						return true;
					}else{
						tabWidth = $el.clientWidth;
						return false;
					}
				});
				style.width=tabWidth + 'px';
			    style.transform = `translateX(${offset}px)`;
				return style;
            }
        },
		mounted() {
			this.currentName = this.activeName || this.$children[0].index || '1';
			this.$nextTick(() => {
				this.$forceUpdate();
			});
		},
        render(h) {
            let {
                type,
                tabclick,
                currentName
            } = this;
			const barStyle = this.calcBarStyle();
			const activeBar = !type || type==="common"
				? <div class="tabs_active-bar" style={barStyle}></div>
				: null;
            const tabs = this.$children.map((tab, index) => {
                const _tab = h('div', {
                    class: {
                        'tabs_item': true,
                        'is-active': currentName===tab.index,
                    },
                    ref: 'tabs',
					refInFor: true,
                    on: { click: (ev) => {tabclick(tab, ev);}}
                }, [
                    tab.label,
					index === 0 ? activeBar : null
                ]);
                return _tab
            }); 
            return (
                <div class={{
					'tabs': true,
                    'tabs-border-card': type === 'border-card',
					'tabs-common': type === 'common'
                }}>
                    <div class="tabs_header">{ tabs }</div>
                    <div class="tabs_content">{ this.$slots.default }</div>
                </div>
            );          
        }
    }
</script>
<style>
.tabs_header:after,.tabs_header:before {
	display: table;
	content: ""
}
.tabs_header:after {
	clear: both
}
.tabs {
	display: inline-block;
	width: 100%;
}
.tabs-common {
	background: #FFFFFF;
	border: 1px solid #F5F6F6;
	box-shadow: 0 20px 30px 0 rgba(214,218,221,0.60);
	border-radius: 3px;
	width: 100%;
	height: 100%
}
.tabs_header {
	background: #FFFFFF;
    box-shadow: inset 0 -1px 0 0 #D6DADD;
	position: relative;
	margin: 0 0 10px
}
.tabs_item {
	text-align: center;
	height: 44px;
	width: 90px;
	box-sizing: border-box;
	-moz-box-sizing: border-box;
	line-height: 44px;
	float: left;
	list-style: none;
	font-size: 14px;
	color: #A4ACB4;
	position: relative
}
.tabs_item:hover {
	color: #546472;
	cursor: pointer
}
.tabs_item.is-active {
	color: #20a0ff
}
.tabs_active-bar {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 2px;
	background-color: #2088EC;
	z-index: 1;
	-ms-transition: transform .3s cubic-bezier(.645,.045,.355,1);
	-o-transition: transform .3s cubic-bezier(.645,.045,.355,1);
	-moz-transition: transform .3s cubic-bezier(.645,.045,.355,1);
	-webkit-transition: transform .3s cubic-bezier(.645,.045,.355,1);
	transition: transform .3s cubic-bezier(.645,.045,.355,1);
	list-style: none
}
.tabs_content {
	overflow: hidden;
	position: relative
}
.tabs-border-card {
	background: #FFFFFF;
	border-radius: 3px;
	border: 1px solid #EFF0F1;
	width: 100%;
	height: 100%
}
.tabs-border-card .tabs_header {
	background: #F5F6F6;
	box-shadow:none
}
.tabs-border-card .tabs_item {
	height: 60px;
	width: 160px;
	line-height: 60px;
    border-radius: 3px 0 0 0;
	margin-right: -1px;
	margin-left: -1px;
	position: relative;
	-ms-transition: all .3s cubic-bezier(.645,.045,.355,1);
	-o-transition: all .3s cubic-bezier(.645,.045,.355,1);
	-moz-transition: all .3s cubic-bezier(.645,.045,.355,1);
	-webkit-transition: all .3s cubic-bezier(.645,.045,.355,1);
	transition: all .3s cubic-bezier(.645,.045,.355,1);
}
.tabs-border-card .tabs_item:hover {
	background-color: #F5F6F6;
	color: #2C3F51;
}
.tabs-border-card .tabs_item:first-child:hover:after {
	background: url("../../../assets/images/shadow-hover.png") no-repeat -24px 0;
	height: 60px;
	width: 182px;
	left: 0;
	position: absolute;
	content: '';
}
.tabs-border-card .tabs_item:hover:after {
	background: url("../../../assets/images/shadow-hover.png") no-repeat;
	height: 60px;
	width: 206px;
	position: absolute;
	left: -23px;
	content: '';
}
.tabs-border-card .tabs_item.is-active {
	background-color: #FFFFFF;
	color: #2088EC;
}
.tabs-border-card .tabs_item:first-child.is-active:after {
	background: url("../../../assets/images/shadow-active.png") no-repeat -24px 0;
	height: 60px;
	width: 182px;
	left: 0px;
	position: absolute;
	content: '';
	border: none;
	border-left: 1px solid #EFF0F1;
}
.tabs-border-card .tabs_item.is-active:after {
	content: '';
	height: 60px;
	width: 206px;
	position: absolute;
	left: -23px;
	z-index: 999999;
	background: url("../../../assets/images/shadow-active.png") no-repeat;
}
.tabs-border-card .tabs_content {
	padding: 15px
}
.tab-pane {
	width: 100%
}
</style>