<template>
  <div class="col" :class="subClasss">
    <slot></slot>
  </div>
</template>

<script>
  export default {
  props: {
    span: {
      type: Number,
      default: 12
    },               //栅格占据的列数
    offset: Number,  //栅格左侧的间隔格数
    pull: Number,    //栅格向右移动格数
    push: Number,    //栅格向左移动格数
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object]
  },
    computed: {
		subClasss(){
		let classList = [];
		['span', 'offset', 'pull', 'push'].forEach(prop => {
		if (this[prop]) {
			classList.push(
			prop !== 'span'
			? `col-${prop}-${this[prop]}`
			: `col-${this[prop]}`
			);
		}
		});
			['xs', 'sm', 'md', 'lg'].forEach(size => {
		if (typeof this[size] === 'number') {
			classList.push(`col-${size}-${this[size]}`);
		} else if (typeof this[size] === 'object') {
			let props = this[size];
			Object.keys(props).forEach(prop => {
			classList.push(
				prop !== 'span'
				? `col-${size}-${prop}-${props[prop]}`
				: `col-${size}-${props[prop]}`
			);
			});
		}
		});
        return classList
      }
    }
  }
</script>
<style>
.col{
  padding-left: 12px;
  padding-right: 12px
}
.col-1,.col-2,.col-3,.col-4,.col-5,.col-6,.col-7,.col-8,.col-9,.col-10,.col-11,.col-12 {
	float: left;
	box-sizing: border-box;
	-moz-box-sizing: border-box;
}
.col-1,.col-xs-1 {
	width: 8.33333%
}
.col-offset-1,.col-xs-offset-1 {
	margin-left: 8.33333%
}
.col-pull-1,.col-xs-pull-1 {
	position: relative;
	right: 8.33333%
}
.col-push-1,.col-xs-push-1 {
	position: relative;
	left: 8.33333%
}
.col-2,.col-xs-2 {
	width: 16.66667%
}
.col-offset-2,.col-xs-offset-2 {
	margin-left: 16.66667%
}
.col-pull-2,.col-xs-pull-2 {
	position: relative;
	right: 16.66667%
}
.col-push-2,.col-xs-push-2 {
	position: relative;
	left: 16.66667%
}
.col-3,.col-xs-3 {
	width: 25%
}
.col-offset-3,.col-xs-offset-3 {
	margin-left: 25%
}
.col-pull-3,.col-xs-pull-3 {
	position: relative;
	right: 25%
}
.col-push-3,.col-xs-push-3 {
	position: relative;
	left: 33.33333%
}
.col-4,.col-xs-4 {
	width: 33.33333%
}

