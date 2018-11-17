/* 
* @Author: Marte
* @Date:   2017-10-17 14:38:52
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-19 13:06:28
*/

var db = require('../db1.js');
var bodyparser = require('body-parser');
var urlencode = bodyparser.urlencoded({extended: false});

module.exports = {
    
    purchase:function(app){
        //加载所有数据 
        app.post("/allProduct",urlencode,function(request, response){
            db.selects('select * from purchase;', function(rows){
                response.send(rows);
            })    
        });

        //增加商品
        app.post("/addProduct", urlencode, function(request, response){
            var str = '';
            var params = '';
            for(var attr in request.body){
                str+= attr+',';
                params+='"'+request.body[attr]+'",';
            }
            str = str.slice(0,-1);
            params = params.slice(0,-1);
            var userModSql = 'insert into purchase ('+str+') values ('+params+')';
            db.insert(userModSql, function(rows){
                response.send(rows);
            })
        });

        
        //商品查找
        app.post("/serachProduct",urlencode,function(request,response){
            var str = request.body.name;
            var sql = "select * from purchase where id like '%"+str+"%' or type like '%"+str+"%' or name like '%"+str+"%' or size like '%"+str+"%' or num like '%"+str+"%' or price like '%"+str+"%'";
            console.log(sql);
            db.selects(sql, function(result){
                response.send(result);

            });
        })

        //删除
        app.post("/delProduct",urlencode,function(request,response){
            var id = request.body.id;
            var userModSql = 'DELETE FROM purchase WHERE id ='+id;
            db.update(userModSql, function(rows){
                response.send('true');
            })
        })

        //修改
        app.post("/editProduct",urlencode,function(request,response){
             var goods = request.body;
            var str = '';
                console.log(goods);
            for(var attr in goods){
                str+= attr+'='+goods[attr]+',';
            }
            str = str.slice(0,-1);
            var userModSql = 'UPDATE purchase SET '+ str +' WHERE id ='+goods.id;
            db.update(userModSql, function(rows){
                response.send(rows);
            })
        })
    }
}