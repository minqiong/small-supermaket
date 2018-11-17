$.fn.datagrid = function(opts){
    var _defalt = {
        url: '',
        opdelete: {url:'',type:'get'},
        opupdate: {url:'',type:'get'},
        cols: null,
        edit: false,
        delete: false
    }
    var options = $.extend(_defalt, opts);
    var cols = options.cols ? options.cols.split(',') : options.cols;
    var container = $(this);

    var init = function(){
        var $table = $('<table class="table table-striped .table-responsive table-hover table-full-width"></table>').click(function(event){
            events(event);
        });
        var $thead = $('<thead></thead>');
        var $tbody = $('<tbody></tbody>');
        $.get('libs/dictionary/commonDic.txt', function(dic){
            var dicObj = JSON.parse(dic);
            $.get(options.url, function(response){
                //生成 thead
                var $tr = $('<tr></tr>');
                for(var i = 0; i < cols.length; i++){
                    if(!cols || (cols && cols.indexOf(cols[i]) > -1)){
                        $("<th></th>").text(dicObj["cn"][cols[i]] || cols[i]).appendTo($tr);
                    }
                }
                if(options.edit){
                    $('<th></th>').text('修改').appendTo($tr);
                }
                if(options.delete){
                    $('<th></th>').text('删除').appendTo($tr);
                }               
                $tr.appendTo($thead);
                $thead.appendTo($table);

                //生成 tbody
                for(var i = 0; i < response.length; i++){
                    $tr = $('<tr></tr>');
                    for(var key in response[i]){
                        if(!cols || (cols && cols.indexOf(key) > -1)){
                            $("<td></td>").text(response[i][key]).appendTo($tr);
                        }
                    }
                    if(options.edit){

                        $('<td><button class="btn btn-warning btn-sm update" flag="edit" objectid="' + response[i]['id'] + '"><i class="glyphicon glyphicon-pencil"></i>修改</button></td>').appendTo($tr);
                    }
                    if(options.delete){
                        $('<td><button class="btn btn-danger btn-sm delete" flag="delete" objectid="' + response[i]['id'] + '"><i class="glyphicon glyphicon-trash"></i>删除</button></td>').appendTo($tr);
                    }                   
                    $tr.appendTo($tbody);
                }
                $tbody.appendTo($table);

                $table.appendTo(container);
            })
            // 生成弹窗
            var popStr='';
            $('.popGoods .form-group label').remove();
            $('.popGoods .form-group input').remove();
            $('.popGoods .form-group br').remove();
            cols.forEach(function(key){

                popStr+=`
                    <label for="${key}">${dicObj["cn"][key]} ：</label>
                    <input type="text" class="form-control" id="${key}"><br />
                `

            })
            $('.popGoods .form-group').prepend(popStr);

        })
    }

    init();
    // -----以下在自己的js里写------
    var events = function(event){
        var currObj = $(event.target);
        if(currObj.is('button') && currObj.attr('flag') == 'delete'){
            //do delete

            $.ajax({type: options.opdelete.type,
                url: options.opdelete.url,
                data: {id: currObj.attr('objectid')}, 
                success: function(response){
                            if(response == 'true'){
                                currObj.closest('tr').remove();
                            } else {
                                //输出错误信息
                            }
                        }
            });

        }else if(currObj.is('button') && currObj.attr('flag') == 'edit'){
            //do edit
            $('.modal').modal('toggle');
            $('#modify').attr("disabled", false);
            $('#commit').attr("disabled", true);
            var predata = {};
            var td = $(event.target).parent().parent().children();
            var input = $('.popGoods .form-group').children('input');
            for(var i=0;i<td.length;i++){
                $(input[i]).val($(td[i]).text());
            }

            cols.forEach(function(item,idx){
                predata[item] = $(td[idx]).text();
            })
        }

        $('.popGoods').on('click','#modify',function(e){
            e.stopPropagation();
            var data = {};
            cols.forEach(function(item,idx){
                data[item] = JSON.stringify($(input[idx]).val());
            });
            $.ajax({type: options.opdelete.type,
                    url: options.opupdate.url,
                    data: {data: data,predata: {id: currObj.attr('objectid')}}, 
                    success: function(response){
                               // $(that).replaceWith(response);
                               // update();  
                        $('.popGoods').unbind('click');
                    }
            });
            for(var i=0;i<td.length;i++){
               $(td[i]).text($(input[i]).val());
           }
           $('.modal').modal('toggle');

        });
        
    }
}