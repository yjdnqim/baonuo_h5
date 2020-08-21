<template>
	<div class="main-view">
		<div class="loading-view" v-if="isShowLoading">
			<i class="weui-loading"></i>
			<p style="">请稍候</p>
		</div>
		<errorview ref="errorView"></errorview>
		<div class="content-view" :style="{display : isShowLoading ? 'none' : ''}">
			<slot v-if="!hidden"></slot>
		</div>
	</div>
</template>

<script>
	import errorview from "../errorview/errorview.vue"


	export default {
		name: 'mainview',
		data: function() {
			return {
				hidden: false,
				isShowLoading: true,
				isShowSnow: false,
				style: null
			}
		},
		components: {
			errorview
		},

		mounted: function() {

		},

		methods: {
			finishLoading: function() {
				this.isShowLoading = false;
			},
			showErrorView: function(iconType, iconSource, message) {
				this.finishLoading();
				this.hidden = true;
				this.$refs.errorView.show(iconType, iconSource, message);
			}
		}
	}
</script>

<style scoped>
	.main-view{
		height: 100%;
	}
	.content-view{
		height: 100%;
	}
	.loading-view{
		padding-top: 35vh;
		text-align: center;
	}
	.loading-view .weui-loading{
		width: 25px;
		height: 25px;
	}
	.loading-view p{
		margin-top: 10px; 
		font-size: 12px; 
		color: #666
	}
</style>
