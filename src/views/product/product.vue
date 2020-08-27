<template>
	<tabbarPage v-bind:selectedIndex="1" ref="tabbarPage"><productPageContent /></tabbarPage>
	
</template>

<script>
	import tabbarPage from "@/components/common/tabbar/tabbarPage"
	import productPageContent from "./productPageContent"

	export default {
		components: {
			tabbarPage,
			productPageContent
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
