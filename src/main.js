import Vue from 'vue/dist/vue'
import App from './App'
import router from './router/router.js'
import xsvg from './components/svg.vue'
Vue.component('xsvg', xsvg);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    router,
    components: {
        App,
    },
    data: {
        photo: new Vue()
    }
})