const e = require("express");

/**
 * 태그의 ID 값을 받아온다.
 * @param {*} param 
 * @returns 
 */
function getID(param){
  return document.getElementById(param);
}

/**
 * 태그의 class 값을 받아온다.
 * @param {*} param 
 */
function getClass(param){
  return document.getElementsByClassName(param);
}


/**
 * 다음 값은 모두 거짓으로 간주한다.
 * undefined, "", null
 * @param {*} param 
 * @returns 
 */
function isFalse(param){
  return ((param == undefined) || (param == "") || (param == null));
}


/**
 * 매칭 정보를 가져온다.
 */
function onClickGetUserMatch(){
  const nickname = getID('testNickname');
  fetch(`/userMatch/nickname?nickname=${nickname.value}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    const {statusCode} = data;
    if(statusCode == 200){
      let speedIndi = getID('speedIndi');
      let userNickname = getID('userNickname');
      let matchResult = getID('matchResult');
      
      // 닉네임
      userNickname.innerHTML = data.nickName;

      // 조회 시 hidden 비활성화
      matchResult.hidden = false;
      
      // 매칭정보 초기화
      speedIndi.innerHTML = '';

      //  반복문을 이용한 매칭 정보 불러오기
      for (let i = 0; i < data.matches.length; i++) {
        let matchArrayInfo = data.matches[i];
        let count = 0;

        // 나는 통합채널에서의 매칭 정보를 보고 싶다.
        for (let j = 0; j < matchArrayInfo.matches.length; j++) {
  
          if (matchArrayInfo.matches[j].channelName == "speedIndiCombine") {
            count++;
            const { kart, kartName, flyingPet, matchTime } = matchArrayInfo.matches[j].player;
            let { matchRank } = matchArrayInfo.matches[j].player;
            const { playerCount, trackId, matchId } = matchArrayInfo.matches[j];
  
            // 리타이어는 등수가 99로 표기된다.
            // 강종했을 경우에는 등수가 표기되지 않는다.
            if (matchRank == "99" || isFalse(matchRank)) {
              matchRank = "#리타이어";
            }
            else {
              matchRank = `#${matchRank}/${playerCount}`;
            }
  
            // 해당 태그에는 등수, 트랙, 카트바디 사진, 플라잉펫이 표시된다.
            let str = '';
            str += `<div class="detailInfoBox">`;
            str += ` <div id="detailInfoBox" class="detailInfo">`;
            str += `  <div class="detailRank">${matchRank}</div>`;
            str += `  <div class="detailTrack">${trackId}</div>`;
            str += `  <div class="detailKart">${kartName}</div>`;
            str += `  <div class="detailMatchTime">${matchTime}</div>`;
            str += `  <button id="myMatch" class="detailUsers" onclick="onClickDetailUsers(\'${matchId}\')">▼</button>`;
            str += ` </div>`;
            str += `</div>`;
  
            speedIndi.innerHTML += str;
          }
  
        }
        console.log('count : ', count);
  
      }
    }else if (statusCode == 404){
      let speedIndi = getID('speedIndi');
      let userNickname = getID('userNickname');
      speedIndi.innerHTML = "";
      userNickname.innerHTML = "라이더 정보가 존재하지 않습니다.";
    }
    
  });
}

/**
 * 엔터 키를 눌렀을 때도 동작
 */
function inputEnter(){
  if(window.event.keyCode == 13){
    onClickGetUserMatch();
  }
}

/**
 * 매칭 상세 정보를 가져온다.
 * @param {string} matchId
 */
function onClickDetailUsers(matchId){
  fetch(`/userMatchDetail/matchId?matchId=${matchId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  .then((res) => {
    return res.json();
  })
  .then((players) => {
    console.log(players);
    players.forEach((player)=>{
      
    });
  });
}



