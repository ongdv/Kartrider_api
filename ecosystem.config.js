module.exports = {
  apps : [{
    // 서버를 실행할 서버 인스턴스 개수
    instances : 1,

    // 서버를 실행할 모드
    exec_mode : 'cluster',

    // 서버 이름
    name : "kartRiderAPI",

    // 서버를 실행할 스크립트 파일
    script : "./app.js",

    // 서버 내 파일의 변경사항이 적용되면 서버 재실행
    watch : ["views", "css", "controllers", "services", "js"],
	
    // 서버가 무반응일 때 강제로 재로드 하는 시간
	  listen_timeout : 5000,

    // 자동 재시작 딜레이
    restart_delay : 2000,

    // 자동 재시작
    autorestart : true,

    // 서버에 찍히는 로그를 출력하는 방식
    log_date_format : "YYYY-MM-DD HH:MM Z",

    // 에러 로그를 저장할 파일
    error_file : "./logs/app-err.log",

    // 출력 로그를 저장할 파일
    out_file : "./logs/app-out.log"
  }]
}
