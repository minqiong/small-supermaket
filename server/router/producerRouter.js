/* 
* @Author: Marte
* @Date:   2017-10-16 20:10:05
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-19 11:04:02
*/

var express = require('express');
var router = express.Router();
// var mongodb = require('mongodb');
var DBHelper = require('../db1.js');

router.get('/showProducer', function(req, res) {
    DBHelper.selects('select * from producer', function(rows){
        res.send(rows);
    })
});
router.get('/addProducer', function(req, res) {
    var str = '';
    var params = '';
    for(var attr in req.query){
        str+= attr+',';
        params+='"'+req.query[attr]+'",';
    }
    str = str.slice(0,-1);
    params = params.slice(0,-1);
    var userModSql = 'insert into producer ('+str+') values ('+params+')';
    console.log(userModSql);
    DBHelper.insert(userModSql, function(rows){
        res.send(rows);
    })
});

router.get('/updateProducer', function(req, res) {
    var goods = req.query;
    var str = '';
    for(var attr in goods.data){
        str+= attr+'='+goods.data[attr]+',';
    }
    str = str.slice(0,-1);
    var userModSql = 'UPDATE producer SET '+ str +' WHERE id ='+goods.predata.id;
    DBHelper.update(userModSql, function(rows){
        res.send(rows);
    })
});

router.get('/deleteProducer', function(req, res) {
    var goods = req.query;
    var id = req.query.id;
    var userModSql = 'DELETE FROM producer WHERE id ='+id;
    DBHelper.update(userModSql, function(rows){
        res.send('true');
    })
});

router.get('/selectProducer', function(req, res) {
    var goods = req.query;
    var str = '';
    var params = '';
    for(var attr in req.query){
        str+= attr+'='+req.query[attr]+' and ';
    }
    str = str.slice(0,-1);
    str = str.slice(0,-1);
    str = str.slice(0,-1);
    str = str.slice(0,-1);
    console.log(str);
    var sql = 'select * from producer where '+str;
    DBHelper.selects(sql, function(result){
        console.log(sql,result);
        res.send(result);

    });
   //  var producer = req.query;
   // DBHelper.select('producer',producer,function(result){
        
   //      res.send(result);

   //  });
});



module.exports = router;

