module.exports = {
  apps : [{
    // 서버를 실행할 서버 인스턴스 개수
    instances : 1,

    // 서버를 실행할 모드
    exec_mode : 'cluster',

    // 서버 이름
    name : "nodeProject",

    // 서버를 실행할 스크립트 파일
    script : "./app.js",
	
	  listen_timeout : 5000,

    // 서버에 찍히는 로그를 출력하는 방식
    log_date_format : "YYYY-MM-DD HH:MM Z",

    // 에러 로그를 저장할 파일
    error_file : "./log/app-err.log",

    // 출력 로그를 저장할 파일
    out_file : "./log/app-out.log"
  }]
}
