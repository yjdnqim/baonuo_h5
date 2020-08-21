<template>
	<div class="weui-tabbar">
		<a href="javascript:;" v-bind:class="{'weui-tabbar__item': true, 'weui-bar__item_on': selectedIndex == index}" v-for="(tabBarItem, index) in tabBarList" :key="index" @click="onTabbarItemSelected(tabBarItem, index)">
			<img v-bind:src="selectedIndex == index ? tabBarItem.selectedIcon : tabBarItem.icon" alt="" class="weui-tabbar__icon">
			<p class="weui-tabbar__label">{{tabBarItem.text}}</p>
		</a>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				tabBarList: [
					{
						text: "首页",
						icon: require("@/assets/logo.png"),
						selectedIcon: require("@/assets/img/icon-car.jpg")
					},
					{
						text: "产品展示",
						icon: require("@/assets/logo.png"),
						selectedIcon: require("@/assets/img/icon-car.jpg")
					},
					{
						text: "案例",
						icon: require("@/assets/logo.png"),
						selectedIcon: require("@/assets/img/icon-car.jpg")
					},
					{
						text: "客服",
						icon: require("@/assets/logo.png"),
						selectedIcon: require("@/assets/img/icon-car.jpg")
					},
					{
						text: "我的",
						icon: require("@/assets/logo.png"),
						selectedIcon: require("@/assets/img/icon-car.jpg")
					},
				],
				selectedIndex: 0
			}
		},
		methods: {
			onTabbarItemSelected: function(tabBarItem, index){
				this.selectedIndex = index
				this.$emit("onTabbarItemSelected", tabBarItem, index);
			}
		}
	}
</script>

<style>
</style>
