var express = require('express');
var mysql = require('mysql');
var app = express();

var connect = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'networklist'
});

connect.connect(function (error) {
  if (!!error) {
    console.log('error');
    }
    else {
      console.log('Connected!');
    }
});

app.get('/', function (req,resp) {
  connect.query("SELECT * FROM users", function (error,rows,fields) {
    if (!!error) {
      console.log('perintah query error');
    }else {
      console.log('qery Sukses!!');
      console.log(rows[0].name);
      resp.send('Hallo, '+rows[0].name);
      // console.log(fields);
    }
  });
})

app.listen(1210);
