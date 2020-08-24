<template>
	<div>
		<Slider v-bind:autoPlay="false" v-bind:interval="5000" height="180px" v-bind:control-btn= "false">
			<SliderItem @click="onImageClick(item)" v-for="(item, index) in adList" :key="index">
				<img v-bind:src="item.IMG_URL" />
			</SliderItem>
		</Slider>
		<div @click="onAddressClick" class="weui-panel__bd">
			<div class="weui-media-box weui-media-box_small-appmsg">
				<div class="weui-cells">
					<a class="weui-cell weui-cell_active weui-cell_access weui-cell_example" href="javascript:">
						<div class="weui-cell__hd"><img src="../../assets/img/location_icon.png" alt="" style="width: 20px; height: 20px; margin-right: 10px; display: block;"></div>
						<div class="weui-cell__bd weui-cell_primary">
							<p>{{homeData.location ? homeData.location.address : ""}}</p>
						</div>
						<span class="weui-cell__ft"></span>
					</a>
				</div>
			</div>
		</div>
		<div class="weui-panel__hd">品牌介绍</div>
		<div class="img-list">
			<img @click="onImageClick(item)" v-for="(item, index) in homeData.imgLsit" :key="index" v-bind:src="item" />
		</div>
	</div>
</template>

<script>
	
	import { Slider, SliderItem } from 'vue-easy-slider'

	export default {
		components: {
			Slider,
			SliderItem
		},
		data: function() {
			return {
				adList: [],
				homeData: {}
			}
		},
		mounted: function(){
			var $this = this
			this.$get({
				loadingText: "请稍候...",
				action: "/ad/getAdList",
				params: null,
				success: function(result) {
					$this.adList = result.data
				},
				error: function(error) {
					$this.$toast(error.statusText)
				}
			})
			
			this.$get({
				loadingText: "请稍候...",
				action: "/global/getHomeData",
				params: null,
				success: function(result) {
					$this.homeData = result.data
				},
				error: function(error) {
					$this.$toast(error.statusText)
				}
			})
		},
		methods: {
			onImageClick: function(item) {
				location.href = item.LINK
			},
			onAddressClick: function() {
				
			}
		}
	}
</script>

<style scoped>
	img {
		width: 100%;
		height: 100%;
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

	.weui-gallery__opr {
		display: none;
	}
</style>
