var mysql = require('mysql');
var dbconfig = require('./config/database.js')
var connection = mysql.createConnection(dbconfig)
connection.connect()
connection.query('SELECT * from jy_test', function(err,rows,fields) {
	if(!err)
		console.log('The solution is: ',rows);
	else
		console.log('error: ',err);
});

connection.end();
