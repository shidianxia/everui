import Vue from 'vue'
import VueRouter from 'vue-router'
//组件

import xswitch from '../components/Data/web-data-switch.vue'
import xinputnumber from '../components/Data/web-data-inputnumber.vue'
import xtable from '../components/Data/web-data-table.vue'
import autocomplete from '../components/Data/web-data-autocomplete.vue'
import xrange from '../components/Data/web-data-range.vue'
import xrate from '../components/Data/web-data-rate.vue'
import calendar from '../components/Data/date-picker/src/picker/date-picker'
import xupload from '../components/Data/upload/index.vue'
import xmultselect from '../components/Data/web-data-multselect.vue'
import xrow from '../components/Basic/grid/web-basic-row.vue'
import xcol from '../components/Basic/grid/web-basic-col.vue'
import xprogress from '../components/component/web-component-progress.vue'
import xtabs from '../components/component/tabs/web-component-tabs.vue'
import xtabpane from '../components/component/tabs/web-component-tab-pane.vue'
import xmenu from '../components/component/web-component-menu.vue'
import xpage from '../components/component/web-component-page.vue'
import xbadge from '../components/component/web-component-badge.vue'
import xdropdown from '../components/component/web-component-dropdown.vue'
import xinput from '../components/Form/web-form-input.vue'
import xlable from '../components/Form/web-form-lable.vue'
import xtextarea from '../components/Form/web-form-textarea.vue'
import xcheckbox from '../components/Form/checkbox/web-form-checkbox.vue'
import xcheckboxgroup from '../components/Form/checkbox/web-form-checkbox-group.vue'
import xselect from '../components/Form/web-form-select.vue'
import xbutton from '../components/Form/web-form-button.vue'
import xradio from '../components/Form/web-form-radio.vue'
import alert from '../components/Layer/web-layer-alert.vue'
import confirm from '../components/Layer/web-layer-confirm.vue'
import dialog from '../components/Layer/web-layer-dialog.vue'
import notification from '../components/Layer/web-layer-notification.vue'

//页面
import demolist from '../demo/demolist.vue'
import dswitch from '../demo/Data/switch.vue'
import dinputnumber from '../demo/Data/inputnumber.vue'
import dtable from '../demo/Data/table.vue'
import dautocomplete from '../demo/Data/autocomplete.vue'
import drange from '../demo/Data/range.vue'
import drate from '../demo/Data/rate.vue'
import dcalendar from '../demo/Data/calendar.vue'
import upload from '../demo/Data/upload.vue'
import dmultselect from '../demo/Data/multselect.vue'
import dgrid from '../demo/Basic/grid.vue'
import dprogress from '../demo/component/progress.vue'
import dmenu from '../demo/component/menu.vue'
import dpage from '../demo/component/page.vue'
import dbadge from '../demo/component/badge.vue'
import dtabs from '../demo/component/tabs.vue'
import ddropdown from '../demo/component/dropdown.vue'
import dinput from '../demo/Form/input.vue'
import dlable from '../demo/Form/lable.vue'
import dradio from '../demo/Form/radio.vue'
import dtextarea from '../demo/Form/textarea.vue'
import dcheckbox from '../demo/Form/checkbox.vue'
import dselect from '../demo/Form/select.vue'
import dbutton from '../demo/Form/button.vue'
import layer from '../demo/Layer/layer.vue'


Vue.component('xpage', xpage);
Vue.component('xupload', xupload);
Vue.component('xlable', xlable);
Vue.component('autocomplete', autocomplete);
Vue.component('calendar', calendar);
Vue.component('xcheckboxgroup', xcheckboxgroup);
Vue.component('xtextarea', xtextarea);
Vue.component('xcheckbox', xcheckbox);
Vue.component('xselect', xselect);
Vue.component('xbutton', xbutton);
Vue.component('xmultselect', xmultselect);
Vue.component('xinput', xinput);
Vue.component('notification', notification)
Vue.component('xalert', alert);
Vue.component('xconfirm', confirm);
Vue.component('xdialog', dialog);
Vue.component('xradio', xradio);
Vue.component('xswitch', xswitch);
Vue.component('xinputnumber', xinputnumber);
Vue.component('xtable', xtable);
Vue.component('xrange', xrange);
Vue.component('xrate', xrate);
Vue.component('xprogress', xprogress);
Vue.component('xrow', xrow);
Vue.component('xcol', xcol);
Vue.component('xtabs', xtabs);
Vue.component('xtabpane', xtabpane);
Vue.component('xmenu', xmenu);
Vue.component('xbadge', xbadge);
Vue.component('xdropdown', xdropdown);

Vue.use(VueRouter)
    // scrollBehavior:
    // - only available in html5 history mode
    // - defaults to no scroll behavior
    // - return false to prevent scroll
const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
        // savedPosition is only available for popstate navigations.
        return savedPosition
    } else {
        // new navigation.
        // scroll to anchor
        if (to.hash) {
            return { anchor: true }
        }
        // explicitly control scroll position
        // check if any matched route config has meta that requires scrolling to top
        if (to.matched.some(m => m.meta.scrollToTop)) {
            return { x: 0, y: 0 }
        }
    }
}

const route = new VueRouter({
    mode: 'history',
    base: __dirname,
    scrollBehavior,
    routes: [
        { path: '/demolist', component: demolist },
        { path: '/upload', component: upload, meta: { scrollToTop: true } },
        { path: '/dautocomplete', component: dautocomplete },
        { path: '/dcalendar', component: dcalendar },
        { path: '/dtextarea', component: dtextarea },
        { path: '/dradio', component: dradio },
        { path: '/dtable', component: dtable },
        { path: '/dselect', component: dselect },
        { path: '/dcheckbox', component: dcheckbox },
        { path: '/dinputnumber', component: dinputnumber },
        { path: '/drange', component: drange },
        { path: '/drate', component: drate },
        { path: '/dprogress', component: dprogress },
        { path: '/dgrid', component: dgrid },
        { path: '/dlable', component: dlable },
        { path: '/dpage', component: dpage },
        { path: '/dswitch', component: dswitch },
        { path: '/layer', component: layer },
        { path: '/dbutton', component: dbutton },
        { path: '/dinput', component: dinput },
        { path: '/dselect', component: dselect },
        { path: '/dtabs', component: dtabs },
        { path: '/dmultselect', component: dmultselect },
        { path: '/dmenu', component: dmenu },
        { path: '/dbadge', component: dbadge },
        { path: '/ddropdown', component: ddropdown },
        { path: '*', redirect: '/demolist' }
    ]
})

export default route;