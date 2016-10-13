'use strict';
/*商品详情页left图片切换*/
$(function(){
	console.log('加载js成功');
	var leftImg = {
		init: function(){
			this.bigImg = $('.printImg img');		//大图
			this.smallImg = $('.printSImg li');	//小图

			//调用
			this.imgActive();
		},
		imgActive: function(){
			var that = this;
			this.smallImg.mouseenter(function() {
				$(this).addClass('imgShadow').siblings().removeClass('imgShadow');
				var index = $(this).index();
				console.log('鼠标滑过第'+ index + '张图片');
				$('.printImg img').eq(index).addClass('imgZIndex').siblings().removeClass('imgZIndex');
			});
		},
	};
	leftImg.init();
});
/*商品详情页right*/

$(function(){
	var rightStyle = {
		init: function(){
			this.item = $('.addPrintPaper .item a');	//（亚克力。。）style选项
			this.itemNum = $('.addPrintNum .item a');	//数量
			this.file = $('.addPrintFile li');
			this.addBuy = $('.add_buy');		//立即购买
			this.addCart = $('.add_cart');		//加入购物车

			this.itemClick();
			this.itemNumClick();
			this.fileClick();
			this.addBuyCilck();
			this.addCartClick();
		},
		//item点击（亚克力。。）
		itemClick: function(){
			this.item.click(function(event) {
				$(this).addClass('on').parent().siblings().find('a').removeClass('on');
				console.log( parseInt( $(this).data('type') ) );
				return parseInt( $(this).data('type') );
			});
		},
		//itemNum点击
		itemNumClick: function(){
			this.itemNum.click(function(event) {
				console.log('您选择了'+ $(this).html());
				$(this).addClass('on').parent().siblings().find('a').removeClass('on');
				console.log( parseInt( $(this).html() ) );
				return parseInt( $(this).html() );
			});
		},
		//file选择
		fileClick: function(){
			this.file.click(function(event) {
				$(this).addClass('on').siblings().removeClass('on');
				console.log( $(this).find('p').html() );
				return;
			});
		},
		//立即购买
		addBuyCilck: function(){
			var that = this;
			this.addBuy.click(function(){
				that.setCookie();
				window.location.href = 'cart.html';
			});
		},
		//加入购物车
		addCartClick: function(){
			var that = this;
			this.addCart.click(function(){
				/*
				 //判断所有验证是否合法
				var flag = true;
				for( var key in rightStyle ){
					if( ! that.rightStyle[key] ){
						flag = false;
						break;
					}
				}
				if( !flag ){
					alert('部分数据不合法');
					return;
				}
				 * */
				that.setCookie();
				console.log("加入购物车成功");
			});
		},
		//上传cookie
		setCookie: function(){
			var rightStyle = $.cookie('opCart') || '{}';
			rightStyle = JSON.parse(rightStyle);
			var goodsId = parseInt( $('.addPrintPaper .item .on').data('type') );	
			//console.log( $('.addPrintNum .item .on').html() );
			var goodsnum = parseInt( $('.addPrintNum .item .on').html() );	 //数量
			if( !rightStyle[goodsId] ){
				rightStyle[goodsId] = {
					goodsId: goodsId,
					goodsnum: goodsnum
				}
			}else{
				rightStyle[goodsId].goodsnum += goodsnum;
			}
			$.cookie('opCart',JSON.stringify( rightStyle ),{expires: 7,path:'/'});
			console.log(JSON.parse( $.cookie('opCart') ));
			console.log( 'goodsId' + goodsId );
			console.log( goodsnum );
		},
	};
	rightStyle.init();
});
//城市选择
$(function(){
	var changeCity = {
		init: function(){
			
		},
	};
	changeCity.init();
});
