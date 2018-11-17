/* 
* @Author: Marte
* @Date:   2017-10-16 19:45:37
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-19 11:59:37
*/

define(function(){
    return function(ret){
        $(document).ready(function () {
           $('.goodstable').datagrid({
               url: ret.baseUrl + '/producer/showProducer',
               opdelete: {url:ret.baseUrl + '/producer/deleteProducer',type:'get'},
               opupdate: {url:ret.baseUrl + '/producer/updateProducer',type:'get'},
               cols: 'producerNum,producerType,producerName,producerLinkman,producerPhone,producerAddress',
               edit: true,
               delete: true
           }) 
           newProducer();
           fuzzySelect();
           exactSelect();

           var array = ['producerNum','producerType','producerName','producerLinkman','producerPhone','producerAddress'];
          function newProducer(){
               $('#newProducer').click(function(){
                  $('.modal').modal('toggle');
              })
              $('#commit').click(function(){
                   var popInput = $('.popGoods .form-group').children('input');
                   var data = {};
                   var $tr = $('<tr></tr>');
                   array.forEach(function(item,idx){
                       data[item] = $(popInput[idx]).val();
                       $tr.append('<td>'+$(popInput[idx]).val()+'</td>')
                   })


                   $('<td><button class="btn btn-warning btn-sm update" flag="edit" ><i class="glyphicon glyphicon-pencil"></i>修改</button></td>').appendTo($tr);


                   $('<td><button class="btn btn-danger btn-sm delete" flag="delete" ><i class="glyphicon glyphicon-trash"></i>删除</button></td>').appendTo($tr);
      
                  $.get(ret.baseUrl+"/producer/addProducer",data, 
                      function(response){
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

           function exactSelect(){
               $('#exactSelectBtn').click(function(){
                   var producerObj={};
                   $('.exactSelect input').each(function(idx,ele){
                       if($(ele).val().length>0){
                           producerObj[array[idx]] = JSON.stringify($(ele).val());
                       }
                   });
                   $.get(ret.baseUrl+"/producer/selectProducer",producerObj, 
                       function(response){
                               $('tbody tr').remove();
                               // var response = JSON.parse(response);
                               response.forEach(function(item,idx){
                                // .log(item);alert
                                   var $tr = $('<tr></tr>');
                                   array.forEach(function(ele,idx){
                                       $tr.append('<td>'+item[array[idx]]+'</td>');
                                   })
                                   $('<td><button class="btn btn-warning btn-sm update" flag="edit"  objectid="' + item.id + '"><i class="glyphicon glyphicon-pencil"></i>修改</button></td>').appendTo($tr);


                                   $('<td><button class="btn btn-danger btn-sm delete" flag="delete"   objectid="' + item.id + '"><i class="glyphicon glyphicon-trash"></i>删除</button></td>').appendTo($tr);
                                   $('tbody').append($tr);
                               })
                   });
                   return false;
               })
           }
        })
    }
})