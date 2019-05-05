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

  var modSql = 'update userInfo set name = ?,sex = ?,age = ?,address = ?,object = ?,fun = ?,sentence = ? WHERE Id = ?';
  var modSqlParams = [query.name, query.sex, query.age, query.address, query.work, query.fun, query.sentence, query.id];
  connection.query(modSql,modSqlParams,function(err,result){
    if(err){
      throw err
    }else{
      var resultdata = {
        "status": "200",
        "msg": "保存成功"
      };
      res.send(resultdata);
      
    }
  })

})

module.exports = router