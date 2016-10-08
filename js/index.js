'use strict';
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
			console.log(this.index);
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
			if(this.now < 4){ //先判断小于4
				this.banner.css({
					backgroundColor: function(){
						return that.imgs.eq(that.now).next().attr('dataBg');
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
	var that = this;
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