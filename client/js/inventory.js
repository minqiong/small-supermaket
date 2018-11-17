define(function(){
    return function(Cm){
        // function addTo_reposity(){
            $('.addTo_reposity').click(function(){
                var repStr=new Object();
                $('#procode').val() !== ''? repStr.procode=$('#procode').val():repStr;
                $('#proclass').val() !== ''? repStr.proclass=$('#proclass').val() :repStr;
                $('#proname').val() !== ''? repStr.proname=$('#proname').val():repStr;
                $('#prospe').val() !== ''? repStr.prospe=$('#prospe').val():repStr;
                $('#pronum').val() !== ''? repStr.pronum$('#dulman').val():repStr;

                $.post(Cm.baseUrl+'/addTo_reposity', repStr, function(result){
                    console.log(result);
                }, 'json');
            });
            
        // }
        $('.search-all-Btn').click(function(){
            $.post(Cm.baseUrl+'/inv-search-all', function(result){
                $('.insertDatas').html('');
                $.each(result.data, function(idx, item){
                    var tr=$('<tr/>');
                    $.each(item, function(res, val){
                        if(res !== '_id'){
                            $('<td class="'+res+'"></td>').text(val).appendTo(tr);
                        }
                    });
                    tr.appendTo('.insertDatas');
                });
            }, 'json');
        });

        $('#dan-tips').click(function(){
            show_dan();
        });
        function show_dan(){
            if($('#dan-tips').prop('checked')){
                var res=$(this).prop('checked')?$('.dan-num').val():'0';
                $('.insertDatas tr').each(function(){
                    if($(this).children().hasClass('pronum')){
                        $('.insertDatas .pronum').text()<res?$(this).addClass('active'):$(this).removeClass('active');
                    }
                });
            }else{
                $('.insertDatas tr').each(function(){
                    $(this).removeClass('active');
                });
            }
        }

        $('.search-some-Btn').click(function(){
            $('.min-inv-cover').show();
            return false;
        });
        $('.cancle').click(function(){
            $('.min-inv-cover').hide();
            return false;
        });
        $('.searchBtn').click(function(){
            var searchStr=new Object();
            $('#proclass').val() !== ''? searchStr.proclass=$('#proclass').val() :searchStr;
            $('#proname').val() !== ''? searchStr.proname=$('#proname').val():searchStr;
            $('#procode').val() !== ''? searchStr.procode=$('#procode').val():searchStr;
            $('#prospe').val() !== ''? searchStr.prospe=$('#prospe').val():searchStr;
            $('#supplier').val() !== ''? searchStr.supplier=$('#supplier').val() : searchStr;
            $('#dulman').val() !== ''? searchStr.dulman=$('#dulman').val():searchStr;

            $.post(Cm.baseUrl+'/inv-somedata', searchStr, function(result){
                writeResult(result);
            },'json');
            $('.form-group input').val('');
            $('.min-inv-cover').hide();
            return false;
        });
        function writeResult(result){
            $('.insertDatas').html('');
            $.each(result.data, function(idx, item){
                var tr=$('<tr/>');
                $.each(item, function(res, val){
                    if(res !== '_id'){
                        $('<td class="'+res+'"></td>').text(val).appendTo(tr);
                    }
                });
                tr.appendTo('.insertDatas');
            });
        }
    }
});