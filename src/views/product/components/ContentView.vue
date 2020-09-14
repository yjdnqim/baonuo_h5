<!--
 * @Author: 极客James
 * @Motto: 求知若渴,虚心若愚
 * @Github: https://github.com/Geek-James/ddBuy
 * @掘金: https://juejin.im/user/5c4ebc72e51d4511dc7306ce
 * @LastEditTime: 2020-06-11 09:28:06
 * @Description: 分类模块->可滑动标题组件
 * @FilePath: /ddBuy-dev/src/views/category/components/ContentView.vue
 -->
<template>
	<div class="wrapper">
		<!-- 可滑动的标题 -->
		<div class="subTitleWrapper" ref="subTitleWrapper">
			<ul ref="ulContent">
				<li class="title" :class="{selected:currentSubTitle === index}" v-for="(detailItem,index) in categoriesDetailData" :key="detailItem.id" ref="subTitle" @click="subTitleClick(index)">
					{{detailItem.NAME}}
				</li>
			</ul>
		</div>
		<!-- 下拉菜单 -->
		<div class="showMenu" @click="menuClick" v-show="isShowDropMenu">
			<span class="downMenu" v-if="menuDown">
				<SvgIcon iconClass="down" style="width:1.5rem;height:1.5rem" />
			</span>
			<span class="upMenu" v-else>
				<SvgIcon iconClass="up" style="width:1.5rem;height:1.5rem" />
			</span>
		</div>
		<!-- 下拉菜单内容 -->
		<DropMenu :menuDown="!menuDown" :categoriesDetailData="categoriesDetailData" :currentSubTitle="currentSubTitle" @itemClick="itemClick" @touchClick="menuClick"></DropMenu>

		<!-- 商品内容列表 -->
		<section class="r_list" ref="r_list">
			<div ref="b">
				<div v-for="(it,index) in categoriesDetailData" :key="index" ref="good">
					<p class="productCategoryTitle">
						{{it.NAME}}
					</p>
					<ul>
						<li v-for="(item,index) in it.productList" :key="index" class="list " @click.stop="goToGoodsDetail(item)">
							<div class="list_item flex">
								<p>
									<img v-lazy="item.IMAGE" alt="">
								</p>
								<div>
									<p class="name">{{item.NAME}}</p>
									<p class="des">{{item.NAME}}</p>
									<p class="price">{{item.PRICE}}</p>
									<p class="originPrice">{{item.DISCOUNT_PRICE}}</p>
									<div class="iconCartWrapper" @click.stop="addToCart(item)">
										<SvgIcon iconClass="car" style="width:1.5rem;height:1.5rem"></SvgIcon>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<!-- <div class="bottomTip">{{$t('category.bottomTip')}}</div> -->
			</div>
		</section>
	</div>
