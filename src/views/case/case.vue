<template>
	<tabbarPage v-bind:selectedIndex="2" ref="tabbarPage">
		<casePageContent />
	</tabbarPage>

</template>

<script>
	import tabbarPage from "@/components/common/tabbar/tabbarPage"
	import casePageContent from "./casePageContent"

	export default {
		components: {
			tabbarPage,
			casePageContent
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
