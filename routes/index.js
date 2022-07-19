var express = require('express');
var router = express.Router();
var mysql = require('mysql');
let alert = require('alert');

var conn = mysql.createConnection({
  host: "easylearning.guru",
  user: "kcc_student",
  password: "Kccitm.edu.in1",
  database: "kccStudent"
});

conn.connect()

var con = mysql.createPool({
  connectionLimit: 60,
  host: 'easylearning.guru',
  user: 'kcc_student',
  password: 'Kccitm.edu.in1',
  database: 'kccStudent'
});

router.get('/', function(req, res, next) {
  res.render('register')
});


router.post('/register', function(req, res, next) {
  var sql = "INSERT INTO `book_entry` (`bname`, `ncopy`,`aname`) \
  VALUES ('"+req.body.bname+"', '"+req.body.copies+"','"+req.body.author+"');"
  con.getConnection(function (err, connection) {
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
      res.redirect('table');
    });
  });
});

router.get('/delete/:userId', function (req, res) {
  var userId= req.params.userId;
  con.getConnection(function(err,connection) {
    // if (err) throw err;
    // var id = req.body.id;
    var sql = `DELETE FROM book_entry WHERE id = ${userId}`;
    connection.query(sql,function (err, result) {
      // if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
      res.redirect('/table')
    });
  });
});


  router.get('/', function(req, res, next) {
    con.getConnection(function(err) {
      if (err) console.log("err");
      console.log("Connected to mySQL server!");
    });
    res.render('index')
  });
  router.get('/log', function(req, res, next) {
    res.render('login')
  });
  router.get('/table', function (req, res) {
    con.getConnection(function (err, connection) {
      // if (err) throw err;
      connection.query("SELECT * FROM book_entry", function (err, data, fields) {
        // if (err) throw err;  
        console.log(data);
        res.render('table', { title: 'Messages', userData: data});
      });
    });
  });

module.exports = router;