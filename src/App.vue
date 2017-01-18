<template>
  <div id="app">
    <xsvg></xsvg>
     <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
      </transition>
    <!--<router-view></router-view>-->
  </div>
</template>

<script>
    export default {
        data() {
            return {
                transitionName: 'slide-left'
            }
        },
        watch: {
            '$route' (to, from) {
                const toDepth = to.path.split('/').length
                const fromDepth = from.path.split('/').length
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
                console.log(this.transitionName)

            }
        },
    }
</script>
<style src="assets/css/normalize.css"></style>
<style src="assets/less/main.less" lang="less"></style>