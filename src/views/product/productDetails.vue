<template>
	<mainview id="mainView" ref="mainView">
		<div class="page">
			<div  class="page-body">
				
			</div>
		</div>
		
	</mainview>
</template>

<script>
	import mainview from "@/components/common/mainview/mainview"
	
	export default {
		components: {
			mainview
		},
		props:{
			selectedIndex: Number
		},
		created: function() {
	
		},
		mounted: function() {
			this.$refs.mainView.finishLoading()
		},
		
		methods: {
			
		}
	}
</script>

<style>
</style>
