define(function(){
    return function(Cm){
        $('.login-cover').find('img').css({
            display: 'block',
            width: '100%',
            height: '100%'
        });
        $('#level').click(function(){
            $('#level').next().show();
        });
        
        $('#level').next().on('mouseover', 'li', function(){
            $(this).addClass('active').siblings().removeClass('active');
            $(this).click(function(){
                $('#level').val($(this).text());
                $('#level').next().hide();
            });
        });
        $('.login_btn').click(function(){
            var attr={
                "普通用户": 'u0',
                "会员用户": 'u4',
                "普通管理员": 'u2',
                "销售员": 'u3',
                "高级管理员": 'u1'
            }
            var str={
                userName: $('#login_username').val(),
                userPassword: $('#login_password').val(),
                userLevel: attr[$('#level').val()]
            };
            if($('#login_username').val() == ''){
                alert('请输入用户名');
                 return false;
            }else if($('#login_password').val() == ''){
                alert('请输入账号密码');
                 return false;
            }else if($('#level').val() == ''){
                alert('请选择用户等级');
                 return false;
            }else if($('#level').val() == '普通用户' || $('#level').val() == '会员用户'){
                alert('不能使用此等级登录...');
                return false;
            }
            $.post(Cm.baseUrl+'/login', str, function(result){
                if(result.msg.length >0){
                    $('.login_tips').text('');
                    $('.login').hide();
                    $('.min_name').text(str.userName);
                    // document.cookie='token='+result.token+'; path=/';
                    document.cookie='name='+$('#login_username').val()+'; path=/';
                }else{
                    $('.login_tips').text('请重新登录');
                    $('#login_username').val('');
                    $('#login_password').val('');
                }
            }, 'json');
            
        });
    }
});