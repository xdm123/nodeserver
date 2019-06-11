var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host:'139.199.111.86',
  user:'root',
  password:'1234%^&**.0',
  database:'mydata'
})
connection.connect();


router.post('/',function(req,res,next){
  var query = req.body;
  console.log(query);
  var resultdata = {
    "status": "200",
    "msg": "上传头像",
    "data":query
  }
  res.send(resultdata);
})


module.exports = router;