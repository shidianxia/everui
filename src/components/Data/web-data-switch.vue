<template>
  <label class="switch" :class="{ 'is-disabled': disabled,}">
    <input
      class="switch_input"
      type="checkbox"
      v-model="_value"
      :name="name"
      :disabled="disabled">
    <span class="switch_core" ref="core">
      <span class="switch_button" :style="buttonStyle"></span>
    </span>
  </label>
</template>
<script>
  export default {
    props: {
      value: {                //v-model
        type: Boolean,
        default: true
      },
      disabled: {            // 是否禁用
        type: Boolean,
        default: false
      },
      onColor: {              //switch 打开时的背景色
        type: String,
        default: ''
      },
      name: {              //switch 对应的 name 属性
        type: String,
        default: ''
      }
    },
    data() {
      return {
        buttonStyle: {
          transform: ''
        }
      };
    },
    computed: {
      _value: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit('input', val);
        }
      }
    },
    watch: {
      value() {
        this.setBackgroundColor();
        this.handleButtonTransform();
      }
    },
    methods: {
      handleButtonTransform() {
        this.buttonStyle.transform = this.value ? `translate(21px, 0px)` : 'translate(0, 0px)';
      },
      setBackgroundColor() {
          if (this.value) {
            this.$refs.core.style.borderColor = this.onColor;
            this.$refs.core.style.backgroundColor = this.onColor;
          }else{
            this.$refs.core.style.borderColor = "#D6DADD";
            this.$refs.core.style.backgroundColor = "#FFFFFF";        
          }
      }
    },
    mounted() {
      this.handleButtonTransform();
      if (this.onColor && !this.disabled) {
        this.setBackgroundColor();
      }
    }
  };
</script>
<style scoped='scoped'>
.switch {
	display: inline-block;
	position: relative;
}
.switch_input {
	display: none
}
.switch_core {
  width: 51px;
	height: 30px;
	cursor: pointer;
	margin: 0;
	display: inline-block;
	vertical-align: middle;
	position: relative;
	border: 1px solid #D6DADD;
	outline: 0;
	border-radius: 15px;
	box-sizing: border-box;
	-moz-box-sizing: border-box;
	background-color:  #FFFFFF;
	-ms-transition: border-color .3s,background-color .3s;
	-o-transition: border-color .3s,background-color .3s;
	-webkit-transition: border-color .3s,background-color .3s;
	-moz-transition: border-color .3s,background-color .3s;
	transition: border-color .3s,background-color .3s;
}
.switch_core .switch_button {
	top: 0;
	left: 0;
	position: absolute;
	border-radius: 50%;
	-ms-transition: transform .3s;
	-o-transition: transform .3s;
	-webkit-transition: transform .3s;
	-moz-transition: transform .3s;
	transition: transform .3s;
	width: 28px;
	height: 28px;
	z-index: 20;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
	background-color: #FFFFFF;
  border: 1px solid #F5F6F6;
  box-shadow: 0 0 1px 0 rgba(4,26,48,0.24), 0 2px 3px 0 rgba(4,26,48,0.14);
}
/*默认*/
.switch_input:checked+.switch_core {
  background: #2088EC;
  border: 1px solid #2088EC;
}
.switch.is-disabled .switch_input:checked+.switch_core {
 background-color: #F5F6F6;
 border: 1px solid #F5F6F6;
}
.switch.is-disabled .switch_core {
	border-color: #F5F6F6;
	background: #F5F6F6;
}
.switch.is-disabled .switch_core span {
  background: #FFFFFF;
  border: 1px solid #F5F6F6;
  box-shadow: 0 0 1px 0 rgba(4,26,48,0.24), 0 2px 3px 0 rgba(4,26,48,0.14);
}
.switch.is-disabled .switch_core {
  cursor:not-allowed
}
</style>