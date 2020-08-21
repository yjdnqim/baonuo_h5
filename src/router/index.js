import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

const index = (resolve) => {
	import('@/components/index').then((module) => {
		resolve(module);
	});
};

const routes = [{
	path: '/',
	name: '首页',
	component: index,
	meta:{
		transitionIndex: 0
	}
}];
// 路由配置
const router = new Router({ // eslint-disable-line
	mode: 'hash',
	routes: routes
});

router.beforeEach((to, from, next) => {
	window.scrollTo(0,0)
	document.title = to.name;
	//解决切换页面时weui.picker不消失的bug
	let mask = document.getElementsByClassName("weui-mask")[0];
	let picker = document.getElementsByClassName("weui-picker")[0];
	if (mask && picker) {
		var a = document.getElementById("weui-picker-confirm")
		var e = document.createEvent("MouseEvents");
		if(a && e){
			e.initEvent("click", true, true);
			a.dispatchEvent(e);
		}
	}
	
	next()
	
	
	
});

export default router;
