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

const astar = require('./astar.js');

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

//처음 접속되는 / 라우트에 map.html 렌더링
app.get('/', (req,res) => {
  res.render('map.html')
})

//map.html에서 작은 사각형 한 칸 누르면 그 중심 위도, 경도와 x,y를 POST 방식으로 얻어오기'
app.post('/cal_rect', function(req,res){
	console.log(req.body) //req.body -> map.html에서 전송된 정보
	var body = req.body 
	//IGNORE -> DB 테이블에 중복된 정보가 존재한다면 지금 넣는 정보 무시
	// 내 mysql DB 연결 정보는 config폴더의 database.js 참고
	// 테이블명은 tile로 만들었음
	// center_lat DOUBLE not null
	// center_lng DOUBLE not null
	// x INT(11? 사이즈 생각안남) not null
	// y INT(사이즈 모름) not null
	//PRIMARY KEY(x,y)
	//나는 x,y를 primary key로 설정했기 때문에 x,y 비교로 중복 정보 판단 가능
	connection.query('INSERT IGNORE INTO tile (lat, lng, x, y) VALUES (?,?,?,?)',[body.latitude,body.longitude,body.x,body.y], function(err,rows) {
                if(err) throw err;

		console.log('DB stored'); //DB에 잘 저장됨
        })
	res.json({test:"server ok"}) //map.html로 server ok라는 답장 전송
})

var arrToAstarGraph = Array(400).fill(null).map(() => Array(200).fill(0)); //arr[x][y](x: 400, y: 200)
var graphToAstar;
connection.query('SELECT * from tile', function(err,rows) {
	if(err) throw err;

	//rows -> select의 결과
	//console.log('The solution is: ',rows);
	rows.forEach(tile => {
		arrToAstarGraph[tile.x][tile.y] = 1;
	});
	graphToAstar = new astar.Graph(
		arrToAstarGraph
	, { diagonal: true });
})

//DB의 모든 정보 확인해보기위해 설정한 /test 라우트
//192.168.0.39:3000/test로 접속해서 확인
app.post('/showRoadTile', (req, res) => {
	connection.query('SELECT * from tile', function(err,rows) {
		if(err) throw err;

		//rows -> select의 결과
		//console.log('The solution is: ',rows);
		res.send(rows);
	})
});

app.post('/findPath', (req, res) => {
	var start = graphToAstar.grid[req.body.sp_x][req.body.sp_y]
	var end = graphToAstar.grid[req.body.ed_x][req.body.ed_y]

	var path = astar.astar.search(graphToAstar, start, end, { heuristics: astar.astar.heuristics.diagonal });
	if(path == null) { res.send("No Path!"); }
	else { res.send(path); }
})

app.listen(3000, () => {
  console.log('3000번 포트로 서버 시작.')
})
