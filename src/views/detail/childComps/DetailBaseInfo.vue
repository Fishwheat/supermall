<template>
	<div v-if="Object.keys(goods).length != 0">
		<div class="title">{{goods.title}}</div>
		<div class="price-wrap">
			<div class="new-price">{{goods.newPrice}}</div>
			<div class="old-price">{{goods.oldPrice}}</div>
			<div class="discount-desc" v-if="goods.discount">{{goods.discount}}</div>
		</div>
		<div class="other-info">
			<div>{{goods.columns[0]}}</div>
			<div>{{goods.columns[1]}}</div>
			<div>{{goods.services[goods.services.length-1].name}}</div>
		</div>
		<div class="serves-wrap">
			<div v-for="index in goods.services.length-1" :key="index"> 
				<img :src="goods.services[index-1].icon" alt=""> 
				{{goods.services[index-1].name}}
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'DetailBaseInfo',
		props: {
			goods: {
				type: Object,
				default() {
					return {}
				}
			}
		},
    created(){
      // console.log(this.goods);
    }
	}
</script>

<style scoped>
	.title {
		margin: 10px 0;
		padding: 0 4px;
		font-size: 14px;
		line-height: 20px;
    color: #111;
    font-weight: 600;
	}
	.price-wrap {
		display: flex;
		padding:0 4px 10px;
  }
	.price-wrap	.new-price {  
    font-size: 16px;
		color: #ff8198;
    border-radius: 8px;
    padding: 3px;
	}
	.price-wrap	.old-price {
			color: #999;
			font-size: 12px;
			margin: 0 4px;
			text-decoration: line-through;
      margin-top: 4px;
	}
	.price-wrap	.discount-desc {
			color: #fff;
			font-size: 12px;
			border-radius: 6px;
			background-color: red;
      padding: 1px 2px;
      height: 18px;
     
	}
	
	.other-info {
		display: flex;
		color: #999;
		font-size: 12px;
		padding: 10px 4px;
		border-bottom: 1px solid #ededed;
		border-top: 1px solid #ededed;
  }
	.other-info	div {
			flex: 1;
	}

	.serves-wrap {
		display: flex;
		font-size: 12px;
		color: #333;
		padding: 10px 4px;
		justify-content: space-between;
		border-bottom: 4px solid #ededed;
    }
	.serves-wrap	img {
			width: 12px;
			height: 12px;
			vertical-align: middle;
		}
	
</style>
