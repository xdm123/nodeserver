var express = require('express')
var router = express.Router()
var mysql = require('mysql')

var connection = mysql.createConnection({
  host:'139.199.111.86',
  user:'root',
  password:'1234%^&**.0',
  database:'mydata'
})

connection.connect()

router.get('/',function(req,res,next){
  var sql = 'select * from feellist'
  connection.query(sql,function(err,rows,fields){
    console.log(rows);
    if (err){
        throw err;
    } else {
      var data = JSON.stringify(rows);
      data = JSON.parse(data);
      console.log(data);
      var result = {
        "status": "200",
        "msg": "获取成功"
      };
      result.list = data
      res.send(JSON.parse(JSON.stringify(result)));
      // res.send(result)
    }
  })
})

module.exports = router