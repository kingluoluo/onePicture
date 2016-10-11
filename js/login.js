'use strict';
$(function(){
	var login = {
		init: function(){
			/*input focus*/
			this.lgName = $('.loginName');
			this.pwds = $('.password');
			this.changeIptBg = $('.changeIptBg');
			/*登录方式切换*/
			this.changeToPhone = $('.account-login a');
			this.changeToName = $('.phone-login a');
			this.titleVal = $('h3 span');
			this.loginValidate = $('.login-validate');
			this.loginPhoneValidate = $('.loginPhone-validate');
			//验证
			this.phoneReg= /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
			this.NameReg = /^[A-Za-z0-9]+$/; //用户名
			this.pwdReg = /^[a-zA-Z]\w{5,17}$/;		//密码
			this.loginBtn = $('.loginBtn');
			this.loginphone = $('.loginphone');
			this.loginyzm = $('.loginyzm');
			this.loginCode = $('.loginCode');
			this.PhoneloginBtn = $('.PhoneloginBtn');
			//免登陆
			this.loginChk = $('.loginChk');

			//验证码图片
			this.loginCapt = $('.loginCapt');

			/*验证码按钮*/
			this.loginSendCode = $('.login-sendCode');
			this.havefocus();
			this.loginName();
			this.loginPwd();
			this.changeClick();
			this.sendCode();
			this.BtnClick();
			this.sevenLogin();
			this.loginPhone();
			this.loginYzm();
			this.lgCode();
			this.phoneBtnClick();
			this.captImg();
		},
		/*input focus*/
		havefocus: function(){
			this.changeIptBg.focus(function(){
				$(this).removeClass('input-error');
				$(this).addClass('input-focus');
			});
			this.changeIptBg.blur(function(){
				$(this).removeClass('input-focus');
			});
		},
		//验证码图片
		captImg: function(){
			this.loginCapt.click(function(){
				console.log(1);
				var num = parseInt( Math.round( Math.random() ) * 13 );
				
				
				/*
				$.ajax({
					url: 'D:/niu/QF/TWO-JS/onePictureItem/js/login.json',
					data:{
						num: parseInt( Math.round( Math.random() ) * 13 )
					},
					dataType: 'jsonp',
					success: function(result){
						console.log(result.data);
					},
				});
				 */
			});
		}, 
		//用户名验证
		loginName: function(){
			var that = this;
			this.lgName.blur(function(){
				var val = $(this).val();
				$(this).removeClass('input-error');
				if(	!that.phoneReg.test(val) ){
					$(this).next().show();
				}else if( that.phoneReg.test(val) ){
					$(this).next().hide();
				}
			});
		},
		//手机验证
		loginPhone: function(){
			var that = this;
			this.loginphone.blur(function(){
				var val = $(this).val();
				$(this).removeClass('input-error');
				if(	!that.phoneReg.test(val) ){
					$(this).next().show();
				}else if( that.phoneReg.test(val) ){
					$(this).next().hide();
				}
			});
		},
		//密码验证
		loginPwd: function(){
			var that = this;
			this.pwds.blur(function(){
				var val = $(this).val();
				if(	!that.pwdReg.test(val) ){
					console.log(1);
					$(this).next().show();
				}else if( that.pwdReg.test(val) ){
					$(this).next().hide();
				}
			});
		},
		//验证码
		loginYzm: function(){
			var that = this;
			this.loginyzm.blur(function(){
				var val = $(this).val();
				$(this).parent().next().find('.loginyzmError').show();
			});
			this.loginyzm.focus(function(){
				var val = $(this).val();
				$(this).parent().next().find('.loginyzmError').hide();
			});
		},
		//短信验证码
		lgCode: function(){
			var that = this;
			this.loginCode.blur(function(){
				var val = $(this).val();
				$('.errorloginCode').show();
			});
			this.loginCode.focus(function(){
				var val = $(this).val();
				$('.errorloginCode').hide();
			});
		},
		//登录按钮
		BtnClick: function(){
			var that = this;
			this.loginBtn.click(function(){
				var userName = $('.loginName').val();
				var pwdVal = $('.password').val();
				if(	!that.phoneReg.test(userName) ){
					that.lgName.next().show();
					that.lgName.addClass('input-error');
					return;
				}else if( !that.pwdReg.test(pwdVal) ){
					that.pwds.next().show();
					that.pwds.addClass('input-error');
					return;
				}
			});
		},
		//手机登录
		phoneBtnClick: function(){
			var that = this;
			this.PhoneloginBtn.click(function(){
					var phonereg = $('.loginphone').val();
				if(	!that.phoneReg.test(phonereg) ){
					that.loginphone.next().show();
					return;
				}
			});
		},
		//7天免登陆
		sevenLogin: function(){
			this.loginChk.click(function(){
				if( !$(this).prev().attr('checked') ){
					$(this).addClass('checked');
					$(this).prev().attr('checked','checked');
				}else{
					$(this).removeClass('checked');
					$(this).prev().removeAttr('checked');
				}
			});
		},
		/*登录方式切换*/
		changeClick: function(){
			var that = this;
			this.changeToPhone.click(function(){
				$(this).parent().hide();
				that.lgName.hide();
				that.loginValidate.hide();

				$(this).parent().next().show();
				that.loginPhoneValidate.show();
				that.titleVal.html('手机登录');

			});
			this.changeToName.click(function(){
				that.loginValidate.show();

				$(this).parent().hide();
				that.loginPhoneValidate.hide();

				$(this).parent().prev().show();
				that.lgName.show();
				
				that.titleVal.html('登录');
			});
		},
		/*验证码按钮*/
		sendCode: function(){
			this.loginSendCode.hover(function(){
				$(this).find('.getYzm').addClass('getYzm-color');
			},function(){
				$(this).find('.getYzm').removeClass('getYzm-color');
			});
		},
	};
	login.init();
});