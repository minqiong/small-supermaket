define(function(){
	return function(ret){
		$(document).ready(function () {
            $('.goodstable').datagrid({
                url: ret.baseUrl + '/goods/showGoods',
                opdelete: {url:ret.baseUrl + '/goods/deleteGoods',type:'get'},
                opupdate: {url:ret.baseUrl + '/goods/updateGoods',type:'get'},
                cols: 'goodsType,goodsName,goodsSpec,goodsNum,goodsPurchPrice,goodsSalePrice,goodsProducer,goodsStore',
                edit: true,
                delete: true
            })
			var array = ['goodsType','goodsName','goodsSpec','goodsNum','goodsPurchPrice','goodsSalePrice','goodsProducer','goodsStore'];
            newGoods();
            fuzzySelect();
            exactSelect();
            function newGoods(){
               $('#newGoods').click(function(){
                   $('.modal').modal('toggle');
               })
               $('#commit').click(function(){
                    var popInput = $('.popGoods .form-group').children('input');
                    var data = {};
                    var $tr = $('<tr></tr>');
                    var id = null;
                    array.forEach(function(item,idx){
                        data[item] = $(popInput[idx]).val();
                        $tr.append('<td>'+$(popInput[idx]).val()+'</td>')
                    })


       
                   $.get(ret.baseUrl+"/goods/addGoods",data, 
                       function(response){
                      $('<td><button class="btn btn-warning btn-sm update" flag="edit"  objectid="' + 1 + '" ><i class="glyphicon glyphicon-pencil"></i>修改</button></td>').appendTo($tr);


                      $('<td><button class="btn btn-danger btn-sm delete" flag="delete"  objectid="' + 1 + '" ><i class="glyphicon glyphicon-trash"></i>删除</button></td>').appendTo($tr);

                   });
                   $('tbody').append($tr);
                   $('.modal').modal('toggle');

               });
               $('#modify').attr("disabled", true);
               $('#commit').attr("disabled", false);
	       }
	       
	       function fuzzySelect(){
	           $('#fuzzySelectBtn').click(function(){

	               var val = $('#search').val();
	               var searchStr = '';
	               $('.goodstable tbody td').each(function(idx,ele){
	                   if(ele.innerText==val){
	                       searchStr += '<tr>'+$(ele).parent().html()+'</tr>';
	                   }
	               })
	               $('.goodstable tbody').html(searchStr);
	               return false;
	           })
	       }
         // 搜索
	       function exactSelect(){
	           $('#exactSelectBtn').click(function(){
	               var goodsObj={};
	               $('.exactSelect input').each(function(idx,ele){
	                   if($(ele).val().length>0){
	                       goodsObj[array[idx]] = JSON.stringify($(ele).val());
	                   }
	               });
	               $.get(ret.baseUrl+"/goods/selectGoods",goodsObj, 
	                   function(response){
                            $('tbody tr').remove();
                            response.forEach(function(item,idx){
                                var $tr = $('<tr></tr>');
                                array.forEach(function(ele,idx){
                                    $tr.append('<td>'+item[array[idx]]+'</td>');
                                })
                                $('<td><button class="btn btn-warning btn-sm update" flag="edit" objectid="' + item.id + '" ><i class="glyphicon glyphicon-pencil"></i>修改</button></td>').appendTo($tr);


                                $('<td><button class="btn btn-danger btn-sm delete" flag="delete" objectid="' + item.id + '" ><i class="glyphicon glyphicon-trash"></i>删除</button></td>').appendTo($tr);
                                $('tbody').append($tr);
                            })
	               });
	               return false;
	           })
	       }
		})
	}
})