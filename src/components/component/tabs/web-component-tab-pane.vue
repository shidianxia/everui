<template>
  <div class="tab-pane" v-show="show && $slots.default">
    <slot></slot>
  </div>
</template>
<script>
    export default{
        props: {
            label: { //选项卡标题
                type: String,
                required: true
            },
            name: String  //与选项卡 activeName 对应的标识符，表示选项卡别名
        },
        data() {
            return{
                index: ''
            } 
        },
        created() {
            if(!this.name){
                this.index = this.$parent.$children.indexOf(this) + 1 + '';
            }else{
                this.index = this.name;
            }           
        },
        destroyed() {
            if (this.$el && this.$el.parentNode) {
                this.$el.parentNode.removeChild(this.$el);
            }
            const panes = this.$parent.panes;
            if (panes) {
                panes.splice(this, panes.indexOf(this));
            }
        },
        computed: {
            show(){
                return this.$parent.currentName === this.index
            }
        }
    }
</script>