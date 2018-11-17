define(function(){
	return function(Cm){
		var $userLevel = $('#users .users_header .userLevel');
		var $userName = $('#users .users_header .userName');
		var $userTel = $('#users .users_header .userTel');
		var $userPassword = $('#users .users_header .userPassword');
		var $addOne = $('#users .users_header .addOne');
		var $btn_cancelsave = $('#users .users_header .btn_cancelsave');
		var $btn_save = $('#users .users_header .btn_save');
		var $btn_remendPasword = $('#uers .user_header .btn_remendPasword');
		var $userNewPassword =  $('#users .users_header .userNewPassword');
		var $jinggao = $('#users .jinggao');
		var obj = {
			'userLevel':$userLevel,
			'userName':$userName,
			'userTel':$userTel
		}
		var data;
		var userLevelObj = {
			u1 :'高级管理员',
			// u0 :'普通用户', 
			// u4 :'普通会员用户',  
			u2 :'普通管理员', 
			u3 :'销售员'
		}
		var initUserData = new Object();
		var newUserData = new Object();
		$('#users').on('click','button',function(){
			var $this = $(this);
			if($this.hasClass('btn_add')){
				// 点击新增，文字改为保存，添加保存类，显示取消按钮和密码框等
				$this.text('保存');
				$addOne.show();
				$btn_cancelsave.show();
				$this.removeClass('btn_add').addClass('btn_save');
				return false;
			}else if($this.hasClass('btn_save')){
				// 点击保存按钮，删除保存类，文字改为新增，隐藏密码框
				data = {
					'userName':$userName.val(),
					'userPassword':$userPassword.val(),
					'type':$userLevel.val(),
					// 'userTel':$userTel.val()
				}
				//判断当前用户的身份********
				if(data.type == 'u'){
					alert('用户级别无效，请重新选择!');
					return false;
				}else{
					$.post(Cm.baseUrl+'/userRegister',data,function(result){
						// if(result.status){
							alert('新增成功');
							$this.text('新增').removeClass('btn_save').addClass('btn_add');
							$addOne.hide();
							$btn_cancelsave.hide();
						// }else{
						// 	alert('sorry,此用户已存在！');
						// }
					},'json')
				}
				return false;
			}else if($this.hasClass('btn_cancelsave')){
				// 点击取消按钮，密码框隐藏，保存按钮文字改为新增
				$addOne.hide();	
				$this.siblings('.btn_save').text('新增').removeClass('btn_save').addClass('btn_add');
				$this.hide();
				return false;
			}else if($this.hasClass('btn_del')){
				// 点击删除按钮
				var $tr = $this.parents('tr');
				var $tds = $tr.children();
				var len = $tds.length;
				data.tr = $tr;
				$tds.each(function(idx,item){
					if(idx!==0 && idx!==len-1){
						var name = item.className;
						if(name === 'userLevel'){
							data[name] = item.dataset.type;
						}else{
							data[name] = $(item).text();
						}
					}

				})
				// 点击删除按钮，获得该条数据
				$jinggao.show();
				return false;
			}else if($this.hasClass('btn_amend')){
				// 点击修改按钮
				var $tr = $this.parents('tr');
				var $tds = $tr.children();
				var len = $tds.length;
				data.tr = $tr;
				$tds.each(function(idx,item){
					if(idx!==0 && idx!==len-1){
						var name = item.className;
						if(name === 'userLevel'){
							data[name] = item.dataset.type;
						}else{
							data[name] = $(item).text();
						}
					}
				})
				if($this.text() === '修改'){
					// 如果当前字体为修改
					$this.text('保存');
					$addOne.show();
					$('#users .users_header .btn_remendPasword').show();
					$('#users .users_header .btn_search').hide();
					$('#users .users_header .btn_add').hide();
					$('#users .users_header .Pwd').hide();
				}else{
					var data3 = Object.assign({},data);
					delete(data3.tr);
					delete(data3.userId);
					var promise = new Promise(function(resolve, reject){
						$.post(Cm.baseUrl+'/findUser',data3, function(result){
							initUserData.userPassword = result.data[0].userPassword;
							console.log(result.data[0].userPassword);
							resolve();
						},'json')
					})
					promise.then(function(){
						var tiaojian = $userName.val() == '' || $userTel.val() == '' ;
						var tiaojianpsd = $userName.val() == '' || $userTel.val() == '' || $userPassword.val() == '' ||  $userNewPassword.val() == '';
						var password1 = initUserData.userPassword;
						// 修改密码按钮可见
						var len = $('#users .users_header .btn_remendPasword:visible').length;

						 len>0 ? tiaojian : tiaojian = tiaojianpsd;
						if(tiaojian){
							alert('输入框不能为空');
							return false;
						}
						if( $userLevel.val() == 'u'){
							alert('用户级别无效');
							return false;
						}	
						if(len<1){
							if(password1 !== $userPassword.val() || password1 == $userNewPassword.val()){
								alert('密码输入有误或新旧密码一致');
								return false;
							}
							// 将新密码加入
							newUserData.userPassword = $userNewPassword.val();
						}
						if(len>0){
							newUserData.userPassword = password1;
						}
						newUserData.userName = $userName.val();
						newUserData.userLevel = $userLevel.val();
						newUserData.userTel = $userTel.val();
						initUserData = Object.assign(initUserData,data);
						delete(initUserData.userId);
						delete(initUserData.tr);
						var data1 = JSON.stringify(initUserData);
						var data2 = JSON.stringify(newUserData);
						$.post(Cm.baseUrl+'/updateUser',{
							'data1':data1,
							'data2':data2
						},function(result){
							if(result.status){
								$('#users .users_header .btn_search').show();
								$('#users .users_header .btn_add').show();
								var $tr = data.tr;
								$this.text('修改');
								$addOne.hide();
								$('#users .users_header .newPwd').hide();
								$tr.find('.userName').text(newUserData.userName);
								$tr.find('.userLevel').text(userLevelObj[newUserData.userLevel]);
								$tr.find('.userTel').text(newUserData.userTel);
								$('#users .users_header .btn_remendPasword').hide();
							}
						},'json')
					})
				}
				return false;
			}else if($this.hasClass('btn_ensure')){
				// 点击确认删除
				var $tr = data.tr;
				delete(data.tr);
				delete(data.userId);
				$.post(Cm.baseUrl+'/userDelete',data,function(res){
					if(res == 'true'){
						alert('删除成功');
						$tr.remove();
						$jinggao.hide();
					}
				})
				// 点击确定删除按钮
				return false;
			}else if($this.hasClass('btn_search')){
				// 点击搜索
				data = {
					'userName':JSON.stringify($userName.val()),
					'type':JSON.stringify($userLevel.val())
				}
				if(data.type == 'u'){
					delete(data.type);
				}

				$.post(Cm.baseUrl+'/userSearch', data, function(result){
					if(result.length > 0){
						createTab($('#users .users_content table tbody'), result);
					}
				},'json')
			}else if($this.hasClass('btn_close') || $this.hasClass('btn_cancel')){
				// 点击弹窗的关闭按钮或取消按钮
				$jinggao.hide();
			}else if($this.hasClass('btn_remendPasword')){
				// 如果点击修改密码,出现新密码框
				$('#users .users_header .Pwd').show();
				$('#users .users_header .newPwd').show();
				$this.hide();
			}
		})
		function createTab(selector, data){
			selector.html(data.map(function(item, idx){
				var level = userLevelObj[item.userLevel];
				return `<tr id=${item._id}>
		 			<td>
		 				<div class="checkbox">
		 				  <label>
		 				    <input type="checkbox" id="blankCheckbox" value="option1" aria-label="...">
		 				  </label>
		 				</div>
		 			</td>
		 			<td class="userName">${item.userName}</td>
		 			<td class="userLevel">${item.type}</td>
		 			<td class="userPassword">${item.userPassword}</td>
		 			<td>
		 				<button type="button" class="btn btn-danger btn-primary btn-xs btn_del"  objectid="' + item.id + '">删除</button>
		 			</td>
		 		</tr>`
			}).join(''));
		}
	}
})