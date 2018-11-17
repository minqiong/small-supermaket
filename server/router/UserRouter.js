// var db = require('../DBHelper.js');
var db = require('../db1.js');
var bodyparser = require('body-parser');
var urlencode=bodyparser.urlencoded({extended: false});
var jwt=require('jsonwebtoken');

module.exports = {
	Register: function(app){
		app.post("/userRegister", urlencode, function(request, response){
			var str = '';
		    var params = '';
		    for(var attr in request.body){
		        str+= attr+',';
		        params+='"'+request.body[attr]+'",';
		    }
		    str = str.slice(0,-1);
		    params = params.slice(0,-1);
		    var userModSql = 'insert into user ('+str+') values ('+params+')';
		    db.insert(userModSql, function(rows){
		        response.send(rows);
		    })
		});
		app.post('/userSearch', urlencode, function(request, response){
		    var str = '';
		    var params = '';
		    for(var attr in request.body){
		        str+= attr+'='+request.body[attr]+' or ';
		    }
		    str = str.slice(0,-1);
		    str = str.slice(0,-1);
		    str = str.slice(0,-1);
		    str = str.slice(0,-1);
		    var sql = 'select * from user where '+str;
		    db.selects(sql, function(result){
		        response.send(result);

		    });
		});
		app.post('/userUpdate', urlencode, function(request, response){
			var data1 = JSON.parse(request.body.data1);//旧数据
			var data2 = JSON.parse(request.body.data2);//新数据
			db.update('user',data1,data2,function(result){
				response.send(result);
			});
		});
		app.post('/userDelete', urlencode, function(request, response){
			var str = '';
		    var params = '';
		    for(var attr in request.body){
		        str+= attr+'='+request.body[attr]+' and ';
		    }
		    str = str.slice(0,-1);
		    str = str.slice(0,-1);
		    str = str.slice(0,-1);
		    str = str.slice(0,-1);
		    var userModSql = 'DELETE FROM user WHERE '+str;;
		    db.update(userModSql, function(rows){
		    	console.log(rows);
		        response.send('true');
		    })
		});
		app.post('/findUser', urlencode, function(request, response){
			db.select('user',request.body,function(result){
				response.send(result);
			});
		});
		app.post('/updateUser', urlencode, function(request, response){
			var data1 = JSON.parse(request.body.data1);//旧数据
			var data2 = JSON.parse(request.body.data2);//新数据
			db.update('user',data1,data2,function(result){
				response.send(result);
			})
		});
		app.post("/login", urlencode, function(request, response){
			var userName = request.body.userName;
            db.selects('select * from user where userName="'+userName+'" and userPassword='+request.body.userPassword+' and type="'+request.body.userLevel+'"', function(rows){
            	console.log(rows);
            	if(rows != 'error'){
            		response.send({status:true, msg: rows});
            	}else{
            		var userObj={
						username:request.body.userName,
						level:request.body.userLevel
					}
					var token = jwt.sign(userObj, 'secret', {
						'expiresIn': 1440 // 设置过期时间
					});
					response.send({status:true, token:token});
            	}
            })
		});
		// app.get("/login1", function(request, response){
  //           db.selects('select * from user;', function(rows){
  //               response.send(rows);
  //           })
		// });
	}
}