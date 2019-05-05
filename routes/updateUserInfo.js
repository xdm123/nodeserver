var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: '139.199.111.86',
  user: 'root',
  password : '123456789',
  database : 'user'
});
connection.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  var item = req.query;
  console.log(item['name'])
  if(item['name'] != undefined){
    var sql = 'update userInfo set name = "' + item.name + '" where id = ' + item.id;
    connection.query(sql,function(err,result){
      if(err){
        throw err
      }else{
        var resultdata = {
          "status": "200",
          "msg": "设置昵称成功"
        };
        res.send(resultdata);
      }
    })
  }else if(item['sign'] != undefined){
    var sql = 'update userInfo set sign = "' + item.sign + '" where id = ' + item.id;
    connection.query(sql,function(err,result){
      if(err){
        throw err
      }else{
        var resultdata = {
          "status": "200",
          "msg": "设置签名成功"
        };
        res.send(resultdata)
      }
    })
  }
  // connection.query(sql,function(err,rows,fields){
  //   console.log(rows);
  //   if (err){
  //       throw err;
  //   } else {
  //     var data = JSON.stringify(rows);
  //     data = JSON.parse(data);
  //     console.log(data);
  //     var result = {
  //       "status": "200",
  //       "msg": "获取成功"
  //     };
  //     result.list = data
  //     res.send(JSON.parse(JSON.stringify(result)));
  //   }
  // })
});


module.exports = router;