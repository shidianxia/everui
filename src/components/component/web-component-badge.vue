
<template>
  <div class="badge">
    <slot></slot>
    <span
      v-text="content"
      class="badge_content"
      ref="badge"
      :class="{ 'is-fixed': $slots.default, 'is-dot': isDot }">
    </span>
  </div>
</template>

<script>
export default {
    props: {
        value: {}, //显示值
        max: Number, //最大值，超过最大值会显示 '{max}+'，要求 value 是 Number 类型
        isDot: Boolean, //小圆点
        dotcolor: String  //小圆点颜色
    },
    computed: {
        content() {
            if (this.isDot) return;
            const value = this.value;
            const max = this.max;
            if (typeof value === 'number' && typeof max === 'number') {
                return max < value ? `${max}+` : value;
            }
            return value;
        }
    },
    methods: {
        setDotColor() {
            if (this.dotcolor ==="#2088EC") {
                this.$refs.badge.style.backgroundColor = this.dotcolor;
                this.$refs.badge.style.boxShadow ="0 1px 1px 0 rgba(31,136,236,0.20)";
            }else  if (this.dotcolor ==="#5ABA69") {
                this.$refs.badge.style.backgroundColor = this.dotcolor;
                this.$refs.badge.style.boxShadow ="0 1px 1px 0 rgba(89,186,104,0.20)";
            }else  if (this.dotcolor ==="#EFB444") {
                this.$refs.badge.style.backgroundColor = this.dotcolor;
                this.$refs.badge.style.boxShadow ="0 1px 1px 0 rgba(239,179,67,0.20)";
            }else{
                this.$refs.badge.style.backgroundColor = "#F56960";
                this.$refs.badge.style.boxShadow ="0 1px 1px 0 rgba(245,105,96,0.20)";    
            }
        }
    },
    mounted() {
        if (this.isDot) {
            this.setDotColor();
        }else if(typeof this.value ==='number'){
             this.$refs.badge.style.padding = "0 6px";
        }
    }
    };
</script>
<style>
.badge {
	position: relative;
	vertical-align: middle;
	display: inline-block
}
.badge_content {
	background-color: #F56960;
	border-radius: 10px;
	color: #fff;
	display: inline-block;
	font-size: 12px;
	height: 20px;
	line-height: 20px;
	padding: 0 8px;
	text-align: center;
	white-space: nowrap;
    box-shadow: 0 1px 3px 0 rgba(245,105,96,0.36);
}
.badge_content.is-dot {
	width: 6px;
	height: 6px;
	padding: 0;
	right: 0;
	border-radius: 50%
}
.badge_content.is-fixed {
	top: 0;
	right: 10px;
	position: absolute;
	-ms-transform: translateY(-50%) translateX(100%);
	transform: translateY(-50%) translateX(100%)
}
.badge_content.is-fixed.is-dot {
	right: 5px
}
</style>