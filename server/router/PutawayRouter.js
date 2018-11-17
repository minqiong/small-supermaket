// var db = require('../DBHelper.js');
var db = require('../db1.js');
var bodyparser = require('body-parser');
var fs = require('fs');
var multer = require('multer');
var urlencode = bodyparser.urlencoded({extended: false});
var upload = multer({dest:'../upload/'});
// var mongodb = require('mongodb');
module.exports ={
	Register:function(app){
		app.post('/getAll',urlencode,function(request,response){
			db.selects('select * from putaway;', function(rows){
		        response.send(rows);
		    })
			// db.select("putaway",request.body,function(result){
			// 	response.send(result);
			// })
		});
		app.post('/getGoods',urlencode,function(request,response){
			var str = '';
		    var params = '';
		    for(var attr in request.body){
		        str+= attr+'='+request.body[attr]+' and ';
		    }
		    str = str.slice(0,-1);
		    str = str.slice(0,-1);
		    str = str.slice(0,-1);
		    str = str.slice(0,-1);
		    var sql = 'select * from goods where '+str;
		    db.selects(sql, function(result){
		        console.log(sql,result);
		        response.send(result);

		    });
		});
		app.post('/addToPutaway', urlencode, function(request, response){
			var str = '';
		    var params = '';
		    for(var attr in request.body){
		        str+= attr+',';
		        params+='"'+request.body[attr]+'",';
		    }
		    str = str.slice(0,-1);
		    params = params.slice(0,-1);
		    var userModSql = 'insert into putaway ('+str+') values ('+params+')';
		    db.insert(userModSql, function(rows){
		        response.send(rows);
		    })
		});
		app.post('/updatePutaway', urlencode, function(request, response){
			// var id = req.body.id;
			var data1 = JSON.parse(request.body.data1);//旧数据
			var data2 = JSON.parse(request.body.data2);//新数据
			data1._id = new mongodb.ObjectID.createFromHexString(data1._id);
			data2._id = new mongodb.ObjectID.createFromHexString(data2._id);//将字符串转换成一个 objectid
			db.update('putaway',data1,data2,function(result){
				response.send(result);
			})
		});
		app.post('/deletePutaway', urlencode, function(request, response){
		    var id = request.body._id;
		    var userModSql = 'DELETE FROM putaway WHERE goodsId ='+id;
		    db.update(userModSql, function(rows){
		        response.send('true');
		    })
		});
		app.post('/searchPutaway', urlencode, function(request, response){
			var str = request.body.keyword;
            var sql = "select * from putaway where id like '%"+str+"%' or type like '%"+str+"%' or name like '%"+str+"%' or size like '%"+str+"%' or num like '%"+str+"%' or price like '%"+str+"%' or people like '%"+str+"%' or supplier like '%"+str+"%'";
            db.selects(sql, function(result){
                response.send(result);

            });
		});
		app.post('/upload', upload.array('photos',12), function(request, response, next){
			var files = request.files;
			// var arr = new Array();
			for(var i = 0;i<files.length; i++){
				var s= files[i].filename;
			}
			var content = fs.readFileSync('../upload/'+s,'binary');
			response.writeHead(200,{'Content-Type':'image/jpeg'});
			response.write(content, 'binary');
			response.end();
			// response.send(s);
			// var filename = request.files;
			// console.log(request.files);
			// response.send('success');
		})
	}
}