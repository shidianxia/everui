<template>
    <div>
    <div  class="pages">
        <xpage  mode="event" :total-page="listpagetotal" :showJump="showJump" :init-page="eventPage" @go-page="goPage"></xpage>
    </div>
   <div  class="pages">
        <xpage  mode="event" :total-page="listpagetotal" :minilengthall="listpagetotal" :init-page.sync="eventPage1" :minilengthone="total" :minipager="minipager" @go-page="goPage1"></xpage>
   </div>
   <div  class="pages">
     <xpage  mode="event" :total-page="listpagetotal"  :init-page="eventPage" @go-page="goPage"></xpage>
   </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                showJump: true,
                total: 10,
                hasNextPage: 5,
                hasPrePage: 5,
                listpagetotal: 50,
                eventPage: 1,
                eventPage1: 1,
                minipager: true
            }
        },
        methods: {
            goPage(data) {
                // console.log(data.page)
                this.eventPage = data.page
            },
            goPage1(data) {
                // console.log(data.page)
                this.eventPage1 = data.page
            },

        }
    }
</script>
<style scoped>
    .pages {
        width: 100%;
        height: 50px;
        /*下面三个时让分页绝对居中，引用时要加上*/
        display: flex;
        align-items: center;
        justify-content: center;
        /**/
        margin: 50px auto;
        float: left
    }
</style>