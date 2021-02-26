import 'core-js/stable'
import Vue from 'vue'
import CoreuiVue from '@coreui/vue'
import App from './App'
import router from './router/index'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from './store'
import vuexI18n from 'vuex-i18n';
import Locales from './locale/vue-i18n-locales.generated.js';

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import VuePageTransition from 'vue-page-transition'
Vue.use(PerfectScrollbar)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VuePageTransition)

Vue.prototype.$apiAdress = 'http://127.0.0.1:8000'
Vue.use(CoreuiVue)
Vue.use(vuexI18n.plugin, store);
Vue.i18n.add('es', Locales.es);
Vue.i18n.add('en', Locales.en);
let locale = 'es'
if(typeof localStorage.locale !== 'undefined'){
  locale = localStorage.getItem("locale")
}
Vue.i18n.set(locale);

new Vue({
  el: '#app',
  router,
  store,
  //CIcon component documentation: https://coreui.io/vue/docs/components/icon
  icons,
  template: '<App/>',
  components: {
    App
  }
})

