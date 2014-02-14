
define('page_buy', function(require) {
    var $ = require('jquery'),
		login = require('login'),
		user = require('user'),
        doc = document;
    try{
        doc.domain = 'pptv.com';
    }catch(err){}
	uName='';
	var userName=document.getElementById('userName');
	var userOut=document.getElementById('userOut');
	var userNemuTag=document.getElementById('foot');
	var userNemu=userNemuTag.getElementsByTagName('p');
	
	//登陆后
	user.onLogin(function(info){
		userName.innerHTML=info.UserName;
		uName=info.UserName;
		userNemu[0].style.display='none';
		userNemu[1].style.display='block';
		$(userOut).on('click',function(){
			user.logout();
			window.location.href=payLink;
			return false;
		})
	});
	
	//登陆前
	user.onLogout(function(){
		userNemu[0].style.display='block';
		userNemu[1].style.display='none';
		uName=''
		userLogin()
	});
	
	
	function userLogin(){
		var userLogin=document.getElementById('userLogin');
		var userReg=document.getElementById('userReg');
		var query=document.getElementById('query');
		$(userLogin).on('click',function(){
			var scrollTop=$(document).scrollTop();
			seajs.use('login.init', [{type:'login',size:'tiny'},{
				width:'620px',
				height:'300px',
				position : 'relative',
				margin:'0 auto',
				left:'0',
				top:scrollTop-4792+'px'
			}]);
		})  
	/*	$(userLogin).bind('click',function(ev){
			login.init(),{type:'login',size:'tiny'},{
			width : 364 + 'px',
            height : 350 + 'px',
            position : 'absolute',
            top : '0',
            left : '0',
            'margin-top' : 40 + 'px',
            'margin-left' : 130 + 'px',
            'z-index' : 10000	
			}
		});  */
		$(userReg).on('click',function(){
			var scrollTop=$(document).scrollTop();
			seajs.use('login.init', [{type:'reg',size:'tiny'},{
				width:'620px',
				height:'300px',
				position : 'relative',
				margin:'0 auto',
				left:'0',
				top:scrollTop-4792+'px'
			}]);
		})
		$(query).on('click',function(){
			var scrollTop=$(document).scrollTop();
			seajs.use('login.init', [{type:'login',size:'tiny'},{
				width:'620px',
				height:'300px',
				position : 'relative',
				margin:'0 auto',
				left:'0',
				top:scrollTop-4792+'px'
			}]);
			return false;
		})
	}
	
	//if(document.getElementById('f_buy')){
//		var f_buy=document.getElementById('f_buy');
//		var f_buy_a=f_buy.getElementsByTagName('a');
//		$(f_buy_a[0]).on('click',function(){
//			if (uName==''){
//				seajs.use('login.init', [{type:'login'}]);
//				return false;
//			}
//		})
//	}

	if(document.getElementById('buyBtn')){
		var buyBtn=document.getElementById('buyBtn');
		$(buyBtn).on('click',function(){
			var scrollTop=$(document).scrollTop();
			if (uName==''){
				seajs.use('login.init', [{type:'login'},{
				width:'620px',
				height:'364px',
				position : 'relative',
				margin:'0 auto',
				left:'0',
				top:scrollTop-4792+'px'
			}]);
			}
		})
	}

	/**
	 * 取消订单操作
	 **/
	(function(undefined) {
		var btn = $('#_j_cancel_btn');
		var tip = $('#_j_confirm_tip');
		var btns = $('a', tip);
		$(btns[0]).attr('href', btn.attr('href'));

		if(!btn.length){
			return;
		}

		btn.on('click', function(evt){
			evt.preventDefault();
			tip.show();
			var pos = btn.position();
			tip.css({'left': pos.left - parseInt(tip.css('width'), 10) + 30, 'top': pos.top + parseInt(btn.css('height'), 10) + 20}).show();
		});

		$(btns[1]).on('click', function(evt){
			tip.hide();
		});
	})();

	/**
	 * 数量输入框
	 **/
	!function(undefined){
		var input = $('#orderCount');
		var price = 1;
		if(window.webcfg && webcfg.price){
			price - webcfg.price;
		}
		var amount = $('#orderAmount');

		input.on('keyup', function(evt){
			var count = parseInt(this.value.replace('/[^\d]+/g', ''), 10);
			if(isNaN(count)){
				return;
			}

			amount.html(price * count);
		});

		input.on('blur', function(evt){
			if(this.value.replace('/[^\d]+/g', '') == ''){
				this.value = 1;
				amount.html(price);
			}
		});
	}();
	
	var layer = (function(){
		return {
			f_buy : function(){
				if(!document.getElementById('buyBtn')){
					return;
				}
				var buyBtn=document.getElementById('buyBtn');
				var f_buy=document.getElementById('f_buy');
				var f_buy_a=f_buy.getElementsByTagName('a');
				if(BuyTpye==1){
					f_buy_a[0].style.display='none';
					f_buy_a[1].style.display='block';
				}
				//$(buyBtn).on('mouseover',function(){
//					f_buy.style.display='block';
//				})
//				$(f_buy).mouseleave(function(){
//					$(f_buy).css("display","none");
//				});
			},
			orderVerify:function(){
				if(!$('#orderName')){
					return;
				}
				var yzName=true,yzCompany=true,yzPhone=true,yzZip=true,yzAddress=true;
				//用户名
				var orderName=$('#orderName');
				var orderNameErr=$('#orderNameErr');
				$(orderName).on('blur',function(){
					if(!orderName.val()){
						orderNameErr.html('请输入真实姓名');
						yzName=false;
					}else{
						orderNameErr.html('');
						yzName=true;
					}
				})
				
				//手机
				var orderPhone=$('#orderPhone');
				var orderPhoneErr=$('#orderPhoneErr');
				$(orderPhone).on('blur',function(){
					var mobile=/^0?(13|15|18|14)[0-9]{9}$/;
					if(!orderPhone.val()){
						orderPhoneErr.html('请输入手机号');
						yzPhone=false;
					}else if(mobile.test(orderPhone.val())==false){
						orderPhoneErr.html('手机输入有误');
						yzPhone=false;
					}else{
						orderPhoneErr.html('');
						yzPhone=true;
					}
				})
				
				//邮编
				var orderZip=$('#orderZip');
				var orderZipErr=$('#orderZipErr');
				var zip=/^[1-9]{1}[0-9]{5}$/;
				$(orderZip).on('click',function(){
					if(zip.test(orderZip.val())==false){
						orderZip.val('');
					}
				})
				$(orderZip).on('blur',function(){
					
					if(!orderZip.val()){
						orderZipErr.html('请输入邮编');
						yzZip=false;
					}else if(zip.test(orderZip.val())==false){
						orderZipErr.html('邮编输入有误');
						yzZip=false;
					}else{
						orderZipErr.html('');
						yzZip=true;
					}
				})
				
				//地址
				var orderAddress=$('#orderAddress');
				var orderAddressErr=$('#orderAddressErr');
				$(orderAddress).on('blur',function(){
					if(!orderAddress.val()){
						orderAddressErr.html('请输入收件地址');
						yzAddress=false;
					}else{
						orderAddressErr.html('');
						yzAddress=true;
					}
				})
				
				//发票
				var fapiao1=$('#fapiao1');
				var fapiao2=$('#fapiao2');
				var fapiao2_1=$('#fapiao2_1');
				var fapiaoT1=$('#fapiaoT1');
				var fapiaoT2=$('#fapiaoT2');
				var fapiao4=$('#fapiao4');
				var company=$('#company');
				var companyErr=$('#companyErr');
				$(fapiao1).on('click',function(){
					$(fapiao2_1).css("display","none");
					yzCompany=true;
				})
				$(fapiao2).on('click',function(){
					$(fapiao2_1).css("display","block");
				})
				$(fapiaoT1).on('click',function(){
					$(fapiao4).css("display","none");
					yzCompany=true;
				})
				$(fapiaoT2).on('click',function(){
					$(fapiao4).css("display","block");
				})
				$(company).on('blur',function(){
					if(fapiaoT2.attr('checked')=='checked'){
						if(!company.val()){
							companyErr.html('请输入公司名称');
							yzCompany=false;
						}else{
							companyErr.html('');
							yzCompany=true;
						}
					}
				})
				
				//提交
				var payBtn=$('#payBtn');
				var f_payType=$('#f_payType');
				var f_payClear=$('#f_payClear');
				var order=$('#order');
				var bg_pay=$('#bg_pay');
				var clientHeight=document.body.clientHeight;
				$(payBtn).on('click',function(evt){
					orderName.blur();
					orderPhone.blur();
					orderZip.blur();
					orderAddress.blur();
					if(fapiaoT2.attr('checked')=='checked' && fapiao2.attr('checked')==='checked'){
						company.blur();
					}
					if(yzName && yzPhone && yzZip && yzAddress && yzCompany){
						bg_pay.css('display','block');
						bg_pay.css('height',''+clientHeight+'');
						f_payType.css('display','block');
						$('#cmbProvince').css('display','none');
						$('#cmbCity').css('display','none');
						$('#cmbArea').css('display','none');
					}else{
						evt.preventDefault();
						return false;
					}
				})
				
				function clearPage(){
					f_payType.css('display','none');
					bg_pay.css('display','none');
					window.location.href=payLink;
				}
				$(f_payClear).on('click',function(){
					clearPage();
				})
				$(bg_pay).on('click',function(){
					clearPage();
				})
			}
		};
	})();
   return layer;
});

seajs.use(['page_buy'], function(page_buy){
	page_buy.f_buy();
	page_buy.orderVerify();
});