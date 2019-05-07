var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host:'139.199.111.86',
  user:'root',
  password:'123456789',
  database:'user'
})

connection.connect()

router.post('/',function(req,res,next){
  var query = req.body;
  console.log(query);
  //var insertsql = 'insert into feellist (id,name,headimg,feeltext,posttime) values ('+query.id+','+query.name+','+query.headimg+','+query.feeltext+','+query.posttime+')'
  // var insertsql = 'insert into feellist (id,name,headimg,feeltext,posttime) values (1,1,1,1,1)'
  var insertsql = 'insert into feellist (id,name,headimg,feeltext,posttime) values ("'+query.id+'","'+query.name+'","'+query.headimg+'","'+query.feeltext+'","'+query.posttime+'")'
  connection.query(insertsql,function(err,result){
    if(err){
      throw err
    }else{
      console.log(result);
      var resultdata = {
        "status": "200",
        "msg": "保存成功"
      };
      res.send(resultdata);
    }
  })
})

module.exports = router