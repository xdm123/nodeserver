var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : '123456789',
  database : 'user'
});
connection.connect();


/* GET home page. */
router.get('/', function(req, res, next) {
  let sql = 'select * from userInfo';
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
        "message": "获取成功",
      };
      result.userinfo = data
      var _callback = req.query.jsonpCallback;
      res.type('text/javascript');
      res.send(_callback + '(' + JSON.stringify(result) + ')');
    }
  })
  // res.send('dsadsadsadsa');
});

module.exports = router;
//test