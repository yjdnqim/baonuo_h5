<template>
	<div>
		<div class="img-list">
			<img @click="onImageClick(item)" v-for="(item, index) in productTypeList" :key="index" v-bind:src="item.IMG_URL" />
		</div>
	</div>
</template>

<script>
	export default {
		data: function() {
			return {
				productTypeList: [{
						IMG_URL: "https://sslcdn.uboche.com/20191225/5e031504cd832.jpg"
					},
					{
						IMG_URL: "https://sslcdn.uboche.com/20191225/5e031504cd832.jpg"
					},{
						IMG_URL: "https://sslcdn.uboche.com/20191225/5e031504cd832.jpg"
					},
					{
						IMG_URL: "https://sslcdn.uboche.com/20191225/5e031504cd832.jpg"
					},{
						IMG_URL: "https://sslcdn.uboche.com/20191225/5e031504cd832.jpg"
					},
					{
						IMG_URL: "https://sslcdn.uboche.com/20191225/5e031504cd832.jpg"
					}
				]
			}
		},
		methods: {
			onImageClick: function(item) {
				this.$router.push({
					path: "/gallery",
					query: {
						imgUrl: item.IMG_URL
					}
				})
			}
		}
	}
</script>

<style scoped>
	img {
		width: 100%;
	}

	.img-list img {
		display: block;
	}
</style>
