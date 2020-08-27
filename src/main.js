import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import vueExt from './utils/vueExt.js' // eslint-disable-line
// 5.图片懒加载
import { Lazyload } from 'vant'
// options 为可选参数，无则不传
Vue.use(Lazyload)

Vue.use(VueResource);

Vue.config.productionTip = false

new Vue({
	render: h => h(App),
	router,
}).$mount('#app')
