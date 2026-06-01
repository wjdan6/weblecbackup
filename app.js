const express = require('express'), http = require('http'), path = require('path');

const static = require('serve-static');

const app = express();
const router = express.Router();
app.set('port',process.env.PORT || 8080);
app.set('host','localhost');
//미들웨어 등록
app.use(static(__dirname));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use((req,res,next)=>{
	console.log(`첫번째 미들웨어 실행 url : ${req.url}`);
	next();
});
//미들웨어에 있는 요청패스는 패스 맨앞에 포함하기만 하면 실행됨?
app.use('/',(req,res,next)=>{
	console.log(`요청 패스 (\/)에 대한 미들웨어 실행 url : ${req.url}`);
	next();
});
app.get('/search',(req,res)=>{
	const {title,author} = req.query;
	res.send(`사용자 요청 내용: ${title} : ${author}이 처리되었습니다.`);
});
app.get('/',(req,res)=>{
	res.redirect("playjs_p2.html");	
})
app.get('/redirectTest',(req,res)=>{
	res.redirect("https://www.google.com/");
})
http.createServer(app).listen(app.get('port'),app.get('host'), ()=>{
	console.log('Express server running at ' + app.get('port')+app.get('host'));
});