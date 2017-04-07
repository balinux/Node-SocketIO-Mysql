var express = require('express');
var mysql = require('mysql');
var app = express();


// Cara Pertama
// var connect = mysql.createConnection({
//   host:'localhost',
//   user:'root',
//   password:'',
//   database:'networklist'
// });

// connect.connect(function (error) {
//   if (!!error) {
//     console.log('error');
//     }
//     else {
//       console.log('Connected!');
//     }
// });

// app.get('/', function (req,resp) {
//   connect.query("SELECT * FROM users", function (error,rows,fields) {
//     if (!!error) {
//       console.log('perintah query error');
//     }else {
//       console.log('qery Sukses!!');
//       console.log(rows[0].name);
//       resp.send('Hallo, '+rows[0].name);
//       // console.log(fields);
//     }
//   });
// })

// CARA KEDUA
var connect = mysql.createPool({
  limit:100,
  host:'localhost',
  user:'root',
  password:'',
  database:'networklist'
});

app.get('/', function (req,resp) {
connect.getConnection(function (error,tempCont) {
    if (!!error) {
      tempCont.release();
      console.log('Error');
    }else {
      console.log('Connected!');
      tempCont.query("SELECT * FROM users",function (error, rows,fields) {
        if (!!error) {
            console.log('Koneksi Error');
        }else {
          console.log('Koneksi Sukses');
          resp.json(rows);
        }
      })
    }
  });
})

app.listen(1210);
