<template>
  <div class="input-number"
    :class="{ 'is-disabled': disabled }"
  >
      <span
      class="input-number_decrease"
      :class="{'is-disabled': minDisabled}"
      v-repeat-click="decrease"
      @mouseenter="activeInput(minDisabled)"
      @mouseleave="inactiveInput(minDisabled)"
    >
    <svg class="icons">
       <use xlink:href ="#icon-chevron-left"/>
    </svg>
    </span>
    <input
      v-model="currentValue"
      @keydown.up.native="increase"
      @keydown.down.native="decrease"
      @blur="handleBlur"
      @input="handleInput"
      :disabled="disabled"
      :class="{
        'is-active': inputActive,
        'is-disabled': disabled
      }">
    </input>

    <span
      class="input-number_increase"
      :class="{'is-disabled': maxDisabled}"
      v-repeat-click="increase"
      @mouseenter="activeInput(maxDisabled)"
      @mouseleave="inactiveInput(maxDisabled)"
    >
    <svg class="icons">
       <use xlink:href ="#icon-chevron-right"/>
    </svg>
    </span>
  </div>
</template>
<script>
  import { once, on } from 'wind-dom/src/event';

  export default {
    props: {
      step: {           //计数器步长 默认1    ..................
        type: Number,
        default: 1
      },
      max: {                 //设置计数器允许的最大值
        type: Number,
        default: Infinity
      },
      min: {                //设置计数器允许的最小值
        type: Number,
        default: 0
      },
      value: {              //绑定值v-model
        default: 0
      },
      disabled: Boolean,          //是否禁用计数器
    },
    directives: {
      repeatClick: {
        bind(el, binding, vnode) {
          let interval = null;
          let startTime;
          const handler = () => {
            vnode.context[binding.expression]();
          };
          const clear = function() {
            if (new Date() - startTime < 100) {
              handler();
            }
            clearInterval(interval);
            interval = null;
          };
          on(el, 'mousedown', function() {
            startTime = new Date();
            once(document, 'mouseup', clear);
            interval = setInterval(function() {
              handler();
            }, 100);
          });
        }
      }
    },
    data() {
      let value = this.value;
      if (value < this.min) {
        this.$emit('input', this.min);
        value = this.min;
      }
      if (value > this.max) {
        this.$emit('input', this.max);
        value = this.max;
      }
      return {
        currentValue: value,
        inputActive: false
      };
    },
    watch: {
      value(val) {
        this.currentValue = val;
      },
      currentValue(newVal, oldVal) {
        let value = Number(newVal);
        if (value <= this.max && value >= this.min) {
          this.$emit('input', value);
        }
      }
    },
    computed: {
      minDisabled() {
        return this.value - this.step < this.min;
      },
      maxDisabled() {
        return this.value + this.step > this.max;
      }
    },
    methods: {
      accSub(arg1, arg2) {
        var r1, r2, m, n;
        try {
          r1 = arg1.toString().split('.')[1].length;
        } catch (e) {
          r1 = 0;
        }
        try {
          r2 = arg2.toString().split('.')[1].length;
        } catch (e) {
          r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        n = (r1 >= r2) ? r1 : r2;
        return parseFloat(((arg1 * m - arg2 * m) / m).toFixed(n));
      },
      accAdd(arg1, arg2) {
        var r1, r2, m, c;
        try {
          r1 = arg1.toString().split('.')[1].length;
        } catch (e) {
          r1 = 0;
        }
        try {
          r2 = arg2.toString().split('.')[1].length;
        } catch (e) {
          r2 = 0;
        }
        c = Math.abs(r1 - r2);
        m = Math.pow(10, Math.max(r1, r2));
        if (c > 0) {
          var cm = Math.pow(10, c);
          if (r1 > r2) {
            arg1 = Number(arg1.toString().replace('.', ''));
            arg2 = Number(arg2.toString().replace('.', '')) * cm;
          } else {
            arg1 = Number(arg1.toString().replace('.', '')) * cm;
            arg2 = Number(arg2.toString().replace('.', ''));
          }
        } else {
          arg1 = Number(arg1.toString().replace('.', ''));
          arg2 = Number(arg2.toString().replace('.', ''));
        }
        return (arg1 + arg2) / m;
      },
      increase() {
        if (this.value + this.step > this.max || this.disabled) return;
        this.currentValue = this.accAdd(this.step, this.value);
        if (this.maxDisabled) {
          this.inputActive = false;
        }
      },
      decrease() {
        if (this.value - this.step < this.min || this.disabled) return;
        this.currentValue = this.accSub(this.value, this.step);
        if (this.minDisabled) {
          this.inputActive = false;
        }
      },
      activeInput(disabled) {
        if (!this.disabled && !disabled) {
          this.inputActive = true;
        }
      },
      inactiveInput(disabled) {
        if (!this.disabled && !disabled) {
          this.inputActive = false;
        }
      },
      handleBlur(event) {
        let value = Number(this.currentValue);
        if (isNaN(value) || value > this.max || value < this.min) {
          this.currentValue = this.value;
        } else {
          this.currentValue = value;
        }
      },
      handleInput(event) {
        this.currentValue = event.target.value;
      }
    }
  };
</script>
<style scoped>
.input-number {
	display: inline-block;
	overflow: hidden;
	width: 100px;
  height: 38px;
	position: relative;
}
input {
	position: relative;
	font-size: 14px;
  display: block;
	box-sizing: border-box;
	-moz-box-sizing: border-box;
	width: 100%;
	height: 100%;
	color: #505050;
	background-color: #FFFFFF;
	border: 1px solid #D6DADD;
	outline: 0;
	line-height: 38px;
  text-align: center;
  box-shadow: 0 0 2px 0 rgba(4,26,48,0.12);
  border-radius: 3px;
}
input.is-active {
	outline: 0;
  border-color: #2088EC;
  box-shadow: 0 0 4px 0 rgba(31,136,236,0.60);
}
input:hover,input:focus {
  border-color: #2088EC;
  box-shadow: 0 0 2px 0 rgba(0,0,0,0.12);
  outline: 0;
}
input.is-disabled {
 background: #F5F6F6;
 border-color: #D6DADD;
 color: #E0E0E0;
 cursor: not-allowed !important
}
.input-number_decrease,.input-number_increase {
  display: inline-block;
	height: 38px;
	width: 38px;
	line-height: 38px;
	text-align: center;
  font-size: 14px;
  color: #A8A8A8;
	cursor: pointer;
	position: absolute;
  z-index: 99;
}
.input-number_increase {
  top: 0;
	right: 0;
}
.input-number_decrease {
	top: 0;
  left: 0;
}
.icons {
  display: inline-block;
  width: 26px;
  height: 26px;
  position: absolute;
  top: 6.5px;
  left:6px;
  fill: #A9A9A9;
}
.icons:hover {
  fill: #2088EC;
}
.input-number_increase.is-disabled .icons,
.input-number_decrease.is-disabled .icons {
  fill: #E0E0E0;
}
.input-number_increase.is-disabled,
.input-number_decrease.is-disabled,
.input-number.is-disabled .input-number_increase,
.input-number.is-disabled .input-number_decrease {
  cursor: not-allowed
}
.input-number.is-disabled .icons,
.input-number.is-disabled .icons {
	fill: #D6DADD;
}
</style>

