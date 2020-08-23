<template>
	<tabbarPage v-bind:selectedIndex="4" ref="tabbarPage"></tabbarPage>
	
</template>

<script>
	import tabbarPage from "./common/tabbar/tabbarPage"

	export default {
		components: {
			tabbarPage
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
