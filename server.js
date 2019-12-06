const express = require('express');
const mysql = require('mysql');
const dbconfig = require('./config/database.js');
const connection = mysql.createConnection(dbconfig);
const app = express();
const bodyParser = require('body-parser')
const ejs = require('ejs')

connection.connect();
app.set('views',__dirname+'/')
app.set('view engine','ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(express.static(__dirname+'/'))

app.get('/', (req,res) => {
  res.render('map.html')
})

app.post('/cal_rect', function(req,res){
	console.log(req.body)
	var body = req.body

	connection.query('INSERT IGNORE INTO jy_test (center_lat, center_lng, x,y) VALUES (?, ?, ?, ?)',[body.latitude,body.longitude,body.x,body.y] ,function(err,rows) {
		if(err) throw err;
		
		console.log('DB save')
	})
	res.json({test:"server ok"})
})

app.get('/test',(req,res) => {
	connection.query('SELECT * from jy_test', function(err,rows) {
		if(err) throw err;

		console.log('The solution is: ',rows);
		res.send(rows);
	})
});

app.listen(3000, () => {
  console.log('3000번 포트로 서버 시작.')
})
