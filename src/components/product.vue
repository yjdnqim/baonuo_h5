<template>
	<tabbarPage v-bind:selectedIndex="1" ref="tabbarPage"><productTypeList /></tabbarPage>
	
</template>

<script>
	import tabbarPage from "./common/tabbar/tabbarPage"
	import productTypeList from "./product/productTypeList"

	export default {
		components: {
			tabbarPage,
			productTypeList
		},
		created: function() {

		},
		mounted: function() {
			this.$refs.tabbarPage.finishLoading()
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	
</style>
