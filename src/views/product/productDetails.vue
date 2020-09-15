<template>
	<mainview id="mainView" ref="mainView">
		<div class="page">
			<div class="page-body">
				<div>
					<img class="product-image" v-bind:src="productDetails.IMAGE" />
				</div>

				<div class="priceWrap">
					<span class="price large_size" id="priceSale">¥<em>{{productDetails.PRICE.split(".")[0]}}</em><span class="price_decimals">{{priceDecimals}}</span></span>
					<p class="originPrice">{{productDetails.DISCOUNT_PRICE}}</p>
					<p class="sales">销量：<em>{{productDetails.TOTAL_SALES}}</em></p>
					<p class="product-name">{{productDetails.NAME}}</p>
					<p class="product-remark">{{productDetails.REMARK}}</p>
				</div>
				<div class="weui-cells weui-cells_form" v-if="productDetails.DISCOUNT && productDetails.DISCOUNT.length > 0">
					<div class="weui-panel__hd">优惠信息</div>
					<div class="weui-cell">
						<div class="weui-cell__bd">
							{{productDetails.DISCOUNT}}
						</div>
					</div>
				</div>
				<div class="weui-cells weui-cells_form">
					<div class="weui-panel__hd">规格参数</div>
					<div class="weui-cell">
						<div class="weui-cell__bd">
							<table cellpadding="0" cellspacing="1" width="100%" border="0">
								<tr v-for="(item, index) in productSpec" :key="index"><td style="width: 120px;">{{item.name}}</td><td>{{item.value}}</td></tr>
							</table>
						</div>
					</div>
				</div>
				<div class="weui-cells weui-cells_form">
					<div class="weui-panel__hd">商品介绍</div>
					<div class="img-list">
						<img @click="onImageClick(item, index)" v-for="(item, index) in productImgs" :key="index" v-bind:src="item" />
					</div>
				</div>
			</div>
		</div>
	</mainview>
</template>

<script>
	import mainview from "@/components/common/mainview/mainview"
	import { ImagePreview } from 'vant'

	export default {
		components: {
			mainview
		},
		data: function() {
			return {
				productDetails: {
					"IS_DELETED": 0,
					"EDIT_TIME": "2020-09-14 11:25:59",
					"PRICE": "300.00",
					"VIEW_COUNT": 0,
					"IS_OFF_SHELVES": 0,
					"DISCOUNT_PRICE": "250.00",
					"THUMBNAIL": "http://resource.yjdnqim.com/2020_09_10_1599719962250.jpg",
					"TOTAL_SALES": 0,
					"PRODUCT_ID": "172333e41ee344eab6c992f881c504fd",
					"EXT_FIELD_3": "",
					"NAME": "测试产品6",
					"MONTH_SALES": 0,
					"OPTION_PERSON": "系统管理员",
					"EXT_FIELD_2": "",
					"IMAGE": "http://resource.yjdnqim.com/2020_09_10_1599719955478.jpg",
					"EXT_FIELD_1": "",
					"CREATE_TIME": "2020-09-10 14:39:38",
					"REMARK": "测试产品6测试产品6测试产品6",
					"SPEC": "[{\"name\":\"1\",\"value\":\"1\"}]"
				}
			}
		},
		computed: {
			productImgs: function() {
				return this.productDetails.THUMBNAIL.split(",")
			},
			priceDecimals: function() {
				return "." + this.productDetails.PRICE.split(".")[1]
			},
			productSpec: function(){
				return JSON.parse(this.productDetails.SPEC)
			}
		},
		created: function() {

		},
		mounted: function() {
			var productId = this.$route.query.productId
			var $this = this
			this.$jsonp({
				loadingText: "请稍候...",
				action: "/product/getProductById",
				params: {
					PRODUCT_ID: productId
				},
				success: function(result) {
					$this.$refs.mainView.finishLoading()
					if (result.code == 0) {
						$this.productDetails = result.data
						
					}
				},
				error: function(error) {
					$this.$refs.mainView.finishLoading()
					$this.$toast(error.statusText)
				}
			})

		},

		methods: {
			onImageClick: function(item, index){
				ImagePreview({
					images: this.productImgs,
					startPosition: index
				})
			},
		}
	}
</script>

<style scoped="scoped">
	.page {
		background: #f2f2f2;
	}

	img {
		width: 100%;
		height: 100%;
	}
	
	.img-list img {
		display: block;
	}

	.priceWrap {
		background: white;
		padding: 10px;
	}

	.priceWrap .price {
		font-size: 16px;
		line-height: 30px;
		color: #f2270c;
		display: inline-block;
	}

	.priceWrap .originPrice {
		display: inline;
		padding-left: 0.5rem;
		text-decoration: line-through;
		font-size: 0.6875rem;
		color: #b2b2b2;
	}

	.priceWrap .sales {
		float: right;
		line-height: 30px;
		color: #07111b;
		font-size: 14px;
	}

	.priceWrap .sales em {
		color: #f2270c;
		font-style: normal;
		font-weight: bold;
	}

	.price em {
		font-size: 30px;
		font-style: normal;
		font-weight: bold;
	}

	.price .price_decimals {
		font-weight: bold;
	}

	.priceWrap .product-name {
		font-size: 16px;
		font-weight: bold;
		margin-top: 15px;
	}

	.priceWrap .product-remark {
		font-size: 14px;
		color: #8c8c8c;
	}

	.weui-panel__hd {
		padding: 10px;
		color: rgba(0, 0, 0, .9);
		font-size: 15px;
		font-weight: 700;
		position: relative;
	}

	.weui-cells {
		margin-top: 10px;
		font-size: 14px;
		line-height: 20px;
		color: #666;
	}

	.weui-cell {
		padding: 10px;
		position: relative;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: initial;
	}

	.weui-label {
		width: 80px;
		font-weight: bold
	}
</style>
