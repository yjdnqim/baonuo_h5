<template>
	<div>
		<div class="weui-panel__hd">案例介绍</div>
		<div class="img-list">
			<img @click="onImageClick(item, index)" v-for="(item, index) in caseImageList" :key="index" v-bind:src="item.IMAGE" />
		</div>
	</div>
</template>

<script>
	import { ImagePreview } from 'vant'
	export default {
		data: function() {
			return {
				caseImageList: []
			}
		},
		
		computed:{
			caseImageArray: function(){
				var imgList = []
				for (var i = 0; i < this.caseImageList.length; i++) {
					imgList.push(this.caseImageList[i].IMAGE)
				}
				return imgList
			}
		},
		
		mounted: function(){
			var $this = this
			//产品案例
			this.$jsonp({
				loadingText: "请稍候...",
				action: "/case/getCaseImageList",
				params: {
					IS_SHOW: 1
				},
				success: function(result) {
					
					if (result.code == 0) {
						$this.caseImageList = result.data
					}
				},
				error: function(error) {
					$this.$toast(error.statusText)
				}
			})
		},
		
		methods: {
			onImageClick: function(item, index){
				ImagePreview({
					images: this.caseImageArray,
					startPosition: index
				})
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
</style>
