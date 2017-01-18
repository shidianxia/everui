<template>
  <label class="radio">
    <span class="radio_input">
      <span class="radio_inner"
        :class="{
        'is-disabled': disabled,
        'is-checked': _value === label,
        'is-focus': focus
      }"></span>
      <input
        class="radio_original"
        :value="label"
        type="radio"
        v-model="_value"
        @focus="focus = true"
        @blur="focus = false"
        :name="name"
        :disabled="disabled">
    </span>
    <span class="radio_label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
  </label>
</template>
<script>
  export default {
    props: {
      value: [String, Number],      //v-model
      label: {                     //Radio 的 value
        type: [String, Number],
        required: true
      },
      disabled: Boolean,           //是否禁用
      name: String                 //原生 name 属性
    },
    data() {
      return {
        focus: false
      };
    },
    computed: {
      _value: {
        get() {
          return this.value !== undefined ? this.value : this.$parent.value;
        },
        set(newValue) {
          if (this.value !== undefined) {
            this.$emit('input', newValue);
          } else {
            this.$parent.$emit('input', newValue);
          }
        }
      }
    }
  };
</script>
<style scoped>
.radio{
	white-space: nowrap;
}
.radio_input {
	line-height: 1;
	vertical-align: middle;
	outline: 0;
  white-space: nowrap;
}
.radio_inner {
	border: 1px solid #D6DADD;
	box-sizing: border-box;
  -moz-box-sizing: border-box;
  width: 16px;
	height: 16px;
	border-radius: 50%;
	display: inline-block;
  background: #FFFFFF;
  box-shadow: 0 0 2px 0 rgba(4,26,48,0.12);
}
.radio,.radio_input,.radio_inner {
	position: relative;
	cursor: pointer
}
.radio_inner:not(.is-disabled):hover {
	border-color: #2088EC;
}
.radio_inner::after {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background-color: #2088EC;
	content: "";
	position: absolute;
	left: 50%;
	top: 50%;
  -ms-transform: translate(-50%,-50%) scale(0);
  -o-transform: translate(-50%,-50%) scale(0);
  -moz-transform: translate(-50%,-50%) scale(0);
  -webkit-transform: translate(-50%,-50%) scale(0);
	transform: translate(-50%,-50%) scale(0)
}
.radio_inner.is-disabled.is-checked {
  background-color: #F5F6F6;
  border: 1px solid #D6DADD;
  box-shadow: none;
}
.radio_inner.is-disabled.is-checked::after {
	background-color: #D0D0D0;
}
.radio_inner.is-focus {
	border-color: #2088EC;
}

.radio_inner.is-checked {
	border-color: #2088EC;
  box-shadow: 0 0 4px rgba(31,136,236,0.6);
}
.radio_inner.is-disabled,.radio_inner.is-disabled::after {
	background-color: #EFF2F7;
	cursor: not-allowed
}
.radio_inner.is-checked::after {
	-ms-transform: translate(-50%,-50%) scale(1);
	-o-transform: translate(-50%,-50%) scale(1);
	-moz-transform: translate(-50%,-50%) scale(1);
	-webkit-transform: translate(-50%,-50%) scale(1);
	transform: translate(-50%,-50%) scale(1)
}
.radio_inner.is-disabled {
	background-color: #F5F6F6;
  border: 1px solid #D6DADD;
}
.radio_inner.is-disabled+.radio_label {
	cursor: not-allowed
}
.radio_original {
	opacity: 0;
	outline: 0;
	position: absolute;
	z-index: -1;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: 0
}
.radio_label {
	font-size: 14px;
  color: #041B30;
  line-height: 14px;
}
</style>

