<template>
	<tabbarPage v-bind:selectedIndex="0" ref="tabbarPage"><homePageContent /></tabbarPage>
</template>

<script>
	import tabbarPage from "@/components/common/tabbar/tabbarPage"
	import homePageContent from "../home/homePageContent"

	export default {
		components: {
			tabbarPage,
			homePageContent
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
