const express = require('express');
const mysql = require('mysql');
const dbconfig = require('./config/database.js');
const connection = mysql.createConnection(dbconfig);
const app = express();
connection.connect();
console.log('connect')
app.get('/', (req,res) => {
  res.sendFile(__dirname+'/map.html')
})

app.get('/test',(req,res) => {
	connection.query('SELECT * from jy_test', function(err,rows) {
		if(err) throw err;

		console.log('The solution is: ',rows);
		res.send(rows);
	})
});

app.listen(3000, () => {
  console.log('3000번 포트에 http server를 띄웠습니다.')
})
