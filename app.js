/**
 * 서버에 적용시킬 모듈 정의
 */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const PORT = process.env.PORT || 8090;
const app = express();

// log 폴더 생성
if(!fs.existsSync('logs'))
  fs.mkdirSync('logs');

/**
 * 서버 옵션 설정
 */

// SSR 엔진 설정
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// 디렉터리 설정
app.use('/', express.static(__dirname + '/views'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/metadata', express.static(__dirname + '/metadata'));
app.use('/configs', express.static(__dirname + '/configs'));

// 중첩된 객체표현 허용유무
app.use(express.urlencoded({extended:true}));

// json 요청
app.use(express.json());

// 실행중인 웹에 다른 출처의 자원에 접근할 수 있는 
// 권한을 부여하도록 브라우저에 알림
app.use(cors());

// 로그 기록을 남김
app.use(morgan('dev'));

/**
 * 요청 및 응답 처리를 해주는 라우터 정의
 */
const indexRouter = require('./routes/index');

// 유저 정보를 이용한 라이더명 조회
const userInfoRouter = require('./routes/userInfo');

// 유저 정보를 이용한 라이더 매치 조회
const userMatchRouter = require('./routes/userMatch');

/**
 * 라우터 연결
 */
app.use('/', indexRouter);
app.use('/userInfo', userInfoRouter);
app.use('/userMatch', userMatchRouter);

/**
 * 서버 실행
 */
const server = app.listen(PORT, ()=>{
  console.log(`start Server : ${PORT}`);
});