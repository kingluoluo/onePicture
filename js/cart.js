'use strict';
//购物车添加
$(function(){
	var addGoods = {
		init: function(){
			this.goPay = $('.go-pay');//立即购买按钮
			this.noGoodsTime = $('.noGoods');	//没有商品时
			this.goodsShow = $('.cart-main');	//商品展示区
			this.goIndexBtn = $('goIndexBtn');	//去主页购物
			//调用
			this.goPayClick();
			this.initGoods();
			this.delet();
			this.goIndexs();
			
		},
		//获取cookie
		getCookie: function(){
			this.addGoods = $.cookie('opCart') || '{}';
			this.addGoods = JSON.parse( this.addGoods );
			console.log($.cookie('opCart') || '{}');
		},
		//设置cookie
		setCookie:function(){
			$.cookie('opCart',JSON.stringify( this.addGoods ),{expirs: 7,path:'/'});
		},
		//初始化购物车数据
		initGoods: function(){
			var that = this;
			$.getJSON('js/goods.json',function(result){	//	获取json
				that.getCookie();	//获取cookie
				//that.noGoodsTime.hide();
				for( var key in that.addGoods ){
					//key某个商品id
					(function( key ){
						var addgoodsItem = $('<div class="goods-item"></div>');
						addgoodsItem.load('goodsCart.html',function(){
							console.log(key);
							addgoodsItem.find('.cart-goods-item').attr('data-id',parseInt( result[key]['goods-id'] ));
							addgoodsItem.find('.goods-name span').html('商品编号：' + result[key]['goods-id'] );
							addgoodsItem.find('.goodsStyleHtml').html( result[key]['goods-style'] + "|" + that.addGoods[key]['goodsnum'] + "个" );
							addgoodsItem.find('.goodsPrice').html( (result[key]['goods-price']).toFixed(2));
							addgoodsItem.find('.goodsMoney').html((result[key]['goods-price']).toFixed(2));
							
							console.log( result[key]['goods-id'] );
							//console.log( ('.cart-goods-item').data('id') );
							$('.cart-main-content').append(addgoodsItem);
						})
					})(key);//闭包
				}
			});
		},
		//去主页
		goIndexs: function(){
			this.goIndexBtn.click(function(){
				window.location.herf = 'index.html';
			});
		},
		//立即支付按钮点击事件
		goPayClick: function(){
			this.goPay.click(function(){
				console.log('成功支付');
				//window.location.href = 'index.html';
			});
		},
		//删除按钮点击事件
		delet:function(){
			var that = this;
			$('.cart-wrapper').on('click','.td-option a',function(){
				console.log('确定要删除宝贝吗？');
				var goodsId = $(this).parents('.cart-goods-item').data('id');
				console.log( $(this).parents('.cart-goods-item').data('id') );
				if( confirm('确定要删除宝贝吗？') ){
					delete that.addGoods[goodsId];
					$(this).parents('.goods-item').remove();
					that.setCookie();
					
				}
			});
			
		},
		//判断购物车中是否有商品
		hasGoods: function(){
			
		},
		/*
		 init: function(){
			this.goPay = $('.go-pay');//立即购买按钮
			this.cartItem = $('.cart-main-content');
			this.deletBtn = $('.td-option');
			this.selectAllBtn = $('.td-checkbox .checke,.content-title .checke,.options-item .checke');
			this.cart = null;
		},
		initGoods: function(){
			var that = this;
			$.getJSON('js.data.json',function(result){
				
			});
		},
		//立即支付按钮点击事件
		goPayClick: function(){
			this.goPay.click(function(){
				window.location.href = 'index.html';
			});
		},
		//删除按钮点击事件
		delet:function(){
			var that = this;
			$('.cart-main-content').on('click','.td-option a',function(){
				var goodsId = $(this).parents('.cart-main-content').data("id");
				console.log('删除');
				if( confirm('确定要删除宝贝吗？') ){
					delete that.cart[goodsId];
					$(this).parents('.cart-main-content').parent().remove();
					that.setCookie();
				}
			});
			this.deletBtn.click(function(){
				$(this).partents('.cart-main-content').
			});
		};
		//读取cookie
		getCookie:function(){
			this.cart = $.cookie('op-cart') || '{}';
			this.cart = JSON.parse( this.cart );
		},
		//设置cookie
		setCookie:function(){
			$.cookie('op-cart',JSON.stringfy( this.cart ),{expirs: 7,path:'/'});
		},
		 * */
	};
	addGoods.init();
});