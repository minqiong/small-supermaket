/* 
* @Author: Marte
* @Date:   2017-10-17 11:48:23
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-19 21:53:33
*/

define(function(){
    return function(cn){
           
        $.post(cn.baseUrl+"/allProduct",function(response){
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
                    <td>${item.price}</td>
                    <td>${item.people}</td>
                    <td>${item.supplier}</td>
                    <td><button class="btn edit btn-warning"  objectid="${item.id}">编辑</button><button class="btn del btn-danger">删除</button></td>
                    </tr>`
                })
                $('.table tbody').append(html);
            }
        });
         // 增加商品
        $('.add').on('click',function(){
            var random = parseInt(Math.random()*1000000);
            var params = {
                id:random,
                type: $('#type').val(),
                name: $('#name').val(),
                size: $('#size').val(),
                price: $('#price').val(),
                num: $('#num').val(),
                people: $('#people').val(),
                supplier: $('#supplier').val(),
            }
            $.post(cn.baseUrl+"/addProduct", params, function(response){
                // var response = JSON.parse(response);
                if(response){
                    // window.location.reload();
                    var addRes = params;
                    console.log(addRes.id);
                    var $tr=$('<tr/>');
                    var html='<td>'+addRes.id+'</td><td>'+addRes.type+'</td><td>'+addRes.name+'</td><td>'+addRes.size+'</td><td>'+addRes.num+'</td><td>'+addRes.price+'</td><td>'+addRes.people+'</td><td>'+addRes.supplier+'</td><td><button class="btn edit btn-warning"  objectid="' + addRes.id + '" >编辑</button><button class="btn del btn-danger" objectid="' + addRes.id + '">删除</button></td>'
                    
                    
                    $('.table tbody').append($tr.html(html));
                } else {
                    alert(response.message);
                }
            })
        })

        // 商品搜索
        $('.serach').on('click',function(){
            $.post(cn.baseUrl+"/serachProduct",{name:$('#serach').val()},
                function(response){
                    // var response = JSON.parse(response);
                    if(response){
                        $('.table tbody').html('');
                        var html=response.map(function(item){
                            return `<tr>
                            <td>${item.id}</td>
                            <td>${item.type}</td>
                            <td>${item.name}</td>
                            <td>${item.size}</td>
                            <td>${item.num}</td>
                            <td>${item.price}</td>
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
                    // console.log($btn.closest('tr'))
                    $('.delbox').css('display','none');
                    
                    $('.button').parent().parent().remove();
                    $.post(cn.baseUrl+"/delProduct",{id:$btn.closest('tr').firstElementChild.innerText},function(response){
                        alert('删除成功');
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

                 var arry1 = ['id','type','name','size','price','num','people','supplier'];
                
                var arr1=($(this).parent().siblings()).get();
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
                $(this).html('完成');

            }else{
              
                $(this).html('编辑');

                $.each(this.parentNode.parentNode.children,function(idx,ele){
           
                    
                        if(!(ele === ele.parentNode.firstElementChild || ele === ele.parentNode.lastElementChild)){

                            ele.innerHTML = ele.firstElementChild.value;
                        }

                })

                var arry2 = ['id','type','name','size','num','price','people','supplier'];
                
                var arr2 = ($(this).parent().siblings()).get();
        
                arr2.forEach(function(item,idx){
                   
                    res2[arry2[idx]] = JSON.stringify(item.innerText);
                
                })
                // console.log(JSON.stringify(res1),JSON.stringify(res2));
               
                $.post(cn.baseUrl+"/editProduct",res2,function(response){

                })

            }
            
        })


    }
});