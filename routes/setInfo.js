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
router.post('/', function(req, res, next) {

  // 获取参数
  var query = req.body;
  var getPostData
  console.log(query);
  for(var i in query){
    getPostData = JSON.parse(i);
    console.log(typeof getPostData);
  }
  var setid = getPostData.id;
  var setname = getPostData.name;
  console.log(setid)
  console.log(setname);

  var sql = 'update userInfo set name = "'+setname+'" where id = ' + setid;

  connection.query(sql,function(err,result){
    if (err){
        throw err;
    } else {
      var resultsend = {
        "status": "200",
        "msg": "修改成功",
      };
      // result.list = data
      res.send(resultsend);
      // connection.end();
    }
  })
});


module.exports = router;