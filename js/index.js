'use strict';
//地址
$(function(){
	var areaList = {
		init: function(){
			this.parentBox = $('.header-leftBox');
			this.spanVal = $('.header-address');
			this.divBox = $('.header-left');
			this.AreaList = $('.AreaList');	//区域范围
			this.lis = $('.AreaList-ul li');
			this.ucBox = $('.userCenter-wrapper');
			this.uc = $('.UserCenter');
			this.ucCon = $('.UserCenterSelect');
			this.cartBox = $('.cart-li-wrapper');

			this.downActive();
			this.cityColor();
			//this.cityActive();
			
			this.ucClick();
			this.cartClick();
		},
		//鼠标滑动效果
		downActive: function(){
			var that = this;
			this.parentBox.mouseenter(function(){
				//console.log(1);
				that.AreaList.slideDown(150);
				that.divBox.addClass('header-left-change');
				$(this).find('span').addClass('change-span-bg');
			});
			this.parentBox.mouseleave(function(){
				//console.log(2);
				that.AreaList.slideUp(150);
				that.divBox.removeClass('header-left-change');
				$(this).find('span').removeClass('change-span-bg');
			});

		},
		//其他城市li颜色
		cityColor: function(){
			this.lis.click(function(){
				$(this).addClass('select').siblings().removeClass('select');
				var aIndex = $(this).index();
				//console.log( aIndex );
				//console.log( $('.AreaList-ul li').eq(aIndex).find('a').attr('cityName') );
				$('.header-address').text( function(){
					return  $('.AreaList-ul li').eq(aIndex).find('a').attr('cityName');
				} );
			});
		},
		changeCity: function(){
			//console.log(1);
			$('.header-address').text(function(){
				return that.attr('cityName');
			});
		},
		ucClick: function(){
			this.ucBox.hover(function(){
				$(this).addClass('header-address-change');
				$('.UserCenterSelect').slideDown(150);
			},function(){
				$(this).removeClass('header-address-change');
				$('.UserCenterSelect').slideUp(0);
			});
		},
		cartClick: function(){
			this.cartBox.hover(function(){
				//console.log(1);
				$(this).addClass('header-address-change');
				$('.cartCommodity').slideDown(150);
			},function(){
				//console.log(2);
				$(this).removeClass('header-address-change');
				$('.cartCommodity').slideUp(150);
			});
		},
	};
	areaList.init();
});
//logo input click
$(function(){
	var inputText = {
		init: function(){
			this.ulBox = $('.search-type');
			this.lis = $('.search-type li');
			this.btn = $('.goSearch');
			this.changeColor();
			this.btnClick();
		},
		changeColor: function(){
			this.lis.click(function(){
				$(this).addClass('li-changeColor').siblings().removeClass('li-changeColor');
				var liIndex = $(this).index();
				if(liIndex == 0){
					$('.search-box').attr('placeholder','请输入您想要的印刷商品');
				}else{
					$('.search-box').attr('placeholder','点这里输入关键词，找您要的设计稿');
				}
			});
		},
		btnClick: function(){
			this.btn.hover(function(){
				$(this).addClass('goSearch-bg');
			},function(){
				$(this).removeClass('goSearch-bg');
			});
		},

	};
	inputText.init();
	
});
//nav
$(function(){
	var navResult = {
		init: function(){
			this.allGoods = $('.nav-left');
			this.menuItemBox = $('.menuItem-wrapper');
			this.goodsMenuS = $('.goods-menu');
			this.goodsItemS = $('.goods-item');

			this.navRight = $('.nav-right');
			this.navRights = $('.nav-right .li-slide');
			this.navRightA = $('.nav-pullDown');
			this.navSelects = $('.nav-select');

			this.navLeft();
			this.navLeftItem();
			this.goodsItemSA();
			this.navright();
			this.navRightBox();
		},
		navLeft: function(){
			this.allGoods.hover(function(){
				$('.menu').show();
			},function(){
				$('.menu').hide();
			});
		},
		navLeftItem: function(){
			var that = this;
			this.menuItemBox.hover(function(){
				$(this).css({
				    border: '1px solid #675d57',
				    borderRight: 'none'
				});
				$(this).find('.goods-menu').addClass('goods-menu-bg');
				$(this).find('.goods-item').show();
				
			},function(){
				$(this).css({
				    border: 'none'
				});
				$(this).find('.goods-menu').removeClass('goods-menu-bg');
				$(this).find('.goods-item').hide();
			});
		},
		goodsItemSA: function(){
			this.goodsItemS.find('a').hover(function(){
				$(this).css({
					color: '#f60'
				})
			},function(){
				$(this).css({
					color: '#333'
				})
			});
		},
		navright: function(){
			var that = this;
			this.navRights.mouseenter(function(){
				console.log( $(this).index() );
				that.navSelects.eq( $(this).index() ).show();
				that.navSelects.eq( $(this).index() ).siblings().hide();
				$('.nav-content').slideDown(200);
			});
			
			/*
			,function(){
				that.navSelects.eq( $(this).index() ).css({
					display: 'none'
				});
				$('.nav-content').slideUp(200);
			}
			 */
		},
		navRightBox: function(){
			var that = this;
			$('.nav-wrapper').mouseleave(function(){
				$('.nav-content').slideUp(200);
			});
			$('.nav-up').mouseenter(function(){
				$('.nav-content').slideUp(200);
			});
		},
	};
	navResult.init();
});
//banner play
$(function(){
	//header city
	var selectProvince = {
		init:function(){
			this.imgs = $('.banner-imgs li');
			this.banner = $('.banner');
			this.dots = $('.banner .img-cur');
			this.arrowL = $('.banner-prev');
			this.arrowR = $('.banner-next');
			this.dots = $('.img-cur span');			

			this.now = 0;
			this.next = 0;
			this.timer = null;
			this.index = this.imgs.eq( this.now ).index();
			//console.log(this.index);
			this.autoPlay();
			this.stopAuto();
			this.nextClick();
			this.prevClick();
			this.dotClick();
		},
		autoPlay: function(){
			var that = this;
			this.timer = setInterval(function(){
				that.changeBg();
				that.next++;
				that.next %= that.imgs.length;
				that.switchImg();
				//console.log(that.next);
				//console.log( that.imgs.eq(that.now).attr('dataBg') );
			},3000);
		},
		switchImg: function(){
			var that = this;
			that.imgs.eq(that.now).fadeOut(500);
			that.imgs.eq(that.next).fadeIn(500);
			that.now = that.next;
			that.dots.eq( that.now ).addClass('dotColor').siblings().removeClass('dotColor');
		},
		changeBg: function(){
			var that = this;
			this.bgColor = this.imgs.eq(this.now).next().attr('dataBg');
			if(this.now < 4){ //先判断小于4
				this.banner.css({
					backgroundColor: function(){
						return that.bgColor;
					}
				});				
			}else{
				this.banner.css({
					backgroundColor: "#d76438"
				});
			}
		},
		stopAuto: function(){
			var that = this;
			$('.banner-wrapper').hover(function(){
				clearInterval(that.timer);
			},function(){
				that.autoPlay();
			});
		},
		nextClick: function(){
			var that = this;
			this.arrowR.click(function(){
				that.changeBg();
				that.next++;
				that.next %= that.imgs.length;
				that.switchImg();
			});
		},
		prevClick: function(){
			var that = this;
			this.arrowL.click(function(){
				that.next = ( that.imgs.eq(that.now).index() ) - 1;
				if(that.now <= 0){	//先判断小于0
					that.banner.css({
						backgroundColor: "#fffffa"
					});		
				}else if(that.now < 4){
					that.banner.css({
						backgroundColor: function(){
							return that.imgs.eq(that.now).prev().attr('dataBg');
						}
					});	
				}	
				//console.log( that.now );
				that.switchImg();
			});
		},
		dotClick: function(){
			var that = this;
			//有问题！！！
			this.dots.click(function(){
				$(this).addClass('dotColor').siblings().removeClass('dotColor');
				that.now = $(this).index();
				that.switchImg();
			});		
		},
	};
	selectProvince.init();		//调用
});
//floor shadow
$(function(){
	$('.picture-show').hover(function(){
		$(this).addClass('bigShadow');
		//console.log(1);
	},function(){
		$(this).removeClass('bigShadow');
		//console.log(2);
	});
	$('.lists-box').hover(function(){
		$(this).addClass('littleShadow');
	},function(){
		$(this).removeClass('littleShadow');
	});
	$('.hotSellTwo-li').hover(function(){
		$(this).addClass('littleShadow');
	},function(){
		$(this).removeClass('littleShadow');
	});
});
//手风琴
$(function(){
	var liLeft = {
		init: function(){
			this.lis = $('.designServe-lists li');
			
			this.switchWidth();
		},
		//鼠标滑过事件
		switchWidth: function(){
			var that = this;
			$('.designServe-li').hover(function(){
				//console.log(1);
				$(this).find('.big-opa-pic').css({
					display: 'block'
				}).next('.opa-pic').css({
					background: '#f60',
					opacity: 1
				});
				$('.designServe-li').stop(true).animate({
					width: 203
				},100)
				$(this).stop(true).animate({
					width: 348
				},100);
			},function(){
				//console.log(2);
				$(this).find('.big-opa-pic').css({
					display: 'none'
				}).next('.opa-pic').css({
					background: '#000',
					opacity: 0.3
				});
				$('.designServe-lists li').stop(true).animate({
					width: 232
				});
			});
		},
	};
	liLeft.init();
});
/*comments span*/
$(function(){
	$('.comments-img').hover(function(){
		$(this).find('span').css({
			display: 'block'
		})
	},function(){
		$(this).find('span').css({
			display: 'none'
		})
	});
});
/*新手入门 显示与隐藏*/
$(function(){
	$('.c-w-active dt').click(function(){
		//console.log( $('.c-w-active').height() );
		if( ( $('.c-w-active').height() ) <= 19 ){
			console.log(1);
			$('.c-w-active').stop(true).animate({
				height: 120
			});
			$(this).parents('.c-w-active').find('dl dt a').addClass('change-bg');
		}else if( ( $('.c-w-active').height() ) >= 120 ){
			console.log(2);
			$('.c-w-active').stop(true).animate({
				height: 19
			});
			$(this).parents('.c-w-active').find(' dl dt a').removeClass('change-bg');
		}
	});
});
/*footer active*/
$(function(){
	$('.c-w-active-top').click(function(){
		$('.c-w-active-bottom').slideToggle('slow');
	});
});
/*footer firend link*/
$(function(){
	//其他链接转换
	$('.friendLink-wrapper li').hover(function(){
		//console.log(1);
		$(this).addClass('li-change-color')
			.siblings().removeClass('li-change-color');
		$('.otherLink p').eq( $(this).index() ).css({
			display: 'block'
		}).siblings().css({
			display: 'none'
		});
	});
	//显示更多
	$('.otherLink i').click(function(){
		//console.log( $('.c-w-active').height() );
		if( ( $('.otherLink').height() ) <= 30 ){
			console.log(1);
			$('.otherLink').css({
				height: 'auto'
			});
			$(this).addClass('change-bg');
		}else{
			console.log(2);
			$('.otherLink').css({
				height: 30
			});
			$(this).removeClass('change-bg');
		}
	});
});
