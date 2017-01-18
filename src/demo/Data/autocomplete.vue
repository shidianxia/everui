<template>
    <div class="autodemo">
<autocomplete v-model="state4" :fetch-suggestions="querySearchAsync" placeholder="请输入内容" @select="handleSelect"></autocomplete>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                restaurants: [],
                state4: '',
                timeout: null
            };
        },
        methods: {
            loadAll() {
                return [{
                    "value": "三全鲜食（北新泾店）",
                    "address": "长宁区新渔路144号"
                }, {
                    "value": "Hot honey 首尔炸鸡（仙霞路）",
                    "address": "上海市长宁区淞虹路661号"
                }, {
                    "value": "新旺角茶餐厅",
                    "address": "上海市普陀区真北路988号创邑金沙谷6号楼113"
                }];
            },
            querySearchAsync(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 3000 * Math.random());
            },
            createStateFilter(queryString) {
                return (state) => {
                    return (state.value.indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                // console.log(item);
            }
        },
        mounted() {
            this.restaurants = this.loadAll();
        }
    };
</script>
<style>
    .autodemo {
        margin: 50px auto;
        width: 300px;
    }
</style>