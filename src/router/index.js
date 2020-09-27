import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

const index = (resolve) => {
	import('@/views/home/home').then((module) => {
		resolve(module);
	});
};

const product = (resolve) => {
	import('@/views/product/product').then((module) => {
		resolve(module);
	});
};

const casePage = (resolve) => {
	import('@/views/case/case').then((module) => {
		resolve(module);
	});
};

const service = (resolve) => {
	import('@/views/service/service').then((module) => {
		resolve(module);
	});
};

const my = (resolve) => {
	import('@/views/my/my').then((module) => {
		resolve(module);
	});
};

const gallery = (resolve) => {
	import('@/components/common/gallery/gallery').then((module) => {
		resolve(module);
	});
};

const productDetails = (resolve) => {
	import('@/views/product/productDetails').then((module) => {
		resolve(module);
	});
};

const routes = [{
	path: '/',
	name: '首页',
	component: index,
	meta:{
		transitionIndex: 0,
		keepAlive: true
	}
}, {
	path: '/home',
	name: '首页',
	component: index,
	meta:{
		transitionIndex: 0,
		keepAlive: true
	}
}, {
	path: '/product',
	name: '产品展示',
	component: product,
	meta:{
		transitionIndex: 0,
		keepAlive: true
	}
}, {
	path: '/case',
	name: '案例',
	component: casePage,
	meta:{
		transitionIndex: 0,
		keepAlive: true
	}
}, {
	path: '/service',
	name: '联系商家',
	component: service,
	meta:{
		transitionIndex: 0,
		keepAlive: true
	}
}, {
	path: '/my',
	name: '我的',
	component: my,
	meta:{
		transitionIndex: 0,
		keepAlive: true
	}
}, {
	path: '/gallery',
	name: '图片预览',
	component: gallery,
	meta:{
		transitionIndex: 999,
		keepAlive: true
	}
}, {
	path: '/productDetails',
	name: '产品详情',
	component: productDetails,
	meta:{
		transitionIndex: 1,
		keepAlive: true
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
