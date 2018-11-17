/* 
* @Author: Marte
* @Date:   2017-10-18 17:49:28
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-21 15:39:10
*/

define(function(){
    return function(cm){
        var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                    + " " + date.getHours() + seperator2 + date.getMinutes()
                    + seperator2 + date.getSeconds();


        var random = parseInt(Math.random()*10000000)
        $('#date').html(date);
        $('#random').html(random);
        $('.min-returns-cover').hide();
        var timer;
        var goodsNumArr= new Array();

        $("#money-pay").on('click', function(){
            alert('本次交易已完成');
            $('table tbody').html('');
            $('.t_price').text('');
        });
        function total(){
            // var totalPrice=null;
            $('.table tbody tr').each(function(){
                // console.log($(this).find('.goodsSalePrice'));
                var price=$(this).find('.goodsSalePrice').text()*1;
                var min_num=$(this).find('.min_num').text()*1;
                // console.log(price, min_num);
                totalPrice+=price*min_num;
            });
            $('.t_price').text(totalPrice);
        }
        var totalPrice = 0;
        $(window).on('keydown',function(e){
            
            if(e.keyCode==13){

                var goodsNum = $('#goods').val();
                $('#goods').val('');
                if(goodsNumArr.indexOf(goodsNum) > -1){

                    var $td=$('.goodsNum').next().next();
                    $td.text($td.text()*1+1);
                    totalPrice=0;
                    total();
                }else{
                    goodsNumArr.push(goodsNum);
                    $.get(cm.baseUrl+'/pay_getGoods',{'goodsNum':goodsNum},function(result){

                        if(result && result.length > 0){
                            // 获得当前tr的数量
                            // var i = $('table tbody').children().length+1;
                            var $tr=$('<tr/>');
                            // $('<td/>').text(i).appendTo($tr);
                            var item = result[0];
                            for(var attr in item){
                                if(attr != '_id' && attr != 'goodsProducer' && attr != 'goodsStore' && attr != 'goodsPurchPrice'){

                                    $('<td class="'+ item[attr]+'">' +item[attr]+ '</td>').addClass(attr).appendTo($tr);
                                }
                            }
                            $('<td class="min_num" objectid='+ item['_id']+' preNum='+ item['goodsStore']+'>1</td>').appendTo($tr);
                            $tr.appendTo($('table tbody'));
                            totalPrice=0;
                            total();
                            return false;
                        }else{
                            // alert('没有找到商品');
                        }
                    },'json');
                }
            };
        });
        // 点击结算，开始监听
        var ws;
        $('.topay').on('click',function(){
            $('#cashier_code').html('');
            var qrcode = new QRCode(document.getElementById('cashier_code'),{
                width:200,
                height:200
            });
            // 192.168.191.1
            $('.min-returns-cover').show();
            qrcode.makeCode('http://192.168.191.1:8080/Norma/client/html/payment.html?price='+totalPrice);
            var ws = new WebSocket("ws://192.168.191.1:888");
            ws.onmessage = function(_msg){
                console.log(_msg)
                if(_msg.data == '支付成功'){
                    alert('支付成功');
                    $('.min-returns-cover').hide();

                    // 修改库存
                    var dataAry=[];
                    var predata=[];
                    for(var i=0;i<$('.goodsNum').length;i++){
                        dataAry.push($($('.min_num')[i]).attr('preNum')-$($('.min_num')[i]).text());
                        predata.push($($('.min_num')[i]).attr('objectid'));
                    }
                    $.get(cm.baseUrl+'/goods/updateGoodsNum',{data:dataAry,predata:predata},function(result){

                    });
                    // 写入销售记录
                    
                    var sale_data = [];

                    for(var i=0;i<$('.goodsNum').length;i++){
                        var sale_record = {};
                        sale_record.saleType=$($('.goodsType')[i]).text();
                        sale_record.saleName=$($('.goodsName')[i]).text();
                        sale_record.saleSpec=$($('.goodsSpec')[i]).text();
                        sale_record.salePrice=$($('.goodsSalePrice')[i]).text();
                        sale_record.saleNum=$($('.min_num')[i]).text();
                        sale_data.push(sale_record);
                    }
                    console.log(sale_data)
                    $.get(cm.baseUrl+'/goods/sale_record',{sale_data:sale_data},function(result){
                        
                    });
                    // 打印小票
                    var parper = '';
                    for(var i=0;i<$('.goodsNum').length;i++){
                        var name=$($('.goodsName')[i]).text();
                        var price=$($('.goodsSalePrice')[i]).text();
                        var num=$($('.min_num')[i]).text();
                        parper += `${name}               ${price}       ${num}\n`;
                    }

                    // $.post("http://10.3.131.33:81/print",
                    //     {text: "悦当家超市收银系统 \n"
                    //         +'*************************************\n'
                    //         +'商品名称      单价     数量'+'\n'
                    //         +parper
                    //         +'总价：'+ totalPrice+'\n'
                    //         +'买单时间：'+currentdate+'\n'
                    //         +'*************************************\n'
                    //         },function(res){
                    //             console.log(res);
                    //             if(res.status){
                                    
                                    $('table tbody tr').remove(); 
                                    $('.t_price').text('');
                    //             }
                    // })
    
                    ws.close();
                }
              
            }      
            ws.onopen = function(){
                ws.send('端口已开启');
            } 
            
        });



    }
});
