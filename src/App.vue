<template>
	<div id="app">
		<keep-alive>
			<transition :name="transitionName">
				<router-view :class="{'child-view': transitionName!=''}" v-if="$route.meta.keepAlive"></router-view>
			</transition>
		</keep-alive>
		<transition :name="transitionName">
			<router-view :class="{'child-view': transitionName!=''}" v-if="!$route.meta.keepAlive"></router-view>
		</transition>

	</div>
</template>

<script>
	import config from "./config/config.js"
	import VConsole from "vconsole"
	import 'vant/lib/index.css'
	export default {
		name: 'app',
		data: function() {
			return {
				transitionName: ""
			}
		},
		created: function() {
			if (config.isdebug) {
				new VConsole()
			}
		},
		watch:{
			'$route'(to, from) {
				const toTransitionIndex = to.meta.transitionIndex
				const fromTransitionIndex = from.meta.transitionIndex
				if(toTransitionIndex == fromTransitionIndex || !fromTransitionIndex){
					this.transitionName = ""
				}else{
					this.transitionName = toTransitionIndex > fromTransitionIndex ? 'slide-right' : 'slide-left'
				}
			}
		}
	}
</script>

<style>
	@import url("./assets/css/weui.min.css");
	
	html{
		height: 100%;
	}
	
	body{
		background: #f4f5fa;
		height: 100%;
	}
	
	
	*{
		-webkit-touch-callout:none;  /*系统默认菜单被禁用*/
		-webkit-user-select:none; /*webkit浏览器*/
		-khtml-user-select:none; /*早期浏览器*/
		-moz-user-select:none; /*火狐*/
		-ms-user-select:none;  /*IE10*/
		user-select:none;
	}
	
	
	input{
		-webkit-user-select: auto;
	}

	.page {
		display: flex;
		flex-direction: column;
		min-height: 100%;
		justify-content: space-between;
	}
	
	.page-body {
		width: 100%;
		-webkit-box-flex: 1;
		-ms-flex-positive: 1;
		flex-grow: 1;
		overflow-x: hidden;
	}

	#app {
		font-family: -apple-system-font,Helvetica Neue,sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		height: 100%;
	}

	.weui-btn_primary {
		background-color: #cbab6e;
	}

	.weui-btn_primary {
		background-color: #cbab6e;
	}

	.weui-btn_disabled {
		color: white;
		background-color: #E2E2E2;
	}

	.weui-btn_primary:not(.weui-btn_disabled):active {
		background: #cbab6e;
	}

	.custom-toast {
		top: 40%;
		left: 15%;
		right: 15%;
		padding: 7px;
		background-color: rgba(0, 0, 0, 0.7);
	}

	.child-view {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		transition: all .3s cubic-bezier(.55, 0, .1, 1);
	}

	.slide-left-enter,
	.slide-right-leave-active {
		opacity: 0;
		-webkit-transform: translate(-80px, 0);
		transform: translate(-80px, 0);
	}

	.slide-left-leave-active,
	.slide-right-enter {
		opacity: 0;
		-webkit-transform: translate(100%, 0);
		transform: translate(100%, 0);
	}
</style>