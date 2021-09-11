/**
 * 태그의 ID 값을 받아온다.
 * @param {*} param 
 * @returns 
 */
function getID(param){
  return document.getElementById(param);
}


function onClickGetUserMatch(){
  const nickname = getID('testNickname');
  const startDate = getID('testStartDate');
  const endDate = getID('testEndDate');
  const limit = getID('testLimit');
  fetch(`/userMatch/nickname?nickname=${nickname.value}&start_date=${startDate.value}&end_date=${endDate.value}&limit=${limit.value}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    // body : JSON.stringify({
    //   nickname : nickname.value,
    //   start_date : startDate.value,
    //   end_date : endDate.value,
    //   limit : limit.value,
    // }),
    // body : {
    //   nickname : nickname.value,
    //   start_date : startDate.value,
    //   end_date : endDate.value,
    //   limit : limit.value,
    // },
  })
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    let result = getID('matchResult');
    let speedIndi = getID('speedIndi');
    let userNickname = getID('userNickname');
    userNickname.innerHTML = data.nickName;
    speedIndi.innerHTML = '';
    for(let i = 0; i < data.matches.length;i++){
      let matchArrayInfo = data.matches[i];
      
      for(let j = 0; j < matchArrayInfo.matches.length;j++){
        const {kart, flyingPet} = matchArrayInfo.matches[j].player;
        let {matchRank} = matchArrayInfo.matches[j].player;
        const {playerCount, trackId} = matchArrayInfo.matches[j];
        if(matchRank == "99"){
          matchRank = "#리타이어";
        }else{
          matchRank = `#${matchRank}/${playerCount}`;
        }
        let str = '';
        str += `<div class="speedIndiDetail">`;
        str +=  `<div class="detailInfo">`;
        str +=   `<div class="detailRank">${matchRank}</div>`;
        str +=   `<div class="detailTrack">${trackId}</div>`;
        str +=   `<div class="detailEle">${kart}</div>`;
        str +=   `<div class="detailEle">${flyingPet}</div>`;
        str +=  `</div>`;
        str += `</div>`;
        speedIndi.innerHTML += str;
      }
      
      
    }
  });
}


function getMatchData(matchObj) {
  let str = '';
  
  for (let i = 0; i < matchObj.matches.length; i++) {
    

  }
  
  return str;
}