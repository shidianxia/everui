<template>
    <div>
    <div class="check">
    <xcheckbox  v-model="checked" true-label="1" false-label="0"  @change="change" >备选项</xcheckbox>
    <xcheckbox v-model="checked1"  @change="change">备选项1</xcheckbox>
  <xcheckbox v-model="checked2" disabled>备选项2</xcheckbox>
    </div>
    <div class="check">
        <xcheckboxgroup v-model="checkList">
    <xcheckbox label="复选框 A"></xcheckbox>
    <xcheckbox label="复选框 B"></xcheckbox>
    <xcheckbox label="复选框 C"></xcheckbox>
    <xcheckbox label="禁用" disabled></xcheckbox>
    <xcheckbox label="选中且禁用" disabled></xcheckbox>
  </xcheckboxgroup>
    </div> 
         <input class="back" type="button" value="back" @click="back">
    </div>
</template>
<script>
    export default {
        data() {
            return {
                value: 1,
                value1: 1,
                checked: "1",
                checked1: false,
                checked2: true,
                checkList: ['选中且禁用', '复选框 A']
            }
        },
        methods: {
            change(val) {
                // console.log(val)
                console.log(this.checked)
            },
            back() {
                this.$router.push('/demolist')
            }
        }
    }
</script>
<style scoped>
    .check {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 50px auto;
    }
</style>