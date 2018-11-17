/* 
* @Author: Marte
* @Date:   2017-10-17 18:27:21
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-19 11:55:44
*/

define(function(){
     return function(cn){
 
            $.post(cn.baseUrl+"/allpurchase",function(response){
                // var response = JSON.parse(response);
                if(response){
                    var res = response;
                    
                    var html=res.map(function(item){
                        return `<tr>
                        <td>${item.id}</td>
                        <td>${item.type}</td>
                        <td>${item.name}</td>
                        <td>${item.size}</td>
                        <td>${item.num}</td>
                        <td>${item.people}</td>
                        <td>${item.supplier}</td>
                        <td><button class="btn edit btn-warning">编辑</button><button class="btn del btn-danger">删除</button></td>

                        </tr>`
                    })
                    $('.table tbody').append(html);
                }
            });
             // 增加商品
            $('.add').on('click',function(){
                var random = parseInt(Math.random()*1000000);
                var date = new Date().toLocaleDateString();
                
                $.post(cn.baseUrl+"/addreceive", {
                    id:random,
                    type: $('#type').val(),
                    name: $('#name').val(),
                    size: $('#size').val(),
                    // price: $('#price').val(),
                    num: $('#num').val(),
                    people: $('#people').val(),
                    supplier: $('#supplier').val(),
                }, function(response){
                    // var response = JSON.parse(response);
                    if(response){
                        
                        var addRes = response;
                        var $tr=$('<tr/>');
                        var html='<td>'+addRes.id+'</td><td>'+addRes.type+'</td><td>'+addRes.name+'</td><td>'+addRes.size+'</td><td>'+addRes.num+'</td><td>'+addRes.people+'</td><td>'+addRes.supplier+'</td><td><button class="btn edit btn-warning">编辑</button><button class="btn del btn-danger">删除</button></td>';
                        
                        
                        $('.table tbody').append($tr.html(html));
                    } else {
                        alert(response.message);
                    }
                })
            })

            // 商品搜索
            $('.serach').on('click',function(){
                $.post(cn.baseUrl+"/serachreceive",{name: JSON.stringify($('#serach').val())},
                    function(response){
                        if(response){
                            $('.table tbody').html('');
                            var html=response.map(function(item){
                                return `<tr>
                                <td>${item.id}</td>
                                <td>${item.type}</td>
                                <td>${item.name}</td>
                                <td>${item.size}</td>
                                <td>${item.num}</td>
                                <td>${item.people}</td>
                                <td>${item.supplier}</td>
                                <td><button class="btn edit btn-warning">编辑</button><button class="btn del btn-danger">删除</button></td>

                                </tr>`
                    })
                    $('.table tbody').append(html);
                        }
                        
                    })
            })


            // 商品删除
            $('.table').on('click','.del',function(){
                $(this).addClass('button');
                $('.delbox').css('display','block');
                // 取消
                $('.cancel').on('click',function(){
                    $('.delbox').css('display','none');
                })

                // 删除
                $('.box_del').on('click',function(){
                    var $btn = $('.button')[0];
                    
                    $('.delbox').css('display','none');
                    
                    $('.button').parent().parent().remove();
                    $.post(cn.baseUrl+"/delreceive",{id:$btn.parentNode.parentNode.firstElementChild.innerText},function(response){

                    })
                })
               
            })

            //商品修改
            
            var res1 = {};
            var res2 = {};
            $('.table').on('click','.edit',function(){
                $(this).toggleClass('complete');
                
                
                if($(this).hasClass('complete')){
                 
                    $.each(this.parentNode.parentNode.children,function(idx,ele){
               
                       // 生成一个输入框
                                var input = document.createElement('input');
                                input.type = 'text';
                                input.value = ele.innerText;

                                // 把输入框写入td
                                
                                if(!(ele === ele.parentNode.firstElementChild || ele === ele.parentNode.lastElementChild)){
                                    ele.innerHTML = '';
                                    ele.appendChild(input);
                                }

                    })

                     var arry1 = ['id','type','name','size','num','people','supplier'];
                    
                    var arr1=($(this).parent().siblings()).get();
                    console.log(arr1)
                    arr1.forEach(function(item,idx){

                        if(idx == 0){
                           res1[arry1[idx]]=item.innerText;
                           // console.log(item)
                        }else{
                            res1[arry1[idx]]=item.firstElementChild.value;
                            // console.log(item.firstElementChild.value)
                        }
                        // console.log(res);
                       
                    })
                    console.log(res1);
                    $(this).html('完成');

                }else{
                  
                    $(this).html('编辑');

                    console.log(this);
                   
                    $.each(this.parentNode.parentNode.children,function(idx,ele){
               
                        
                            if(!(ele === ele.parentNode.firstElementChild || ele === ele.parentNode.lastElementChild)){

                                ele.innerHTML = ele.firstElementChild.value;
                            }

                    })

                    var arry2 = ['id','type','name','size','num','people','supplier'];
                    
                    var arr2 = ($(this).parent().siblings()).get();
            
                    arr2.forEach(function(item,idx){
                       
                        res2[arry2[idx]] = item.innerText;
                    
                    })
                    // console.log(JSON.stringify(res1),JSON.stringify(res2));
                   
                    $.post(cn.baseUrl+"/editreceive",{datas:JSON.stringify(res1),newdata:JSON.stringify(res2)},function(response){

                    })

                }
                
            })

      
    }
})
   
