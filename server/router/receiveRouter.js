/* 
* @Author: Marte
* @Date:   2017-10-18 11:55:25
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-18 12:10:41
*/

var db = require('../db1.js');
var bodyparser = require('body-parser');
var urlencode = bodyparser.urlencoded({extended: false});

module.exports = {
    
    Receive:function(app){
        //加载所有数据 
        app.post("/allpurchase",urlencode,function(request, response){
            db.selects('select * from receive;', function(rows){
                response.send(rows);
            })
            // db.select("receive",{},function(result){
            //             response.send(result);
            
            // })
        });

        //增加商品
        app.post("/addreceive", urlencode, function(request, response){
            var str = '';
            var params = '';
            for(var attr in request.body){
                str+= attr+',';
                params+='"'+request.body[attr]+'",';
            }
            str = str.slice(0,-1);
            params = params.slice(0,-1);
            var userModSql = 'insert into receive ('+str+') values ('+params+')';
            db.insert(userModSql, function(rows){
                response.send(rows);
            })
            // db.insert("receive", request.body, function(result){
            //             response.send(result);
                        
            
            // })
        });

        
        //商品查找
        app.post("/serachreceive",urlencode,function(request,response){
            var str = '';
            var params = '';
            for(var attr in request.body){
                str+= attr+'='+request.body[attr]+' and ';
            }
            str = str.slice(0,-1);
            str = str.slice(0,-1);
            str = str.slice(0,-1);
            str = str.slice(0,-1);
            var sql = 'select * from receive where '+str;
            db.selects(sql, function(result){
                response.send(result);

            });
        })

        //删除
        app.post("/delreceive",urlencode,function(request,response){
            var id = request.body.id;
            var userModSql = 'DELETE FROM receive WHERE id ='+id;
            db.update(userModSql, function(rows){
                response.send('true');
            })
            // db.delete("receive", {id: request.body.id}, function(result){

            //     response.send(result);
            // })
        })

        //修改
        app.post("/editreceive",urlencode,function(request,response){
            console.log(request.body);
            var datas = JSON.parse(request.body.datas);
            var newdata = JSON.parse(request.body.newdata);
            // console.log(datas);
            // console.log(newdata);
            db.update("receive",datas,newdata,function(result){

                response.send(result);
            })
        })
    }
}