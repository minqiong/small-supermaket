require(['config'],function(){

    require(['jquery','Common','qrcode','Putaway', 'Returns', 'Goods', 'Inventory', 'Producer', 'Purchase','Receive', 'Login', 'Users','cashier','Datagrid'], function($,Cm,qrcode,Putaway,Returns, Goods, Inventory, Producer, Purchase, Receive, Login, Users,cashier,Datagird){

        // $('#main-content').load('html/putaway.html div.putaway');
        // htmlp
        var f = {
            putaway:Putaway,
            goods:Goods,
            returns:Returns,
            inventory:Inventory,
            goods:Goods,
            producer:Producer,
            purchase:Purchase,
            receive:Receive,
            login:Login,
            users:Users,
            cashier:cashier
        }
        // $('#main-content').load('html/login.html', function(){
        //     Login(Cm);
        // });
        $('.exit').click(function(){
            // $('#main-content').load('html/login.html', function(){
            //     Login(Cm);
            // });
        // })

        })
        // var cookie=document.cookie;
        // tokenArr=cookie.split('=');
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
            }else if(str[0] == 'name'){
                $('.min_name').text(str[1]);
            }else{
                $('#main-content').load('html/login.html', function(){
                    Login(Cm);
                });
            }
        }
        $('.sideBar').on('click','li',function(){
            var name = this.className;
            $('#main-content').load('html/'+name+'.html', function(){
            	f[name](Cm);
            });
        });
       
    });
});
