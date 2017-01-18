<template>
<div class="block">
    <span class="demonstration">默认</span>
    <calendar
      v-model="value6"
      type="daterange"
      placeholder="选择日期范围"
      style="width: 220px">
    </calendar>
     <calendar
      v-model="value1"
      type="date"
      placeholder="选择日期"
      :picker-options="pickerOptions0">
    </calendar>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
                value6: "",
                value1: ""
            }
        },
    }
</script>
<style>
    .block {
        margin: 0 auto;
        /*display: flex;*/
        /*align-items: center;*/
        /*justify-content: center*/
    }
</style>