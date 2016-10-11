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
			this.yzmH = $('.yzm-H');

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
		//cookie
		verifyC: function(){
			/*var userinfor={
				username: this.lgName.val(),
				password: this.pwds.vla(),
			}
			$.cookie("userinfo",JSON.stringify(userinfo),expires:7,path:'/');*/
			var username = $("input[name='username']").val();
			var password = $('input[password="password"]').val();
			var userinfo = $.cookie('userinfo')||'{}';
			userinfo = JSON.parse(userinfo);
			if(username != userinfo.username || password != userinfo.password){
				this.loginName();					
				$('.errorloginName').html('您输入的用户名或者密码不正确');
				return;
			}
			console.log(username);
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
			var arr = [];
			for(var i=0;i<4;i++){
				var num = parseInt( Math.round( Math.random() * 9 ) );
				arr.push(num);
			}
			$('.loginCapt').html( arr );
				//console.log(arr);
			this.yzmH.click(function(){
				var arrs = [];
				for(var i=0;i<4;i++){
					var num = parseInt( Math.round( Math.random() * 9 ) );
					arrs.push(num);
				}
				$('.loginCapt').html( arrs );
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
					return;
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
					return;
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
					return;
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
				var num = $('.loginCapt').html();
				console.log(val);
				if( !( val == num ) ){
					$(this).parent().next().find('.loginyzmError').show();
					return;
				}
			});
			this.loginyzm.focus(function(){
				var val = $(this).val();
				var num = $('.loginCapt').html();
				if( val == num){
					$(this).parent().next().find('.loginyzmError').hide();
				}
			});
		},
		//短信验证码
		lgCode: function(){
			var that = this;
			this.loginCode.blur(function(){
				var val = $(this).val();
				var num = $('.loginCapt').html();
				console.log(val);
				if( !( val == num ) ){
					$('.errorloginCode').show();
					return;
				}
			});
			this.loginCode.focus(function(){
				var val = $(this).val();
				var num = $('.loginCapt').html();
				if( val == num){
					$('.errorloginCode').hide();
				}
			});
		},
		//登录按钮
		BtnClick: function(){
			var that = this;
			this.loginBtn.click(function(){
				that.loginName();
				that.loginPhone();
				that.verifyC();
				/*var userinfo = {
					username: $('.loginName').val(),
					password: $('.password').val()
				};
				$.cookie('userinfo',JSON.stringify(userinfo),{expires:7,path:'/'});
				window.location.href = 'login.html';
				 */
				console.log("登录成功");
				window.location.href = 'index.html';
			});
		},
		//手机登录
		phoneBtnClick: function(){
			var that =this;
			this.PhoneloginBtn.click(function(){
				that.loginPhone();
				that.loginYzm();
				that.lgCode();
				that.verifyC();
				/*var userinfo = {
					username: $('.loginName').val(),
					password: $('.password').val()
				};
				$.cookie('userinfo',JSON.stringify(userinfo),{expires:7,path:'/'});
				window.location.href = 'login.html';
				 */
				console.log("登录成功");
				window.location.href = 'index.html';
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