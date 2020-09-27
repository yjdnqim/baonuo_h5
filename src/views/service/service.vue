<template>
	<tabbarPage v-bind:selectedIndex="3" ref="tabbarPage">
		<servicePageContent />
	</tabbarPage>
	
</template>

<script>
	import tabbarPage from "@/components/common/tabbar/tabbarPage"
	import servicePageContent from "./servicePageContent"

	export default {
		components: {
			tabbarPage,
			servicePageContent
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
