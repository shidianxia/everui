<template>   
    <div>
        <div class="menu">
         <xmenu></xmenu>
        </div>
        <div class="menu">
         <xmenu theme='#FFFFFF' :subtab='value'></xmenu>
        </div>
        <div class="menu">
         <xmenu theme='#2088EC' :subtab='value'></xmenu>
        </div>
        <div class="menu">
         <xmenu theme='#2088EC'></xmenu>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            value: true
        }
    }
}
</script>
<style scoped>
.menu{
    width: 100%;
    height: 400px
}
</style>