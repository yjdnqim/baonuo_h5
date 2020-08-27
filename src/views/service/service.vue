<template>
	<tabbarPage v-bind:selectedIndex="3" ref="tabbarPage"></tabbarPage>
	
</template>

<script>
	import tabbarPage from "@/components/common/tabbar/tabbarPage"

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
