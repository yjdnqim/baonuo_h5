<template>
	<div class="case-item">
		<div class="line-1">
			<van-image class="avator" :round="true" width="20px" height="20px" src="http://resource.yjdnqim.com/2020_09_10_1599719955478.jpg" />
			<span class="case-name">{{caseData.NAME}}</span>
			<span class="case-time">{{caseData.TIME}}</span>
		</div>
		<div class="case-remark">{{caseData.REMARK}}</div>
		<van-row class="case-image" v-if="caseData.caseImageList && caseData.caseImageList.length > 0">
			<van-col style="padding: 5px;" v-for="(item, index) in caseData.caseImageList" :key="index" span="6"><img :src="item.IMAGE" @click="onCaseImageClick(index)"/></van-col>
		</van-row>
		<P class="case-address">安装地址：{{caseData.ADDRESS}}</P>
	</div>
</template>

<script>
	import Vue from 'vue';
	import {
		ImagePreview,
		Image as VanImage,
		Col,
		Row
	} from 'vant';

	Vue.use(VanImage);
	Vue.use(Col);
	Vue.use(Row);

	export default {
		components: {

		},
		props: {
			caseData: Object
		},
		created: function() {

		},
		computed:{
			caseImageList: function(){
				var imgList = []
				for (var i = 0; i < this.caseData.caseImageList.length; i++) {
					imgList.push(this.caseData.caseImageList[i].IMAGE)
				}
				return imgList
			}
		},
		methods: {
			onCaseImageClick: function(index){
				ImagePreview({
					images: this.caseImageList,
					startPosition: index
				})
			}
		}
	}
</script>

<style scoped>
	.case-item{
		padding: 5px;
	}
	.case-item .line-1 {
		padding: 5px;
		line-height: 24px;
		font-size: 12px;
	}

	.line-1 .avator {
		vertical-align: middle;
		margin-right: 6px;
	}

	.line-1 span {
		vertical-align: middle;
		margin-right: 6px;
	}

	.line-1 .case-name {
		color: #262626;
	}

	.line-1 .case-time {
		float: right;
		color: #999;
	}

	.case-item .case-remark {
		margin: 10px 5px;
		font-size: 13px;
		font-size: 1.5;
	}
	.case-item .case-image img{
		width: 100%;
		height: 80px;
		background-position: center;
	}
	
	.case-item .case-address{
		color: #262626;
		font-size: 12px;
		padding: 5px;
	}
</style>
