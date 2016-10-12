'use strict';
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