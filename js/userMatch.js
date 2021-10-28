let isClicked = new Array();
let isRequested = new Array();

/**
 * 태그의 ID 값을 받아온다.
 * @param {*} param 
 * @returns 
 */
function getID(param) {
  return document.getElementById(param);
}

/**
 * 태그의 class 값을 받아온다.
 * @param {*} param 
 */
function getClass(param) {
  return document.getElementsByClassName(param);
}


/**
 * 다음 값은 모두 거짓으로 간주한다.
 * undefined, "", null
 * @param {*} param 
 * @returns 
 */
function isFalse(param) {
  return ((param == undefined) || (param == "") || (param == null));
}


/**
 * 매칭 정보를 가져온다.
 */
function onClickGetUserMatch() {
  const nickname = getID('testNickname');
  getMatch(nickname.value, undefined);
}

/**
 * 엔터 키를 눌렀을 때도 동작
 */
function inputEnter() {
  if (window.event.keyCode == 13) {
    onClickGetUserMatch();
  }
}

/**
 * 대전 상세 정보를 가져온다.
 */
function onClickDetailUsers(matchId, index) {
  console.log(`${index} : ${isClicked[index]}`);
  const detailUsers = getID(`detailUsers${index}`);
  if (isClicked[index]) {
    isClicked[index] = false;
    detailUsers.hidden = true;
  }
  else if (!isClicked[index]) {
    detailUsers.hidden = false;
    isClicked[index] = true;
    if (!isRequested[index]) {
      isRequested[index] = true;
      fetch(`/userMatchDetail/matchId?matchId=${matchId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => {
          return res.json();
        })
        .then((players) => {
          console.log(players);
          // 초기화
          detailUsers.innerHTML = '';
          const info = `
          <li class="horizontal_in detailProperty">
            <div>
              <div class="matchRank">순위</div>
              <div class="matchNick">닉네임</div>
              <div class="matchKart">카트바디</div>
              <div class="matchTime">기록</div>
            </div>
          </li>
          `;
          detailUsers.innerHTML += info;

          players.forEach((player) => {
            const { matchRank, characterName, matchTime } = player;
            let { kart, kartName } = player;
            let str = '';

            // 등록되지 않은 카트바디는 별도의 이미지를 적용
            if (isFalse(kartName)) {
              str = `
            <li class="horizontal_in detailProperty">
              <div>
                <div class="matchRank">${matchRank}</div>
                <div class="matchNick">${characterName}</div>
                <div class="matchKart"><img src="/images/guessKart.png" width="60px" height="40px"></div>
                <div class="matchTime">${matchTime}</div>
              </div>
            </li>
            `;
            } else {
              str = `
            <li class="horizontal_in detailProperty">

              <div>
                <div class="matchRank">${matchRank}</div>
                <div class="matchNick">${characterName}</div>
                <div class="matchKart"><img src="/metadata/kart/${kart}.png" width="60px" height="40px"></div>
                <div class="matchTime">${matchTime}</div>
              </div>
            </li>
            `;
            }

            // 
            detailUsers.innerHTML += str;
          });
        });
    }
  }
}



// 개인전
function onClickSpeedIndi(){
  const nickname = getID('userNickname').innerHTML;
  const matchType = getID('speedIndi').value;
  getMatch(nickname, matchType);
}


/**
 * 대전 정보들을 가져온다.
 */
function getMatch(nickname, matchType){
  console.log('getMatch');
  fetch(`/userMatch/nickname?nickname=${nickname}&matchType=${matchType}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const { statusCode } = data;
      if (statusCode == 200) {
        let matchInfo = getID('matchInfo');
        let userNickname = getID('userNickname');
        let matchResult = getID('matchResult');

        // 닉네임
        userNickname.innerHTML = data.nickName;

        // 조회 시 hidden 비활성화
        matchResult.hidden = false;

        // 매칭정보 초기화
        matchInfo.innerHTML = '';

        //  반복문을 이용한 매칭 정보 불러오기
        const { matches } = data.matches[0];
        console.log(matches);
        let i = 0;
        matches.forEach((match) => {
          isClicked[i] = false;
          isRequested[i] = false;
          const { matchTime } = match.player;
          let { matchRank, kartName } = match.player;
          const { trackId, matchId } = match;
          let str = `
          <div class="detailInfoBox">
           <div id="detailInfoBox" class="detailInfo">
            <div class="detailRank">${matchRank}</div>
            <div class="detailTrack">${trackId}</div>
            <div class="detailKart">${kartName}</div>
            <div class="detailMatchTime">${matchTime}</div>
            <button id="myMatch" class="detailUsersButton" onclick="onClickDetailUsers(\'${matchId}\', \'${i}\')">▼</button>
            <form method="GET" action="/userMatchDetail/matchId">
              <input type="text" name="matchId" value="${matchId}" hidden>
              <input type="submit" id="myMatch" class="detailUsersButton" value="▼">
            </form>
            
           </div>
           <div id="detailUsers${i}" hidden>
            <ul class="detailInfoUsers">
            </ul>
           </div>
          </div>`;

          matchInfo.innerHTML += str;
          i++;
        });

      } else if (statusCode == 404) {
        let matchInfo = getID('matchInfo');
        let userNickname = getID('userNickname');
        matchInfo.innerHTML = "";
        userNickname.innerHTML = "라이더 정보가 존재하지 않습니다.";
      }

    });
}

