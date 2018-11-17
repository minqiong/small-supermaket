/* 
* @Author: Marte
* @Date:   2017-10-14 17:41:49
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-21 15:17:40
*/

var express = require('express');
var router = express.Router();
// var mongodb = require('mongodb');
var db = require('../db1.js');
// var DB = require('../db1.js');

router.get('/showGoods', function(req, res) {
    db.selects('select * from goods;', function(rows){
        res.send(rows);
    })
    // DBHelper.selects('goods',{},function(result){
    //     res.send(result);
    // });
});
router.get('/addGoods', function(req, res) {
    var str = '';
    var params = '';
    for(var attr in req.query){
        str+= attr+',';
        params+='"'+req.query[attr]+'",';
    }
    str = str.slice(0,-1);
    params = params.slice(0,-1);
    var userModSql = 'insert into goods ('+str+') values ('+params+')';
    db.insert(userModSql, function(rows){
        res.send(rows);
    })
});

// 修改有点问题
router.get('/updateGoods', function(req, res) {
    var goods = req.query;
    var str = '';
    for(var attr in goods.data){
        str+= attr+'='+goods.data[attr]+',';
    }
    str = str.slice(0,-1);
    var userModSql = 'UPDATE goods SET '+ str +' WHERE id ='+goods.predata.id;
    db.update(userModSql, function(rows){
        res.send(rows);
    })
});

router.get('/deleteGoods', function(req, res) {
    var goods = req.query;
    var id = req.query.id;
    var userModSql = 'DELETE FROM goods WHERE id ='+id;
    db.update(userModSql, function(rows){
        res.send('true');
    })
});

router.get('/selectGoods', function(req, res) {
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
    var sql = 'select * from goods where '+str;
    db.selects(sql, function(result){
        console.log(sql,result);
        res.send(result);

    });
});

router.get('/updateGoodsNum', function(req, res) {
    var goods = req.query;
    goods.predata.forEach(function(item,idx){
        var objectid = new mongodb.ObjectID.createFromHexString(item);
        DB.update('goods',{'_id': objectid},{$set:{'goodsStore':goods.data[idx]}},function(result){
            return(result);
        });                
    })
    res.send('true');
});


router.get('/sale_record', function(req, res) {
    var record = req.query;
    console.log(record)
    record.sale_data.forEach(function(item,idx){
        console.log(item)
        DB.insert('record',item,function(result){
            return(result);
        });                
    })
    res.send('true');
});

module.exports = router;


