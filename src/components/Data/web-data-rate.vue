<template>
  <div class="rate">
      <span v-for="item in 5" 
            class="item-rate"
            track-by="$index"
            :style="{ cursor: disabled? 'auto':'pointer' }"
            @mousemove="setCurrentValue(item)"
            @mouseleave="resetCurrentValue(item)"
            @click="comments(item)">
              <svg v-show="getIconType(item) === 1" class="star_style" :style='getIconStyle(item)' :class="{'hover': hovering===item}">
                   <use xlink:href ="#icon-o-rate"/>
              </svg>
              <svg v-show="getIconType(item) === 2"  class="star_style" :style='getIconStyle(item)' :class="{'hover': hovering===item}">
                   <use xlink:href ="#icon-f-rate"/>
              </svg>
              <svg v-show="getIconType(item) === 3"  class="star_style">
                   <use xlink:href ="#icon-f-rate-halfstar"/>
              </svg>
      </span>
  </div>
</template>

<script>
  export default {
    props: {
        max: {   //最大分值默认5
            type: Number,
            defalut: 5
        },
        disabled: {  //是否为只读
            type: Boolean,
            defalut: false
        },
        value: {   //v-model
            type: Number,
            defalut: null
        }
    },
    data () {
        return {
             currentvalue: this.value,
             hovering: '',
             tempvalue: -1,
             half: 0
        }
    },
    watch:{
        value(val){
        }
    },
    methods: {
        setCurrentValue(item){
            if(this.disabled) return;
            this.tempvalue= item;
            this.hovering = item;
            this.getIconType(this.tempvalue);
            this.getIconStyle(this.tempvalue);  
        },
        resetCurrentValue(item){
            if(this.disabled) return;
            this.tempvalue= -1;
            this.hovering = -1;
            this.getIconType(this.currentvalue);
            this.getIconStyle(this.currentvalue)
        },
        comments(item) {
            if(this.disabled) return;
            this.changestyle(item);
        },
        changestyle(item){
            this.getIconType(item);
            this.getIconStyle(item);
            this.currentvalue=item;
            this.$emit("input", this.currentvalue)
        },
        getIconType(item){
            if (this.disabled) {
                 if(this.half === item){
                    return 3
                 }else {
                    return 2
                 }
            }
            if(this.tempvalue !== -1){
                return item < this.tempvalue + 1 ? 2 : 1    
            }
            if (this.currentvalue===0) return 1
            return item < this.currentvalue + 1 ? 2 : 1
        },
        getIconStyle(item) {
            const voidColor = this.disabled ? "#F5F6F6" : "#D6DADD";
            if(this.tempvalue !== -1){
                const selectColor = (item < this.tempvalue+1) ? "#EFB444" : voidColor;
                return { fill: selectColor}
            }
            if (this.currentvalue===0)
              return { fill: voidColor}
            const selectColor = (item < this.currentvalue + 1) ? "#EFB444" : voidColor;
            return { fill: selectColor}
        },
    },
    created() {
      if (!this.value) {
        this.$emit('input', 0);
      }else if(Math.floor(this.value) !== this.value){
        this.half = Math.floor(this.value + 1) 
     }
    }
  }
</script>
<style scoped="scoped">
.rate{
height: 30px;
width: 150px;
}
.item-rate{
    display: inline-block;
    padding-left: 4px;
    width: 20px;
    height: 20px;
    overflow: hidden;
    position: relative;
}
.star_style{
    display: inline-block;
    width: 26px;
    height: 26px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -13px;
    margin-top: -13px
}
.hover {
    -ms-transform: scale(1.15);
    -o-transform: scale(1.15);
    -moz-transform: scale(1.15);
    -webkit-transform: scale(1.15);
    transform: scale(1.15)
}
</style>