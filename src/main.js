import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import vueExt from './utils/vueExt.js' // eslint-disable-line

Vue.use(VueResource);

Vue.config.productionTip = false

new Vue({
	render: h => h(App),
	router,
}).$mount('#app')
