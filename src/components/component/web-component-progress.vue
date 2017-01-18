<template>
  <div
    class="progress"
    :class="[
      'progress-' + type,
    ]">
    <div class="progress-bar" v-if="type === 'lineL'||type === 'lineS'">
      <div class="progress-bar_outer" :style="linetype(type)">
        <div class="progress-bar_inner" :style="barStyle">
        </div>
      </div>
      <div v-if="showtext" class="progress_text_line">{{ percentage }}%</div>
    </div>
    <div class="progress-circle" :style="{height: width + 'px', width: width + 'px'}" v-if="type === 'circle'">
      <svg viewBox="0 0 100 100">
        <path :d="trackPath" stroke="#e5e9f2" :stroke-width="relativeStrokeWidth" fill="none"></path>
        <path :d="trackPath" stroke-linecap="round" stroke="#5ABA69" :stroke-width="relativeStrokeWidth" fill="none" :style="circlePathStyle"></path>
      </svg>
      <div v-if="showtext" class="progress_text">{{ percentage }}%</div>
    </div>
  </div>
</template>
<script>
    export default {
        props: {
            type: { // 进度条类型：lineL（height： 8px）、lineS（height： 4px）、circle
                type: String,
                default: 'lineL',
                validator: val => ['lineL', 'lineS', 'circle'].indexOf(val) > -1
            },
            percentage: { ///百分比（必填）
                type: Number,
                default: 0,
                required: true,
                validator: val => val >= 0 && val <= 100
            },
            strokeWidth: { //圆形进度条的宽度，单位 px
                type: Number,
                default: 6
            },
            width: { //环形进度条画布宽度（只在 type=circle 时可用）
                type: Number,
                default: 126
            },
            showtext: { //是否显示进度条文字内容默认显示
                type: Boolean,
                default: true
            },
        },
        computed: {
            barStyle() {
                var style = {};
                style.width = this.percentage + '%';
                return style;
            },
            relativeStrokeWidth() {
                return (this.strokeWidth / this.width * 100).toFixed(1);
            },
            trackPath() {
                var radius = parseInt(50 - parseFloat(this.relativeStrokeWidth) / 2, 10);

                return `M 50 50 m 0 -${radius} a ${radius} ${radius} 0 1 1 0 ${radius * 2} a ${radius} ${radius} 0 1 1 0 -${radius * 2}`;
            },
            perimeter() {
                var radius = 50 - parseFloat(this.relativeStrokeWidth) / 2;
                return 2 * Math.PI * radius;
            },
            circlePathStyle() {
                var perimeter = this.perimeter;
                return {
                    strokeDasharray: `${perimeter}px,${perimeter}px`,
                    strokeDashoffset: (1 - this.percentage / 100) * perimeter + 'px',
                    transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
                };
            },
        },
        methods: {
            linetype(type) {
                if (type === 'lineL') {
                    var style = {};
                    style.height = '8px';
                } else if (type === 'lineS') {
                    var style = {};
                    style.height = '4px';
                }
                return style;
            }
        }
    };
</script>
<style scoped>
    .progress {
        position: relative;
    }
    
    .progress-bar {
        display: inline-block;
        position: relative;
        width: 100%;
    }
    
    .progress-bar_outer {
        height: 6px;
        border-radius: 100px;
        background-color: #D6DADD;
        overflow: hidden;
        position: relative;
        border-radius: 4px;
        vertical-align: middle
    }
    
    .progress-bar_inner {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        background-color: #5ABA69;
        border-radius: 4px;
    }
    
    .progress-bar .progress_text_line {
        font-size: 14px;
        text-align: center;
        color: #546472;
        line-height: 14px;
        width: 100px;
        position: absolute;
        left: 50%;
        margin-left: -50px;
        top: -20px
    }
    
    .progress-circle {
        display: inline-block;
        position: relative;
    }
    
    .progress-circle .progress_text {
        position: absolute;
        height: 20px;
        margin-top: -10px;
        top: 50%;
        left: 0;
        width: 100%;
        text-align: center;
    }
</style>