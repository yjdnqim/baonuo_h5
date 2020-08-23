import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

const index = (resolve) => {
	import('@/components/index').then((module) => {
		resolve(module);
	});
};

const product = (resolve) => {
	import('@/components/product').then((module) => {
		resolve(module);
	});
};

const casePage = (resolve) => {
	import('@/components/case').then((module) => {
		resolve(module);
	});
};

const service = (resolve) => {
	import('@/components/service').then((module) => {
		resolve(module);
	});
};

const my = (resolve) => {
	import('@/components/my').then((module) => {
		resolve(module);
	});
};

const gallery = (resolve) => {
	import('@/components/common/gallery/gallery').then((module) => {
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
}, {
	path: '/home',
	name: '首页',
	component: index,
	meta:{
		transitionIndex: 0
	}
}, {
	path: '/product',
	name: '产品展示',
	component: product,
	meta:{
		transitionIndex: 0
	}
}, {
	path: '/case',
	name: '案例',
	component: casePage,
	meta:{
		transitionIndex: 0
	}
}, {
	path: '/service',
	name: '客服',
	component: service,
	meta:{
		transitionIndex: 0
	}
}, {
	path: '/my',
	name: '客服',
	component: my,
	meta:{
		transitionIndex: 0
	}
}, {
	path: '/gallery',
	name: '图片预览',
	component: gallery,
	meta:{
		transitionIndex: 0
	}
}];
// 路由配置
const router = new Router({ // eslint-disable-line
	mode: 'history',
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
