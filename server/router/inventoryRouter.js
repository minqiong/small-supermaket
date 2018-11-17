var db = require('../db1.js');
var bodyparser = require('body-parser');
var urlencode = bodyparser.urlencoded({extended: false});

module.exports={
    Inventory:function(app){
        app.post("/inv-search-all", urlencode, function(request, response){
            // console.log()
            db.select("inventory", request.body.procode, function(result){
                response.send(result);
            });
        });
        app.post("/inv-somedata", urlencode, function(request, response){
            db.select("inventory", request.body, function(result){
                response.send(result);
            });
        });
        app.post('/addTo_reposity', urlencode, function(request, response){
            db.select('inventory', request.body, function(){

            });
        })
    }
}