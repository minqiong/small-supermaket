/* 
* @Author: Marte
* @Date:   2017-10-19 18:50:54
* @Last Modified by:   Marte
* @Last Modified time: 2017-10-21 09:58:59
*/
// module.exports = function(){
   
    var SocketServer = require('ws').Server;
    var ws = new SocketServer({
        port: 888
    })
    // 连接监听
    ws.on('connection',function(client){
        // 当监听到客户端已经连接时，向客户端发送信息
        console.log('已连接')
        client.on('message',function(msg){
            console.log('接受信息为'+msg)
            ws.clients.forEach(function(item,idx) { 
                item.send(msg);
                // client.send(JSON.stringify(_messageObj))
            });  
            // ws.clients.forEach(function(idx,item){
            //  client.send(msg);
            // })
        })
    })
    // 监听到断开
    ws.on('close',function(){
        console.log('close');
    })
// }