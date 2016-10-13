'use strict';
$(function(){
	var login = {
		init: function(){
			this.login= {
				username: true,
				password: true
			};
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
			this.email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
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
			this.loginPhone();
			this.loginYzm();
			this.lgCode();
			this.phoneBtnClick();
			this.captImg();
			
		
		},
		//cookie
		//验证用户名是否存在    待更改
		checkUName: function(username){
			var that = this;
			$.getJSON('js/login.json',function(result){
				that.login.username = true;
				for( var key in result){
					if( username = result[key].username ){
						console.log('用户名已存在');
						that.login.username = false;
						break;
					}	
				}
				if( !that.login.username ){
					//错误提示信息显示
					console.log('错误提示信息显示');
					$('.errorloginName').html('您输入的用户名已存在');
					$('.errorloginName').show();
				}else{
					$('.errorloginName').hide();
				}
			});
		},
		//存储cookie
		ClickCookie: function(){
			var that = this;
			var flag = true;
			//判断所有验证是否合法
			for( var key in that.login ){
				if( !that.login[key] ){
					flag = false;
					break;
				}
			}
			if( !flag ){
				alert('部分数据不合法');
				return;
			}
			//存储cookie
			
			var username = $("input[name='username']").val();
			var password = $('input[password="password"]').val();
			
			var	userinfo = {
				username: username,
				password: password
			};
			$.cookie('userinfo',JSON.stringify( userinfo ),{expires: 7,path:'/'});
			console.log(JSON.parse( $.cookie('userinfo') ));
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
				//that.checkUName( val );
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
				if( $(this).is('input[name="username"]')){
					that.checkUName( $(this).val() );
				}
				if(	!that.email.test(val) ){
					$(this).next().show();
					return;
				}else if( that.email.test(val) ){
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
		//验证码验证
		loginYzm: function(){
			var that = this;
			this.loginyzm.blur(function(){
				var val = $(this).val();
				var num = $('.loginCapt').html();
				console.log(val);
				if( !( val == num ) ){
					$(this).parent().next().find('.loginyzmError').show();
					return;
				}else if( val == num){
					$(this).parent().next().find('.loginyzmError').hide();
					return;
				}
			});
			this.loginyzm.focus(function(){
				var val = $(this).val();
				var num = $('.loginCapt').html();
				if( val == num){
					$(this).parent().next().find('.loginyzmError').hide();
					return;
				}
			});
		},
		//短信验证码验证
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
		//注册按钮
		BtnClick: function(){
			var that = this;
			this.loginBtn.click(function(){
				that.loginName();
				that.loginPhone();
				//that.signInC();
				/*var userinfo = {
					username: $('.loginName').val(),
					password: $('.password').val()
				};
				$.cookie('userinfo',JSON.stringify(userinfo),{expires:7,path:'/'});
				window.location.href = 'login.html';
				 */
				console.log("注册成功");
				that.ClickCookie();//存储cookie
				window.location.href = 'login.html';
			});
		},
		//邮箱注册
		phoneBtnClick: function(){
			var that =this;
			this.PhoneloginBtn.click(function(){
				that.loginPhone();
				that.loginYzm();
				that.lgCode();
				that.signInC();
				/*var userinfo = {
					username: $('.loginName').val(),
					password: $('.password').val()
				};
				$.cookie('userinfo',JSON.stringify(userinfo),{expires:7,path:'/'});
				window.location.href = 'login.html';
				 */
				console.log("登录成功");
				//window.location.href = 'login.html';
			});
			
		},
		/*注册方式切换*/
		changeClick: function(){
			var that = this;
			this.changeToPhone.click(function(){
				$(this).parent().hide();
				that.lgName.hide();
				that.loginValidate.hide();

				$(this).parent().next().show();
				that.loginPhoneValidate.show();
				that.titleVal.html('邮箱登录');

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