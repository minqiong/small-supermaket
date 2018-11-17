/* 
* @Author: Marte
* @Date:   2017-10-19 15:48:23
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-21 10:52:38
*/
var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var db = require('../db1.js');
var bodyparser = require('body-parser');
var urlencode=bodyparser.urlencoded({extended: false});

module.exports = {
    Cashier:function(app){
        app.get('/pay_getGoods', function(req,res){
            var str = '';
            var params = '';
            for(var attr in req.query){
                str+= attr+'='+req.query[attr];
            }
            db.selects('select * from goods where '+str, function(rows){
                res.send(rows);
            })
        });
        // app.get('/sale_record', function(req,res){
        //     DBHelper.insert('record', req.query, function(result){
        //         res.send(result);
        //     });
        // });
    }
}
// var SocketServer = require('ws').Server;
// var ws = new SocketServer({
//     port: 888
// })
// // 连接监听
// ws.on('connection',function(client){
//     // 当监听到客户端已经连接时，向客户端发送信息
//     client.on('message',function(msg){
//         ws.clients.forEach(function(item,idx) { 
//             item.send(msg);
//             // client.send(JSON.stringify(_messageObj))
//         });  
//         // ws.clients.forEach(function(idx,item){
//         //  client.send(msg);
//         // })
//     })
// })
// // 监听到断开
// ws.on('close',function(){
//     console.log('close');
// })
