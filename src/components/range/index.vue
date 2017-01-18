<template>
  <div class="vux-range-input-box" style="position:relative;margin-right:30px;margin-left:50px;">
    <input class="vux-range-input" v-model="value" number>
  </div>
</template>

<script>
const Powerange = require('./range/lib/powerange.js')

export default {
  props: {
    decimal: Boolean,
    value: {
      default: 0,
      type: Number
    },
    min: {
      type: Number,
      default: 0
    },
    minHTML: String,
    maxHTML: String,
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 0
    },
    disabled: Boolean,
    disabledOpacity: Number,
    rangeBarHeight: {
      type: Number,
      default: 1
    },
    rangeHandleHeight: {
      type: Number,
      default: 30
    }
  },
  ready () {
    let options = {
      decimal: this.decimal,
      start: this.value,
      min: this.min,
      max: this.max,
      minHTML: this.minHTML,
      maxHTML: this.maxHTML,
      disable: this.disabled,
      disabledOpacity: this.disabledOpacity,
      initialBarWidth: getComputedStyle(this.$el.parentNode).width.replace('px', '') - 80
    }
    if (this.step !== 0) {
      options.step = this.step
    }
    this.range = new Powerange(this.$el.querySelector('.vux-range-input'), options)
    const handleTop = (this.rangeHandleHeight - this.rangeBarHeight) / 2
    this.$el.querySelector('.range-handle').style.top = `-${handleTop}px`
    this.$el.querySelector('.range-bar').style.height = `${this.rangeBarHeight}px`
  },
  watch: {
    value (val) {
      this.range.setStart(val)
    },
    'min + max': function () {
      let value = this.value
      if (value < this.min) {
        value = this.min
      }
      if (value > this.max) {
        value = this.max
      }
      this.range.reInit({min: this.min, max: this.max, value: value})
      this.value = value
      this.range.setStart(this.value)
    }
  }
}
</script>

<style lang="less">
	
	.range-bar {
		background-color: #a9acb1;
		border-radius: 15px;
		display: block;
		height: 1px;
		position: relative;
		width: 100%;
	}
	
	.range-bar-disabled {
		opacity: 0.5;
	}
	
	.range-quantity {
		background-color: #04BE02;
		border-radius: 15px;
		display: block;
		height: 100%;
		width: 0;
	}
	
	.range-handle {
		background-color: #fff;
		border-radius: 100%;
		cursor: move;
		height: 30px;
		left: 0;
		top: -13px;
		position: absolute;
		width: 30px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
	}
	
	.range-min,
	.range-max {
		color: #181819;
		font-size: 12px;
		position: absolute;
		text-align: center;
		top: 50%;
		transform: translateY(-50%);
		width: 24px;
	}
	
	.range-min {
		left: -30px;
	}
	
	.range-max {
		right: -30px;
	}
	
	.unselectable {
		user-select: none;
	}
	
	.range-disabled {
		cursor: default;
	}
</style>

