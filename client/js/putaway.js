define(function(){
	return function(cm){
		var header = $('.putaway_header');
		var $goodsName = header.find('.goodsName');
		var $goodsType = header.find('.goodsType');
		var $goodsSpec = header.find('.goodsSpec');
		var $goodsPurchPrice = header.find('.goodsPurchPrice');
		var $goodsSalePrice = header.find('.goodsSalePrice');
		var $goodsId = header.find('.goodsId');
		var $goodsRemark = header.find('.goodsRemark');
		var $goodsNum = header.find('.goodsNum');
		var sArr = {
			goodsId:$goodsId,
			goodsName:$goodsName,
			goodsNum:$goodsNum,
			goodsSalePrice:$goodsSalePrice,
			goodsPurchPrice:$goodsPurchPrice,
			goodsRemark: $goodsRemark,
			goodsType : $goodsType,
			goodsSpec : $goodsSpec
		}
		var obj = new Object();
		var promise_getAll = new Promise(function(resolve,reject){
			$.post(cm.baseUrl+'/getAll',{},function(result){
				if(result.length > 0 ){
					createTab($('.putaway_content tbody'),result);
				}
			},'json');
		})
		var typeArr = new Array();
		var sizeArr = new Array();
		// 当商品名称输入框失去焦点时，弹窗出现
		$('.putaway .goodsName').on('blur', function(){
			var value = $(this).val();
			$('.min-cover ').show();
			var promise1 = new Promise(function(resolve,reject){
				$.post(cm.baseUrl+'/getGoods',{
					'goodsName':JSON.stringify(value)
				},function(data){
						$('.putaway_box tbody').html(data.map(function(item,idx){
							var size = item.goodsSpec;
							if(sizeArr.indexOf(size) < 0){
								sizeArr.push(size);
								$('<option/>').html(size).appendTo('.putaway_header .goodsSpec');
							}
							if(typeArr.indexOf(item.goodsType) < 0){
								typeArr.push(item.goodsType);
								$('<option/>').html(item.goodsType).appendTo('.putaway_header .goodsType');
							}
							return `<tr>
									<td> <input type="checkbox" id="blankCheckbox" value="option1" aria-label="..."></td>
									<td class="goodsName" data-Size="${item.goodsSpec}" data-Id="${item._id}">${item.goodsName}</td>
									<td class="goodsType">${item.goodsType}</td>
									<td class="goodsSpec">${item.goodsSpec}</td>
									<td class="goodsPurchPrice">${item.goodsPurchPrice}</td>
									<td class="goodsSalePrice">${item.goodsSalePrice}</td>
									<td class="goodsId" style='display:none;'>${item.id}</td>
									</tr>`
						}).join(''));
				},'json');
			})
			// 选择对应的商品后，弹窗消失
			$('.putaway_box ').on("click",'tbody tr',function(){
				var $this = $(this);
				var goodsName =  $this.find('.goodsName').text();
				var goodsType = $this.find('.goodsType').text();
				var goodsSpec = $this.find('.goodsSpec').text();
				var goodsSalePrice = $this.find('.goodsSalePrice').text();
				var goodsPurchPrice = $this.find('.goodsPurchPrice').text();
				var goodsId = $this.find('.goodsId').text();
				$goodsName.val(goodsName);
				$goodsType.val(goodsType);
				$goodsSpec.val(goodsSpec);
				$goodsId.val(goodsId);
				$goodsPurchPrice.val(goodsPurchPrice);
				$goodsSalePrice.val(goodsSalePrice);
				$('.min-cover').hide();
			})
			$('.btn_close').click(function(){
				$('.min-cover').hide();
			})
		})
		// 当改变商品规格时，改变商品的编号
		$('.putaway_header .goodsSpec').on('change', function(){
			var size = $(this).val();
			var goodsName = $('.putaway_header .goodsName').val();
			var items = $('.putaway_box').find('.goodsName').filter('td:contains('+goodsName+')');
			var id;
			items.each(function(idx,item){
				var val = $(item).text();
				var size1 = item.dataset.size;
				var Id1 = item.dataset.id;
				if(val == goodsName && size1 == size){
					$('.putaway_header .goodsId').val(Id1);
					return true;
				}
			})
		})
		$('.newOne').click(function(){
			$('.putaway .putaway_header .box1').show();
			$('.putaway .putaway_header .saveNewOne').show();
		})
		// 点击保存新增时，添加商品
		$('.saveNewOne').click(function(){
			if(!$('.putaway_header .goodsName').val()){
				alert('请选择需要添加的商品');
			}else{
				var $this = $(this);
				// 获取页面上的数据
				var goodsName = $goodsName.val();
				var goodsType =  $goodsType.val();
				var goodsSpec = $goodsSpec.val();
				var goodsSalePrice = $goodsSalePrice.val();
				var goodsPurchPrice = $goodsPurchPrice.val();
				var goodsId = $goodsId.val();
				var goodsNum = $goodsNum.val();
				var goodsRemark = $goodsRemark.val();
				var newData = {
					'goodsName' : goodsName,
					'goodsType' :  goodsType,
					'goodsSpec' :goodsSpec,
					'goodsPurchPrice' : goodsPurchPrice,
					'goodsSalePrice' : goodsSalePrice,
					'goodsId' :goodsId,
					'goodsNum': goodsNum,
					'goodsRemark':goodsRemark
				}

				$.post(cm.baseUrl+'/addToPutaway',newData,function(result){
					if(result){
						$this.hide();
						$('.putaway .putaway_header .box1').hide();
						var newArr = new Array();
						newArr.push(newData);
						createTab($('.putaway .putaway_content table tbody'),newArr,true);
					}
				},'json')
			}
		})
		$('.cancelNewOne').click(function(){
			$('.putaway .putaway_header .box1').hide();
		})
		// 点击保存按钮
		$('.saveOne').click(function(){
			console.log($('.putaway .putaway_header .goodsImg').val());
			// 获取页面上的数据
			var goodsName = $goodsName.val();
			var goodsType =  $goodsType.val();
			var goodsSpec = $goodsSpec.val();
			var goodsSalePrice = $goodsSalePrice.val();
			var goodsPurchPrice = $goodsPurchPrice.val();
			var goodsId = $goodsId.val();
			var goodsNum = $goodsNum.val();
			var goodsRemark = $goodsRemark.val();
			// data1:原数据
			//data2：新数据
			var data2 = {
					'_id':obj._id,
					'goodsId':goodsId,
					'goodsName':goodsName,
					'goodsType':goodsType,
					'goodsSpec':goodsSpec,
					'goodsNum': goodsNum,
					'goodsPurchPrice': goodsPurchPrice,
					'goodsSalePrice': goodsSalePrice,
					'goodsRemark': goodsRemark
			}
			var data1 = JSON.stringify(obj);
			$.post(cm.baseUrl+'/updatePutaway',{
				'data1':data1,
				'data2':JSON.stringify(data2)
			},function(res){
				if(res.status){
					for(var attr in sArr){
						sArr[attr].val('');
					}
					$('.saveOne').hide();
					$('.putaway .putaway_content .btn_amend').text('修改');
					var tr=$('.putaway .putaway_content tr#'+data2._id);
					tr.find('.goodsName').text(data2.goodsName);
					tr.find('.goodsType').text(data2.goodsType);
					tr.find('.goodsSpec').text(data2.goodsSpec);
					tr.find('.goodsSalePrice').text(data2.goodsSalePrice);
					tr.find('.goodsPurchPrice').text(data2.goodsPurchPrice);
					tr.find('.goodsNum').text(data2.goodsNum);
					tr.find('.goodsRemark').text(data2.goodsRemark);
					$('.putaway .putaway_header .box1').hide();
					// $.post(cm.baseUrl+'/getAll',{},function(result){
					// 	createTab($('.putaway_content table tbody'),result.data);
					// },'json');
				}else{
					alert('更新失败');
				}
				
			},'json')
		})
		$('.putaway .putaway_content').on('click', '.btn-xs', function(){
			var $this = $(this);
			// 获得该条的信息
			var $tr = $this.parents('tr');
			var $tds = $tr.children();
			var id = $tr[0].id;
			var len = $tds.length;
			obj = {};
			obj._id = id;
			$tds.each(function(idx,ele){
				if(idx !== 0 && idx !== len-1){
					var name = ele.className;
					if(name == 'goodsSpec' || name == 'goodsType'){
						obj[name] = $(ele).text();
						$this.hasClass('btn_amend') ? sArr[name].html($('<option/>').text($(ele).text())) :  sArr[name].val('');
					}else if(name == 'goodsImg'){
						
					}else{
						obj[name] = $(ele).text();
						$this.hasClass('btn_amend') ? sArr[name].val($(ele).text()) : sArr[name].val('');
					}
				}
			});
			// 如果为修改按钮，将所有的信息显示输入框
			if($this.hasClass('btn_amend')){
				var $save = $('.putaway .saveOne');
				if($this.text() == '修改'){
					$save.show();
					$this.text('取消');
					$('.putaway .putaway_header .box1').show();
					$('.putaway .putaway_header .saveNewOne').hide();
					$('.putaway .putaway_header .cancelNewOne').hide();
				}else{
					$save.hide();
					$this.text('修改');
					$('.putaway .putaway_header .box1').hide();
					for(var attr in sArr){
						sArr[attr].val('');
					}
				}
			}else if($this.hasClass('btn_del')){
				// 获得当前的数据
				for(var attr in sArr){
					sArr[attr].val('');
				}
				var $jinggao = $('.putaway .jinggao');
				$jinggao.show();
				$jinggao.off('click').on('click','button',function(){
				var $this = $(this);
				if($this.hasClass('btn_ensure')){
					$.post(cm.baseUrl+'/deletePutaway',obj,function(result){
						if(result == 'true'){
						console.log(result);
							alert('删除成功');
							$tr.remove();
						}
					})
					$jinggao.hide();
					return false;
				}else{
					$jinggao.hide();
				}
				})
			}
			return false;
		})
		$('.putaway .putaway_header .btn_search').click(function(){
			var words = $('.putaway .putaway_header .words').val();
			$.post(cm.baseUrl+'/searchPutaway',{'keyword':words},function(result){
				createTab($('.putaway .putaway_content table tbody'),result);
			},'json');
		})
		function createTab(selector,data,If){
			if(If){
				var tr = $('<tr/>').html(data.map(function(item,idx){
					return `<td>
		  					<div class="checkbox">
		  					  <label>
		  					    <input type="checkbox" id="blankCheckbox" value="option1" aria-label="...">
		  					  </label>
		  					</div>
		  				</td>
		  				<td class="goodsId">${item.goodsId}</td>
		  				<td class="goodsName">${item.goodsName}</td>
		  				<td class="goodsType">${item.goodsType}</td>
		  				<td class="goodsSpec">${item.goodsSpec}</td>
		  				<td class="goodsPurchPrice">${item.goodsPurchPrice}</td>
		  				<td class="goodsSalePrice">${item.goodsSalePrice}</td>
		  				<td class="goodsNum">${item.goodsNum}</td>
		  				<td class="goodsImg"></td>
		  				<td class="goodsRemark">${item.goodsRemark}</td>
		  				<td>
		  					<button type="button" class="btn btn-warning btn-primary btn-xs btn_amend">修改</button>
		  					<button type="button" class="btn btn-danger btn-primary btn-xs btn_del">删除</button>
		  				</td>
					`
				}).join('')).attr('id',data[0]._id);			
				selector.append(tr);
				return false;
			}
			selector.html(data.map(function(item,idx){
				return 	`<tr id=${item._id}> 
				  				<td>
				  					<div class="checkbox">
				  					  <label>
				  					    <input type="checkbox" id="blankCheckbox" value="option1" aria-label="...">
				  					  </label>
				  					</div>
				  				</td>
				  				<td class="goodsId">${item.goodsId}</td>
				  				<td class="goodsName">${item.goodsName}</td>
				  				<td class="goodsType">${item.goodsType}</td>
				  				<td class="goodsSpec">${item.goodsSpec}</td>
				  				<td class="goodsPurchPrice">${item.goodsPurchPrice}</td>
				  				<td class="goodsSalePrice">${item.goodsSalePrice}</td>
				  				<td class="goodsNum">${item.goodsNum}</td>
				  				<td class="goodsImg"></td>
				  				<td class="goodsRemark">${item.goodsRemark}</td>
				  				<td>
				  					<button type="button" class="btn btn-warning btn-primary btn-xs btn_amend">修改</button>
				  					<button type="button" class="btn btn-danger btn-primary btn-xs btn_del">删除</button>
				  				</td>
	  				  	</tr>`
			}).join(''));
		}
	}
})