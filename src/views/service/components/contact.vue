<template>
	<div class="wrap_contact">
		<p>长按二维码微信联系</p>
		<img class="qrcode" :src="contactData.wechat" />
		<p>或拨打电话</p>
		<p><a class="tel" :href="'tel:' + contactData.tel">{{contactData.tel}}</a></p>
	</div>
</template>

<script>
	export default {
		props: {
			contactData: Object
		}
	}
</script>

<style scoped>
	.wrap_contact {
		text-align: center;
		padding: 40px;
	}

	.wrap_contact p {
		font-size: 14px;
		color: #999999;
		line-height: 30px;
	}

	.tel{
		font-size: 18px;
		color: #009688;
		font-weight: bold;
	}

	.wrap_contact .qrcode {
		width: 70%;
	}
</style>
