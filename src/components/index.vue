<template>
	<mainview id="mainView" ref="mainView">
		<div class="page">
			<div  class="page-body">
				<homePage v-if="pageIndex == 0"/>
				<productTypeListPage v-if="pageIndex == 1"/>
				
			</div>
			<div style="height: 60px; background: black;"></div>
		</div>
		
		<tabbar class="tabbar-bottom" @onTabbarItemSelected="onTabbarItemSelected"></tabbar>
	</mainview>
	
</template>

<script>
	import mainview from "./common/mainview/mainview"
	import tabbar from "./common/tabbar/tabbar"
	import homePage from "./home/home"
	import productTypeListPage from "./product/productTypeList"

	export default {
		name: 'index',
		components: {
			mainview,
			tabbar,
			homePage,
			productTypeListPage,
		},
		data: function(){
			return {
				pageIndex: 0
			}
		},
		created: function() {

		},
		mounted: function() {
			this.$refs.mainView.finishLoading()
		},
		methods:{
			onTabbarItemSelected: function(tabBarItem, selectedIndex){
				this.pageIndex = selectedIndex
				document.title = tabBarItem.text
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.page-body{
		
	}
	.tabbar-bottom{
		position: fixed;
		width: 100%;
		bottom: 0;
	}
</style>
