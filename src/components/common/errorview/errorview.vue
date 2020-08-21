<template>
	<div class="error-view" v-if="!hidden">
		<img v-if="iconType == 'img'" v-bind:src="iconSource" />
		<i v-if="iconType == 'class'" v-bind:class="iconSource"></i>
		<p class="msg">{{ message }}</p>
	</div>
</template>

<script>
	export default {
		name: 'errorview',
		data: function() {
			return {
				hidden: true,
				iconType: "",
				iconSource: "",
				message: ""
			}
		},
		methods: {
			show: function(iconType, iconSource, message) {
				this.hidden = false;
				this.iconType = iconType;
				this.iconSource = iconSource;
				this.message = message;
			},
			close: function() {
				this.hidden = true;
			}
		}
	}
</script>

<style>
	.error-view {
		text-align: center;
		padding-top: calc(50vh - 120px);
	}

	.error-view img {
		width: 80px;
	}

	.error-view i {
		color: #cbab6e;
		height: 70px;
		width: 70px;
	}
	
	.error-view .msg{
		margin: 10px;
		word-wrap: break-word
	}

	
</style>
