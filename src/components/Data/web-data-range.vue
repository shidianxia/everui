<template>
  <div class="slider">
    <div class="slider_runway"
      :class="{ 'disabled': disabled }"
      @click="onSliderClick" ref="slider">
      <div class="slider_bar" :style="{ width: currentPosition }"></div>
      <div
        class="slider_button-wrapper"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        @mousedown="onButtonDown"
        :class="{ 'hover': hovering, 'dragging': dragging }"
        :style="{left: currentPosition}"
        ref="button">
          <div
            class="tooltip"
            @mouseenter="handleShowPopper"
            @mouseleave="handleClosePopper">
            <div class="slider_button" :class="{ 'hover': hovering, 'dragging': dragging }"></div>
            <div
                class="tooltip_popper"
                ref="popper"
                v-show="!disabled && ShowPopper">
                <span>{{ value }}</span>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import { getStyle } from 'wind-dom/src/style';

  export default {
    props: {
      min: {    //最小值
        type: Number,
        default: 0
      },
      max: {    //最大值
        type: Number,
        default: 100
      },
      value: {   //v-model
        type: Number,
        default: 0
      },
      disabled: {   //是否禁用
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        hovering: false,
        dragging: false,
        ShowPopper: false,
        startX: 0,
        currentX: 0,
        startPos: 0,
        newPos: null,
        oldValue: this.value,
        currentPosition: (this.value - this.min) / (this.max - this.min) * 100 + '%'
      };
    },

    watch: {
      value(val) {
        if (val < this.min) {
          this.$emit('input', this.min);
          return;
        }
        if (val > this.max) {
          this.$emit('input', this.max);
          return;
        }
        this.setPosition((val - this.min) * 100 / (this.max - this.min));
      }
    },

    methods: {
      handleMouseEnter() {
        this.hovering = true;
        this.ShowPopper = true;

      },
      handleMouseLeave() {
        this.hovering = false;
        this.ShowPopper = false;
      },
      setPosition(newPos) {
        if (newPos >= 0 && (newPos <= 100)) {
          var lengthPerStep = 100 / ((this.max - this.min));
          var steps = Math.round(newPos / lengthPerStep);
          this.$emit('input', Math.round(steps * lengthPerStep * (this.max - this.min) * 0.01 + this.min));
          this.currentPosition = (this.value - this.min) / (this.max - this.min) * 100 + '%';
          if (!this.dragging) {
            if (this.value !== this.oldValue) {
              this.oldValue = this.value;
            }
          }
        }
      },
      onSliderClick(event) {
        if (this.disabled) return;
        var currentX = event.clientX;//鼠标在浏览器的X坐标
        var sliderOffsetLeft = this.$refs.slider.getBoundingClientRect().left;//元素左边距离页面左边的距离
        var newPos = (currentX - sliderOffsetLeft) / this.sliderWidth * 100;
        this.setPosition(newPos);
      },
      onDragStart(event) {
        this.dragging = true;
        this.startX = event.clientX;
        this.startPos = parseInt(this.currentPosition, 10);
      },
      onDragging(event) {
        if (this.dragging) {
          this.showPopper = true;
          this.currentX = event.clientX;
          var diff = (this.currentX - this.startX) / this.sliderWidth * 100;
          this.newPos = this.startPos + diff;
          this.setPosition(this.newPos);
        }
      },
      onDragEnd() {
        if (this.dragging) {
          this.dragging = false;
          this.showPopper = false;
          this.setPosition(this.newPos);
          window.removeEventListener('mousemove', this.onDragging);
          window.removeEventListener('mouseup', this.onDragEnd);
        }
      },
      onButtonDown(event) {
        if (this.disabled) return;
        this.onDragStart(event);
        window.addEventListener('mousemove', this.onDragging);
        window.addEventListener('mouseup', this.onDragEnd);
      },
      handleShowPopper() {
       this.showPopper = true;
      },
      handleClosePopper() {
        this.showPopper = false;
      }
    },
    computed: {
      sliderWidth() {//slider.width
        return parseInt(getStyle(this.$refs.slider, 'width'), 10);
      },
      stops() {
        let stopCount = (this.max - this.value);
        let result = [];
        let currentLeft = parseFloat(this.currentPosition);
        let stepWidth = 100 / (this.max - this.min);
        for (let i = 1; i < stopCount; i++) {
          result.push(currentLeft + i * stepWidth);
        }
        return result;
      }
    },
    created() {
      if (typeof this.value !== 'number' || this.value < this.min) {
        this.$emit('input', this.min);
      } else if (this.value > this.max) {
        this.$emit('input', this.max);
      }
    }
  };
</script>
<style>
.slider_runway {
	width: 100%;
	height: 6px;
  margin: 10px 10px;
	background: #F5F6F6;
	border-radius: 3px;
	position: relative;
	cursor: pointer;
	vertical-align: middle
}
.slider_runway.disabled {
	cursor: not-allowed;
}
.slider_runway.disabled .slider_button-wrapper.dragging,.slider_runway.disabled .slider_button-wrapper.hover,.slider_runway.disabled .slider_button-wrapper:hover {
	cursor: not-allowed;
}
.slider_runway.disabled .slider_button{
	background: #D6DADD;
}
.slider_runway.disabled .slider_button.dragging,.slider_runway.disabled .slider_button.hover,.slider_runway.disabled .slider_button:hover {
	cursor: not-allowed
}
.slider_runway.disabled .slider_bar{
	background: #F5F6F6;
}
.slider_bar {
	height: 6px;
	background-color: #2088EC;
	border-top-left-radius: 3px;
	border-bottom-left-radius: 3px;
	position: absolute
}
.slider_button-wrapper {
	width: 22px;
	height: 22px;
	position: absolute;
	z-index: 1;
  margin-left: -12px;
  top: 50%;
  margin-top: -12px;
	background-color: transparent;
}

.slider_button-wrapper.hover,.slider_button-wrapper:hover {
	cursor: -webkit-grab;
	cursor: grab
}

.slider_button-wrapper.dragging {
	cursor: -webkit-grabbing;
	cursor: grabbing
}

.slider_button {
	width: 16px;
	height: 16px;
	background-color: #2088EC;
	border-radius: 50%;
  position: absolute;
  top: 3px;
  left: 3px;
	transition: .2s;
}

.slider_button.dragging{
  transform: scale(1.375);
  -webkit-transform: scale(1.375);
}
.slider_button.dragging:after {
	content: '';
  width: 8px;
	height: 8px;
  border-radius: 50%;
  position: absolute;
  top:50%;
  left: 50%;
  margin-top: -4px;
  margin-left: -4px;
  background: #FFFFFF;
  z-index: 999
}

.slider_button.hover,.slider_button:hover {
	cursor: -webkit-grab;
	cursor: grab
}

.slider_button.dragging {
	cursor: -webkit-grabbing;
	cursor: grabbing
}

.tooltip_popper{
	position: absolute;
  width: 30px;
  height: 26px;
  text-align: center;
	z-index: 2000;
  background: #2088EC;
  border-radius: 3px;
  font-size: 12px;
  color: #FFFFFF;
  line-height: 26px;
  top: -35px;
  left: -3px;
}

.tooltip_popper:after {
    display:block;
    content:'';
    border-width:5px 5px 5px 5px;
    border-style:solid;
    border-color:#2088EC transparent transparent transparent;
    position:absolute;
    top:26px;
    left: 10px
}
</style>