<template>
  <div
    class="row"
    :class="[
      justify !== 'start' ? 'is-justify-' + justify : '',
      align !== 'top' ? 'is-align-' + align : '',
      {
        'row-flex': type === 'flex'
      }
    ]"
  >
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      type: String,
      justify: {
        type: String,
        default: 'start'
      },
      align: {
        type: String,
        default: 'top'
      }
    },
  };
</script>
<style>
.row:after,.row:before {
	display: table;
	content: ""
}
.row:after {
	clear: both
}
.row {
	position: relative;
	box-sizing: border-box;
	-moz-box-sizing: border-box;
  margin-left: -12px;
  margin-right: -12px
}
.row-flex {
	display: -ms-flexbox;
	display: -webkit-flexbox;
	display: flex
}
.row-flex:after,.row-flex:before {
	display: none
}
.row-flex.is-align-bottom {
	-ms-flex-align: end;
	-webkit-align-items: flex-end;
	align-items: flex-end;
}
.row-flex.is-align-middle {
	-ms-flex-align: center;
	-webkit-flex-align: center;
	align-items: center
}
.row-flex.is-justify-space-around {
	-ms-flex-pack: distribute;
	justify-content: space-around
}
.row-flex.is-justify-space-between {
	-ms-flex-pack: justify;
	justify-content: space-between
}
.row-flex.is-justify-end {
	-ms-flex-pack: end;
	justify-content: flex-end
}
.row-flex.is-justify-center {
	-ms-flex-pack: center;
	justify-content: center
}
</style>
