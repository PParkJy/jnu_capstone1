//서버 실행 -> node server.js
const express = require('express'); // -> npm install express
const mysql = require('mysql'); // -> npm install mysql
//config 폴더의 database.js에서 DB 정보 설정함
const dbconfig = require('./config/database.js');
const connection = mysql.createConnection(dbconfig);
const app = express();
//express에서 POST 요청을 처리하기 위해서 body-parser 모듈 필요 -> npm install body-parser
const bodyParser = require('body-parser')
const ejs = require('ejs') // -> npm install ejs (했는지 안했는지 기억안남)

//mysql db 연결
connection.connect();

//--------------걍 설정하길래 설정함-----------------
app.set('views',__dirname+'/')
app.set('view engine','ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(express.static(__dirname+'/'))
//--------------------------------------------------

let tileMap = new Map();
connection.query('SELECT * from tile', function(err, rows) {
    for(var i in rows) {
        tileMap.set('x_' + rows[i].x + 'y_' + rows[i].y, 'x_' + rows[i].x + 'y_' + rows[i].y + 'lat_' + rows[i].lat + 'lng_' + rows[i].lng);
    }
    //console.log('x_' + rows[0].x + 'y_' + rows[0].y, 'x_' + rows[0].x + 'y_' + rows[0].y + 'lat_' + rows[0].lat + 'lng_' + rows[0].lng);
});
/*
//처음 접속되는 / 라우트에 map.html 렌더링
app.get('/', (req,res) => {
    //디비정보를 넘기고 랜더링

  res.render('map.html')
});

//이제까지 찍은 타일들 보여주기
app.get('/showTile', (req, res) => {

	res.render('showTile.html')
});

app.listen(3000, () => {
  console.log('3000번 포트로 서버 시작.')
})
*/