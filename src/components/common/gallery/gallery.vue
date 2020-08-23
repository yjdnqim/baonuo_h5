<template>
	<mainview id="mainView" ref="mainView">
		<div class="weui-gallery" style="display: block" @click="closeGallery">
			<span class="weui-gallery__img" :style="{backgroundImage: 'url(' + imgUrl + ')'}"></span>
		</div>
	</mainview>

</template>

<script>
	import mainview from "../../common/mainview/mainview"
	export default {
		name: "gallery",
		data: function() {
			return {
				istrue: true,
				imgUrl: ""
			}
		},
		components: {
			mainview
		},
		methods: {
			closeGallery() {
				this.$router.back(-1)
			}
		},
		mounted: function() {
			this.imgUrl = this.$route.query.imgUrl
			this.$refs.mainView.finishLoading()
		}
	}
</script>

<style scoped>
	.weui-gallery_show {
		display: block;
	}

	img {}
</style>
