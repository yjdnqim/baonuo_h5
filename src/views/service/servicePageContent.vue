<template>
	<div style="margin-top: 80px;">
		<contact :contactData="contactData" />
	</div>
</template>

<script>
	import contact from "./components/contact"
	export default {
		components:{
			contact
		},
		
		data: function(){
			return {
				contactData: {}
			}
		},
		
		mounted: function(){
			var $this = this
			this.$jsonp({
				loadingText: "请稍候...",
				action: "/global/getValueForKey",
				params: {
					GLOBAL_KEY: "h5_contact_data"
				},
				success: function(result) {
					$this.contactData = result.data
				},
				error: function(error) {
					$this.$toast(error.statusText)
				}
			})
		}
	}
</script>

<style>
</style>