</template>
<script>
	import '@/icons/svg/car.svg'
	import '@/icons/svg/up.svg'
	import '@/icons/svg/down.svg'
	
	import BScroll from 'better-scroll'
	import DropMenu from './DropMenu'
	import SvgIcon from '@/components/SvgIcon' // svg组件
	import {
		mapMutations,
		mapState
	} from 'vuex'

	export default {

		data() {
			return {
				scrollY: 0,
				currentSubTitle: 0,
				arrli: 0,
				flag: true,
				value: 0,
				menuDown: true,
				isShowDropMenu: false
			}
		},
		props: {
			categoriesDetailData: Array
		},
		components: {
			DropMenu,
			SvgIcon
		},
		mounted() {
			// 初始化更新滑动组件
			this.$nextTick(() => {
				this._initTitleScroll();
				this._initProductScroll();
				this._isShowDropMenu();
			});
		},
		computed: {
			...mapState(['userInfo'])
		},
		watch: {
			categoriesDetailData() {
				this.currentSubTitle = 0;
				this.menuDown = true;
				// 初始化更新滑动组件
				this.$nextTick(() => {
					this._initTitleScroll();
					this._initProductScroll();
					// 是否显示下拉菜单按钮
					this._isShowDropMenu();
				});
			}
		},
		methods: {
			// 0.延展Vuex的方法
			...mapMutations(['ADD_GOODS', 'ADD_TO_CART']),
			// 1.titleScroll 滚动初始化
			_initTitleScroll() {
				let contentWrapperWidth = 120;
				let el = this.$refs.subTitle;
				if(!el){
					return
				}
				for (let i = 0; i < el.length; i++) {
					contentWrapperWidth += el[i].clientWidth;
				}
				// 1.1给ul设置宽度,保证可以横向滚动
				this.$refs.ulContent.style.width = contentWrapperWidth + 'px';
				if (!this.titleScroll) {
					this.titleScroll = new BScroll('.subTitleWrapper', {
						probeType: 3,
						startX: 0,
						click: true,
						scrollX: true,
					});
				} else {
					this.titleScroll.refresh();
				}
			},
			// 2.产品列表滚动初始化
			_initProductScroll() {
				if (!this.productScroll) {
					this.productScroll = new BScroll(this.$refs.r_list, {
						click: true,
						probeType: 3
					})
				} else {
					this.productScroll.refresh();
					// 2.1 进入默认商品列表滚到顶部
					this.productScroll.scrollToElement(this.$refs.good[0], 10, 0, 0);
				}
			},
			// 3.处理点击subTitle的事件
			subTitleClick(index) {
				this.flag = true;
				// 3.0 判断如果蒙版存在 那么让它消失
				this.menuDown = true;
				// 3.1 让横向滑动到合适位置
				this.currentSubTitle = index;
				let el = this.$refs.subTitle[index];
				this.titleScroll.scrollToElement(el, 500);
				// 3.2 让产品列表根据点击的index值滚动
				this.arrli = index;
				this.productScroll.scrollToElement(this.$refs.good[index], 100, 0, 0);
				setTimeout(() => {
					this.flag = false;
				}, 100);
			},
			// 4.添加购物车
			...mapMutations({
				addToCart: 'ADD_TO_CART'
			}),
			// 5.点击下拉菜单
			menuClick() {
				this.menuDown = !this.menuDown;
			},
			// 6.处理点击蒙版里面的标题
			itemClick(index) {
				this.currentSubTitle = index;
				this.subTitleClick(index);
				// 让蒙版消失
				this.menuDown = false;
			},
			// 7.是否显示标题下拉按钮
			_isShowDropMenu() {
				// 如果标题超出则显示下拉框按钮
				let subTitleWrapperWidth = this.$refs.subTitleWrapper.clientWidth;
				let ulContentWidth = this.$refs.ulContent.clientWidth;
				this.isShowDropMenu = ulContentWidth > subTitleWrapperWidth ? true : false;
			},
			// 商品详情页面
			goToGoodsDetail(goods) {
				this.$router.push({
					path: "/productDetails",
					// 给商品详情页面传递数据
					query: goods
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	/**scrollTitle  CSS***/
	.wrapper {
		width: 100%;

		.subTitleWrapper {
			width: 100%;
			height: 2.8rem;
			display: inline-block;
			white-space: nowrap;
			border-bottom: solid 0.01rem #e8e9e8;
			overflow: hidden;
			position: fixed;
			z-index: 999;
			top: 0rem;
			background-color: white;

			.title {
				display: inline-block;
				font-size: 0.73rem;
				padding: 1rem;
			}

			.selected {
				color: #3cb963;
			}
		}

		.showMenu {
			position: fixed;
			width: 10%;
			height: 2.5rem;
			line-height: 2.5rem;
			right: -0.2rem;
			z-index: 1999;
			margin-top: 0.1rem;
			background-color: white;

			.menuIcon {
				width: 100%;
				height: 2.8rem;
			}
		}
	}

	.r_list {
		position: absolute;
		left: 5.2rem;
		right: 0;
		top: 2.9rem;
		bottom: 0rem;
		overflow: hidden;
		// 防止抖动
		-webkit-transform: translateZ(0);
		transform: translateZ(0);

		.productCategoryTitle {
			display: inline-block;
			font-size: 0.73rem;
			padding: 1rem;
			border-left: 3px solid #d9dde1;
			height: 0.32rem;
			width: 100%;
			font-size: 0.73rem;
			color: rgb(147, 153, 159);
			background-color: #f3f5f7;
			padding-left: 0.28rem;
		}

		.flex {
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.list {
			padding: 0.36rem 0.36rem 0 0.36rem;

			img {
				width: 4.0625rem;
				height: 4.0625rem;
				border-radius: 0.04rem;
				display: block;
				// 等比缩小图片来适应元素的尺寸
				background-size: contain;
				background-image: url("../../../assets/logo.png");
			}

			.list_item {
				justify-content: flex-start;
				border-bottom: 1px solid rgba(7, 17, 27, 0.1);
				padding-bottom: 1rem;
				position: relative;

				&>div {
					margin-left: 0.2rem;

					.name {
						font-size: 0.8375rem;
						line-height: 1rem;
						color: rgb(7, 17, 27);
						margin-bottom: 0.16rem;
					}

					.des,
					.sale {
						padding: 0.2rem;
						line-height: 0.8rem;
						font-size: 0.65rem;
						color: rgb(147, 153, 159);
						margin-bottom: 0.16rem;
					}

					.sale {
						margin-bottom: 0;

						span {
							margin-left: 0.24rem;
						}
					}

					.price {
						display: inline;
						font-size: 0.75rem;
						color: red;
					}

					.originPrice {
						display: inline;
						padding-left: 0.5rem;
						text-decoration: line-through;
						font-size: 0.6875rem;
						color: #b2b2b2;
					}

					.add {
						position: absolute;
						right: 0;
						bottom: 0.28rem;
					}

					.iconCartWrapper {
						position: absolute;
						width: 1.875rem;
						top: 3.4rem;
						right: 0.6rem;
					}

					.icon {
						fill: #999;
						width: 1rem;
						height: 1rem;
					}

					.iconCart {
						display: block;
						width: 1.5rem;
						height: 1.5rem;
					}
				}
			}
		}

		.bottomTip {
			padding-top: 0.8rem;
			color: grey;
			font-size: 0.6rem;
			text-align: center;
		}
	}
</style>
