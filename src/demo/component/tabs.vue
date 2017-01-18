<template>
    <div>
        <div class="normal">
        <xtabs :active-name="activeName" @tab-click="tabclick">
            <xtabpane label="单位" name="first"><div style="color: red">aaaaa</div></xtabpane>
            <xtabpane label="建筑物" name="second">建筑物</xtabpane>
            <xtabpane label="消火栓" name="third">消火栓</xtabpane>
            <xtabpane label="监督员" name="fourth">监督员</xtabpane>
        </xtabs>
        </div>
        <div class="card">
        <xtabs type="border-card">
            <xtabpane label="功能一">功能一</xtabpane>
            <xtabpane label="功能二">功能二</xtabpane>
            <xtabpane label="功能三">功能三</xtabpane>
            <xtabpane label="功能四">功能四</xtabpane>
            <xtabpane label="功能五">功能五</xtabpane>
        </xtabs>
        </div>
        <div class="common">
        <xtabs type="common">
            <xtabpane label="功能一">功能一</xtabpane>
            <xtabpane label="功能二">功能二</xtabpane>
        </xtabs>
        </div>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
        tabclick(tab, event) {
            console.log(tab, event);
        }
    }
  }
</script>
<style scoped>
.normal{
    margin: 10px 50px;
    width: 80%;
	height: 100px;
}
.card{
    margin: 10px 50px;
    width: 80%;
	height: 300px;
}
.common{
    margin: 10px 50px;
    width: 182px;
	height: 221px;
}
.aaa{
    color: red
}
</style>