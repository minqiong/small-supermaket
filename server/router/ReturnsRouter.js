var db = require('../db1.js');
var bodyparser = require('body-parser');
var urlencode = bodyparser.urlencoded({extended: false});
var jwt=require('jsonwebtoken');

module.exports={
    Returns:function(app){
        app.post("/returns_insert", urlencode, function(request, response){
            var str = '';
            var params = '';
            for(var attr in request.body){
                str+= attr+',';
                params+='"'+request.body[attr]+'",';
            }
            str = str.slice(0,-1);
            params = params.slice(0,-1);
            var userModSql = 'insert into returns ('+str+') values ('+params+')';
            db.insert(userModSql, function(rows){
                response.send(rows);
            })
            // db.select("returns", {procode: request.body.procode}, function(result){
            //     var result_str=JSON.parse(result);
            //     if(result_str.data.length === 0){
            //         db.insert('returns', request.body, function(res){
            //             response.send(res);
            //         });
            //     }else if(result_str.data.length>0){
            //         response.send({status:false, message:"此退货单号已存在, 请重新输入！"});
            //     }else{
            //         response.send(result);
            //     }
            // });
        });

        app.post("/return_procode", function(request, response){
            //db
            //pruchase为采购进货表
            console.log(4)
            db.selects('select * from purchase ;', function(rows){
                response.send(rows);
            })
        });
        // app.get('/return_procode', function(request, response){
        //     console.log(3)
        //     var token = request.headers.authorization;
        //     jwt.verify(token, 'secret', function(error, result){
        //          if(error){
        //              response.send({status: false, message: error});
        //          } else {
        //             db.select('purchase', request.body, function(result){
        //                 response.send(result);
        //             });
        //          }
        //     });
        // });
        
        app.get('/alldata', function(request, response){
            //returns为退货管理表
            db.selects('select * from returns;', function(rows){
                response.send(rows);
            })
        });

        app.post('/somedata', urlencode, function(request, response){
            var str = '';
            var params = '';
            for(var attr in request.body){
                str+= attr+'='+request.body[attr]+' and ';
            }
            str = str.slice(0,-1);
            str = str.slice(0,-1);
            str = str.slice(0,-1);
            str = str.slice(0,-1);
            var sql = 'select * from returns where '+str;
            console.log(sql);
            db.selects(sql, function(result){
                response.send(result);

            });
            // db.select('returns', request.body, function(result){
            //     response.send(result);
            // });
        });
    }
}