.col-offset-4,.col-xs-offset-4 {
	margin-left: 33.33333%
}
.col-pull-4,.col-xs-pull-4 {
	position: relative;
	right: 33.33333%
}
.col-push-4,.col-xs-push-4 {
	position: relative;
	left: 33.33333%
}
.col-5,.col-xs-5 {
	width: 41.66667%
}
.col-offset-5,.col-xs-offset-5 {
	margin-left: 41.66667%
}
.col-pull-5,.col-xs-pull-5 {
	position: relative;
	right: 41.66667%
}
.col-push-5,.col-xs-push-5 {
	position: relative;
	left: 41.66667%
}
.col-6,.col-xs-6 {
	width: 50%
}
.col-offset-6,.col-xs-offset-6 {
	margin-left: 50%
}
.col-pull-6,.col-xs-pull-6 {
	position: relative;
	right: 50%
}
.col-push-6,.col-xs-push-6 {
	position: relative;
	left: 50%
}
.col-7,.col-xs-7 {
	width: 58.33333%
}
.col-offset-7,.col-xs-offset-7 {
	margin-left: 58.33333%
}
.col-pull-7,.col-xs-pull-7 {
	position: relative;
	right: 58.33333%
}
.col-push-7,.col-xs-push-7 {
	position: relative;
	left: 58.33333%
}
.col-8,.col-xs-8 {
	width: 66.66667%
}
.col-offset-8,.col-xs-offset-8 {
	margin-left: 66.66667%
}
.col-pull-8,.col-xs-pull-8 {
	position: relative;
	right: 66.66667%
}
.col-push-8,.col-xs-push-8 {
	position: relative;
	left: 66.66667%
}
.col-9,.col-xs-9 {
	width: 75%
}
.col-offset-9,.col-xs-offset-9 {
	margin-left: 75%
}
.col-pull-9,.col-xs-pull-9 {
	position: relative;
	right: 75%
}
.col-push-9,.col-xs-push-9 {
	position: relative;
	left: 75%
}
.col-10,.col-xs-10 {
	width: 83.33333%
}
.col-offset-10,.col-xs-offset-10 {
	margin-left: 83.33333%
}
.col-pull-10,.col-xs-pull-10 {
	position: relative;
	right: 83.33333%
}
.col-push-10,.col-xs-push-10 {
	position: relative;
	left: 83.33333%
}
.col-11,.col-xs-11 {
	width: 91.66667%
}
.col-offset-11,.col-xs-offset-11 {
	margin-left: 91.66667%
}
.col-pull-11,.col-xs-pull-11 {
	position: relative;
	right: 91.66667%
}
.col-push-11,.col-xs-push-11 {
	position: relative;
	left: 91.66667%
}
.col-12,.col-xs-12 {
	width: 100%
}
.col-offset-12,.col-xs-offset-12 {
	margin-left: 100%
}
.col-pull-12,.col-xs-pull-12 {
	position: relative;
	right: 100%
}
.col-push-12,.col-xs-push-12 {
	position: relative;
	left: 100%
}
@media (min-width:768px) {
	.col-sm-1 {
		width: 8.33333%
	}
	.col-xs-offset-1 {
		margin-left: 8.33333%
	}
	.col-xs-pull-1 {
		position: relative;
		right: 8.33333%
	}
	.col-xs-push-1 {
		position: relative;
		left: 8.33333%
	}
	.col-sm-2 {
		width: 16.66667%
	}
	.col-xs-offset-2 {
		margin-left: 16.66667%
	}
	.col-xs-pull-2 {
		position: relative;
		right: 16.66667%
	}
	.col-xs-push-2 {
		position: relative;
		left: 16.66667%
	}
	.col-sm-3 {
		width: 25%
	}
	.col-xs-offset-3 {
		margin-left: 25%
	}
	.col-xs-pull-3 {
		position: relative;
		right: 25%
	}
	.col-xs-push-3 {
		position: relative;
		left: 25%
	}
	.col-sm-4 {
		width: 33.33333%
	}
	.col-xs-offset-4 {
		margin-left: 33.33333%
	}
	.col-xs-pull-4 {
		position: relative;
		right: 33.333333%
	}
	.col-xs-push-4 {
		position: relative;
		left: 33.33333%
	}
	.col-sm-5 {
		width: 41.66667%
	}
	.col-xs-offset-5 {
		margin-left: 41.66667%
	}
	.col-xs-pull-5 {
		position: relative;
		right: 41.66667%
	}
	.col-xs-push-5 {
		position: relative;
		left: 41.66667%
	}
	.col-sm-6 {
		width: 50%
	}
	.col-xs-offset-6 {
		margin-left: 50%
	}
	.col-xs-pull-6 {
		position: relative;
		right: 50%
	}
	.col-xs-push-6 {
		position: relative;
		left: 50%
	}
	.col-sm-7 {
		width: 58.33333%
	}
	.col-xs-offset-7 {
		margin-left: 58.33333%
	}
	.col-xs-pull-7 {
		position: relative;
		right: 58.33333%
	}
	.col-xs-push-7 {
		position: relative;
		left: 58.33333%
	}
	.col-sm-8 {
		width: 66.66667%
	}
	.col-xs-offset-8 {
		margin-left: 66.66667%
	}
	.col-xs-pull-8 {
		position: relative;
		right: 66.66667%
	}
	.col-xs-push-8 {
		position: relative;
		left: 66.66667%
	}
	.col-sm-9 {
		width: 75%
	}
	.col-xs-offset-9 {
		margin-left: 75%
	}
	.col-xs-pull-9 {
		position: relative;
		right: 75%
	}
	.col-xs-push-9 {
		position: relative;
		left: 75%
	}
	.col-sm-10 {
		width: 83.33333%
	}
	.col-xs-offset-10 {
		margin-left: 83.33333%
	}
	.col-xs-pull-10 {
		position: relative;
		right:83.33333%
	}
	.col-xs-push-10 {
		position: relative;
		left: 83.33333%
	}
	.col-sm-11 {
		width: 91.66667%
	}
	.col-xs-offset-11 {
		margin-left: 91.66667%
	}
	.col-xs-pull-11 {
		position: relative;
		right: 91.66667%
	}
	.col-xs-push-11 {
		position: relative;
		left: 91.66667%
	}
	.col-sm-12 {
		width: 100%
	}
	.col-xs-offset-12 {
		margin-left: 100%
	}
	.col-xs-pull-12 {
		position: relative;
		right: 100%
	}
	.col-xs-push-12 {
		position: relative;
		left: 100%
	}
}
@media (min-width:992px) {
	.col-md-1 {
		width: 8.33333%
	}
	.col-md-offset-1 {
		margin-left: 8.33333%
	}
	.col-md-pull-1 {
		position: relative;
		right: 8.33333%
	}
	.col-md-push-1 {
		position: relative;
		left: 8.33333%
	}
	.col-md-2 {
		width: 16.66667%
	}
	.col-md-offset-2 {
		margin-left: 16.66667%
	}
	.col-md-pull-2 {
		position: relative;
		right: 16.66667%
	}
	.col-md-push-2 {
		position: relative;
		left: 16.66667%
	}
	.col-md-3 {
		width: 25%
	}
	.col-md-offset-3 {
		margin-left: 25%
	}
	.col-md-pull-3 {
		position: relative;
		right: 25%
	}
	.col-md-push-3 {
		position: relative;
		left: 25%
	}
	.col-md-4 {
		width: 33.33333%
	}
	.col-md-offset-4 {
		margin-left: 33.33333%
	}
	.col-md-pull-4 {
		position: relative;
		right: 33.33333%
	}
	.col-md-push-4 {
		position: relative;
		left: 33.33333%
	}
	.col-md-5 {
		width: 41.66667%
	}
	.col-md-offset-5 {
		margin-left: 41.66667%
	}
	.col-md-pull-5 {
		position: relative;
		right: 41.66667%
	}
	.col-md-push-5 {
		position: relative;
		left: 41.66667%
	}
	.col-md-6 {
		width: 50%
	}
	.col-md-offset-6 {
		margin-left: 50%
	}
	.col-md-pull-6 {
		position: relative;
		right: 50%
	}
	.col-md-push-6 {
		position: relative;
		left: 50%
	}
	.col-md-7 {
		width: 58.33333%
	}
	.col-md-offset-7 {
		margin-left: 58.33333%
	}
	.col-md-pull-7 {
		position: relative;
		right: 58.33333%
	}
	.col-md-push-7 {
		position: relative;
		left: 58.33333%
	}
	.col-md-8 {
		width: 66.66666%
	}
	.col-md-offset-8 {
		margin-left: 66.66666%
	}
	.col-md-pull-8 {
		position: relative;
		right: 66.66666%
	}
	.col-md-push-8 {
		position: relative;
		left: 66.66666%
	}
	.col-md-9 {
		width: 75%
	}
	.col-md-offset-9 {
		margin-left: 75%
	}
	.col-md-pull-9 {
		position: relative;
		right: 75%
	}
	.col-md-push-9 {
		position: relative;
		left: 75%
	}
	.col-md-10 {
		width: 83.33333%
	}
	.col-md-offset-10 {
		margin-left: 83.33333%
	}
	.col-md-pull-10 {
		position: relative;
		right: 83.33333%
	}
	.col-md-push-10 {
		position: relative;
		left: 83.33333%
	}
	.col-md-11 {
		width: 91.66667%
	}
	.col-md-offset-11 {
		margin-left:  91.66667%
	}
	.col-md-pull-11 {
		position: relative;
		right:  91.66667%
	}
	.col-md-push-11 {
		position: relative;
		left:  91.66667%
	}
	.col-md-12 {
		width: 100%
	}
	.col-md-offset-12 {
		margin-left: 100%
	}
	.col-md-pull-12 {
		position: relative;
		right: 100%
	}
	.col-md-push-12 {
		position: relative;
		left: 100%
	}
}
@media (min-width:1200px) {
	.col-lg-1 {
		width: 8.33333%
	}
	.col-xs-offset-1 {
		margin-left: 8.33333%
	}
	.col-xs-pull-1 {
		position: relative;
		right: 8.33333%
	}
	.col-xs-push-1 {
		position: relative;
		left: 8.33333%
	}
	.col-lg-2 {
		width: 16.66667%
	}
	.col-xs-offset-2 {
		margin-left: 16.66667%
	}
	.col-xs-pull-2 {
		position: relative;
		right: 16.66667%
	}
	.col-xs-push-2 {
		position: relative;
		left: 16.66667%
	}
	.col-lg-3 {
		width: 25%
	}
	.col-xs-offset-3 {
		margin-left: 25%
	}
	.col-xs-pull-3 {
		position: relative;
		right: 25%
	}
	.col-xs-push-3 {
		position: relative;
		left: 25%
	}
	.col-lg-4 {
		width: 33.33333%
	}
	.col-xs-offset-4 {
		margin-left: 33.33333%
	}
	.col-xs-pull-4 {
		position: relative;
		right: 33.33333%
	}
	.col-xs-push-4 {
		position: relative;
		left: 33.33333%
	}
	.col-lg-5 {
		width: 41.66667%
	}
	.col-xs-offset-5 {
		margin-left: 41.66667%
	}
	.col-xs-pull-5 {
		position: relative;
		right: 41.66667%
	}
	.col-xs-push-5 {
		position: relative;
		left: 41.66667%
	}
	.col-lg-6 {
		width: 50%
	}
	.col-xs-offset-6 {
		margin-left: 50%
	}
	.col-xs-pull-6 {
		position: relative;
		right: 50%
	}
	.col-xs-push-6 {
		position: relative;
		left: 50%
	}
	.col-lg-7 {
		width: 58.33333%
	}
	.col-xs-offset-7 {
		margin-left: 58.33333%
	}
	.col-xs-pull-7 {
		position: relative;
		right: 58.33333%
	}
	.col-xs-push-7 {
		position: relative;
		left: 58.33333%
	}
	.col-lg-8 {
		width: 66.66667%
	}
	.col-xs-offset-8 {
		margin-left: 66.66667%
	}
	.col-xs-pull-8 {
		position: relative;
		right: 66.66667%
	}
	.col-xs-push-8 {
		position: relative;
		left: 66.66667%
	}
	.col-lg-9 {
		width: 75%
	}
	.col-xs-offset-9 {
		margin-left: 75%
	}
	.col-xs-pull-9 {
		position: relative;
		right: 75%
	}
	.col-xs-push-9 {
		position: relative;
		left: 75%
	}
	.col-lg-10 {
		width: 83.33333%
	}
	.col-xs-offset-10 {
		margin-left: 83.33333%
	}
	.col-xs-pull-10 {
		position: relative;
		right: 83.33333%
	}
	.col-xs-push-10 {
		position: relative;
		left: 83.33333%
	}
	.col-lg-11 {
		width: 91.66667%
	}
	.col-xs-offset-11 {
		margin-left: 91.66667%
	}
	.col-xs-pull-11 {
		position: relative;
		right: 91.66667%
	}
	.col-xs-push-11 {
		position: relative;
		left: 91.66667%
	}
	.col-lg-12 {
		width: 100%
	}
	.col-xs-offset-12 {
		margin-left: 100%
	}
	.col-xs-pull-12 {
		position: relative;
		right: 100%
	}
	.col-xs-push-12 {
		position: relative;
		left: 100%
	}
}
</style>
