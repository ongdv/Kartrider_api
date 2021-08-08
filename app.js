/**
 * 서버에 적용시킬 모듈 정의
 */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const PORT = process.env.PORT || 3002;
const app = express();


/**
 * 서버 옵션 설정
 */

// SSR 엔진 설정
app.set('view engine', 'ejs');

// 서버 폴더 명시
app.use('/', express.static(__dirname + '/views'));

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


/**
 * 라우터 연결
 */
app.use('/', indexRouter);

/**
 * 서버 실행
 */
const server = app.listen(PORT, ()=>{
  console.log(`start Server : ${PORT}`);
});