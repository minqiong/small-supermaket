define(function(){
    return function(Cm){        
        // var cookie=document.cookie;
        // tokenArr=cookie.split('=');
        // console.log()
        // for(var key in tokenArr){
        //     if(tokenArr[key] == 'token'){
        //         var token=tokenArr[1];
        //         break;
        //     }
        // }
        var cookie=document.cookie;
        tokenArr=cookie.split('; ');
        for(var key in tokenArr){
            var str=tokenArr[key].split('=');
            if(str[0] == 'token'){
                var token=str[1];
            }
        }
        // 增加退货单部分
        var dataObj;
        $('.codeBtn').click(function(){
            $.ajax({
                type: 'post',
                url: Cm.baseUrl+'/return_procode',
                headers: {'Authorization': token},
                success: function(result){
                    console.log(result)
                    dataObj=result;
                    var ul=$('<ul class="code-ret-ul"></ul>');
                    ul.html('');
                    ul.html(
                        result.map(function(item,idx){
                            return `<li>${item.id}</li>`;
                        }).join('')
                    ).appendTo('.code-ret');
                },
                dataType:'json'
            });
            return false;
        });
        $('.code-ret').on('click', 'li', function(){
            $(this).parent().prev().val($(this).text());
            $('.code-ret-ul').hide();
            var self=this;
            $.each(dataObj, function(idx, item){
                if(item.id == $(self).text()){
                    $('.ret-type').val(item.type);
                    $('.ret-name').val(item.name);
                    $('.ret-size').val(item.size);
                    $('.ret-num').val(item.num);
                    $('.ret-sup').val(item.supplier);
                    $('.ret-pri').val(item.price);
                    $('.ret-total').val(item.price*item.num);
                }
            });
            return false;
        });
        $('.min-btn-add').click(function(){
            var addStr = new Object();
            addStr.procode = $('.ret-code').val();
            addStr.proclass = $('.ret-type').val();
            addStr.proname = $('.ret-name').val();
            addStr.prospe = $('.ret-size').val();
            // addStr.retdata = $('.ret-date').val();
            addStr.retqty = $('.ret-num').val();
            addStr.retprice = $('.ret-pri').val();
            addStr.total = $('.ret-total').val();
            addStr.dulman = $('.ret-man').val();
            addStr.supplier = $('.ret-sup').val();

            $.post(Cm.baseUrl+'/returns_insert', addStr, function(result){
                $('.true-message').show();
                if(result.affectedRows == 1){
                    $('.true-message p').text('已成功插入数据...');
                    $('.true-message').show();
                    var tr=$('<tr/>');
                    $.each(addStr, function(idx, item){
                        $('<td/>').text(item).appendTo(tr);
                    });
                    tr.appendTo('.insertAllData');
                }else if(result.status == false){
                    $('.true-message p').text(result.message);
                }else{
                    $('.true-message p').text(result.message);
                }
            }, 'json');
            return false;
        });
        $('.true-close').click(function(){
            $('.true-message').hide();
        })
        //查询全部记录
        $('.alldata').click(function(){
            $.get(Cm.baseUrl+'/alldata', function(result){
                writeResult(result);
            }, 'json');
            return false;
        });

        //查询模块
        $('.btnSearch').click(function(){
            $('.min-returns-cover').show();
            return false;
        });
        $('.cancle').click(function(){
            $('.min-returns-cover').hide();
        });
        $('.searchBtn').click(function(){
            var searchStr=new Object();
            $('#proclass').val() !== ''? searchStr.proclass=JSON.stringify($('#proclass').val()) :searchStr;
            $('#supplier').val() !== ''? searchStr.supplier=JSON.stringify($('#supplier').val()) : searchStr;
            $('#proname').val() !== ''? searchStr.proname=JSON.stringify($('#proname').val()):searchStr;
            $('#dulman').val() !== ''? searchStr.dulman=JSON.stringify($('#dulman').val()):searchStr;
            $('#procode').val() !== ''? searchStr.procode=$('#procode').val():searchStr;
            // $('#retdata').val() !== ''? searchStr.retdata=$('#retdata').val():searchStr;
            $('#prospe').val() !== ''? searchStr.prospe=JSON.stringify($('#prospe').val()):searchStr;

            $.post(Cm.baseUrl+'/somedata', searchStr, function(result){
                writeResult(result);
            },'json');
            $('.form-group input').val('');
            $('.min-returns-cover').hide();
            return false;
        });
        function writeResult(result){
            $('.insertAllData').html('');
            $.each(result, function(idx, item){
                var tr=$('<tr/>');
                $.each(item, function(res, val){
                    if(res !== '_id'){
                        $('<td/>').text(val).appendTo(tr);
                    }
                });
                tr.appendTo('.insertAllData');
            });
        }
    };
});