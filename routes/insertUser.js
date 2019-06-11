var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: '139.199.111.86',
  user: 'root',
  password : '1234%^&**.0',
  database : 'mydata'
});
connection.connect();


/* GET home page. */
router.post('/', function(req, res, next) {
  // 获取参数
  var query = req.body;
  console.log(query);
  var account = query.account;
  var psd = query.password
  //先查询用户是否已经创建
  var sql = 'select * from accountData where account = ' + account
  connection.query(sql,function(err,result){
    if (err){
        throw err;
    } else {
      if(result.length == 0){
        console.log('新用户');
        //新用户创建
        var insertsql = 'insert into accountData (account,password) values ('+account+','+psd+')'
        connection.query(insertsql,function(err,result){
          if(err){
            var resultsend = {
              "status": "300",
              "msg": "创建用户失败",
            };
            // result.list = data
            res.send(resultsend);
          }else{
            console.log(result);
            //创建用户成功，向userInfo表中插入保存用户个人信息的数据
            var usersql = 'insert into userInfo (id,name,sex,age,address,object,fun,sentence,headimg) values ('+account+',"未设置昵称","男","18","未设置地址","未设置职业","未设置兴趣爱好","未设置喜欢的句子","http://www.num12138.top:3000/images/head.jpg")'
            connection.query(usersql,function(err,result){
              if(err){
                throw err
                res.send('创建用户信息失败');
              }else{
                var resultsend = {
                  "status": "100",
                  "msg": "创建用户成功",
                };
                res.send(resultsend);
              }
            })
          }
        })
      }else{ //手机号已存在，查看密码是否正确
        var sql = 'select * from accountData where account = ' + account;
        connection.query(sql,function(err,result){
          if(err){
            res.send('手机号存在，但查询失败');
          }else{
            var getpsd = result[0].password;
            if(psd == getpsd){
              var resultsend = {
                "status": "200",
                "msg": "密码正确可以登录",
              };
              res.send(resultsend)
            }else{
              var resultsend = {
                "status": "400",
                "msg": "密码错误请检查密码",
              };
              res.send(resultsend)
            }
          }
        })
      }
    }
  })
});


module.exports = router;