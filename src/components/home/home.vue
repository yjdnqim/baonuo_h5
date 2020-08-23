<template>
	<div>
		<Swiper v-bind:autoPlay="true" v-bind:interval="5000">
			<Slide @click="onImageClick(item)" v-for="(item, index) in adList" :key="index">
				<img v-bind:src="item.IMG_URL" />
			</Slide>
		</Swiper>
		<div class="weui-panel__bd">
			<div class="weui-media-box weui-media-box_small-appmsg">
				<div class="weui-cells">
					<a class="weui-cell weui-cell_active weui-cell_access weui-cell_example" href="javascript:">
						<div class="weui-cell__hd"><img src="../../assets/img/location_icon.png" alt="" style="width: 20px; height: 20px; margin-right: 10px; display: block;"></div>
						<div class="weui-cell__bd weui-cell_primary">
							<p>{{homeData.address}}</p>
						</div>
						<span class="weui-cell__ft"></span>
					</a>
				</div>
			</div>
		</div>
		<div class="weui-panel__hd">品牌介绍</div>
		<div class="img-list">
			<img @click="onImageClick(item)" v-for="(item, index) in homeData.imgLsit" :key="index" v-bind:src="item.IMG_URL" />
		</div>
	</div>
</template>

<script>
	import {
		Swiper,
		Slide
	} from 'vue-swiper-component'

	export default {
		components: {
			Swiper,
			Slide
		},
		data: function() {
			return {
				adList: [{
						IMG_URL: "https://sslcdn.uboche.com/20191225/5e031504cd832.jpg"
					},
					{
						IMG_URL: "https://sslcdn.uboche.com/20191225/5e031504cd832.jpg"
					}
				],
				homeData: {
					address: "公司地址",
					imgLsit: [{
						IMG_URL: "https://sslcdn.uboche.com/20191225/5e031504cd832.jpg"
					}, {
						IMG_URL: "https://sslcdn.uboche.com/20191225/5e031504cd832.jpg"
					}, {
						IMG_URL: "https://sslcdn.uboche.com/20191225/5e031504cd832.jpg"
					}, {
						IMG_URL: "https://sslcdn.uboche.com/20191225/5e031504cd832.jpg"
					}]
				}
			}
		},
		methods: {
			onImageClick: function(item) {
				this.$router.push({path: "/gallery", query:{imgUrl: item.IMG_URL} })
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

	.weui-cell {
		padding: 10px;
		position: relative;
		display: flex;
		align-items: center;
	}

	.weui-panel__hd {
		background-color: white;
		font-size: 20px;
	}
	.weui-gallery__opr{
		display: none;
	}
</style>
