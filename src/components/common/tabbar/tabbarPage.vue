<template>
	<mainview id="mainView" ref="mainView">
		<div class="page">
			<div  class="page-body">
				<slot></slot>
			</div>
			<div style="height: 60px; background: black;"></div>
		</div>
		<tabbar ref="tabbar" class="tabbar-bottom" v-bind:selectedIndex="selectedIndex"></tabbar>
	</mainview>
	
</template>

<script>
	import mainview from "../mainview/mainview"
	import tabbar from "../../common/tabbar/tabbar"

	export default {
		components: {
			mainview,
			tabbar
		},
		props:{
			selectedIndex: Number
		},
		created: function() {

		},
		mounted: function() {
			
		},
		
		methods: {
			finishLoading:function(){
				this.$refs.mainView.finishLoading()
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

