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
		props:{
			selectedIndex: {
				selectedIndex: Number
			}
		},
		data: function() {
			return {
				tabBarList: [
					{
						text: "首页",
						icon: require("@/assets/img/home_icon.png"),
						selectedIcon: require("@/assets/img/home_icon_on.png"),
						targetPage: "home"
					},
					{
						text: "产品展示",
						icon: require("@/assets/img/product_icon.png"),
						selectedIcon: require("@/assets/img/product_icon_on.png"),
						targetPage: "product"
					},
					{
						text: "案例",
						icon: require("@/assets/img/case_icon.png"),
						selectedIcon: require("@/assets/img/case_icon_on.png"),
						targetPage: "case"
					},
					{
						text: "联系商家",
						icon: require("@/assets/img/service_icon.png"),
						selectedIcon: require("@/assets/img/service_icon_on.png"),
						targetPage: "service"
					},
					// {
					// 	text: "我的",
					// 	icon: require("@/assets/img/user_icon.png"),
					// 	selectedIcon: require("@/assets/img/user_icon_on.png"),
					// 	targetPage: "my"
					// },
				]
			}
		},
		methods: {
			onTabbarItemSelected: function(tabBarItem, index){
				if(this.selectedIndex == index){
					return
				}
				this.$router.push({path: "/" + tabBarItem.targetPage})
				this.$emit("onTabbarItemSelected", tabBarItem)
			}
		}
	}
</script>

<style>
</style>
