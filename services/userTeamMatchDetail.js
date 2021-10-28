const axios = require('axios');
const common = require('../configs/common');

module.exports = {
  /**
   * 매치 상세 정보를 받아온다.
   * @param {string} url - 요청 URL
   * @param {*} options - API 사용 인증 설정 
   */
  getPlayers : async (url, options) => {
    try{
      const matchDetail = await axios.get(url, options);
      const { data } = matchDetail;
      return data;
    }catch(error){
      console.log("대전 정보가 존재하지 않습니다.");
      console.log(error);
      return null;
    }
  },

  /**
   * 플레이어 정보를 변환한다.
   * @param {object} players - 플레이어들의 정보
   */
  parseMetaDatas : (players) => {
    players.forEach((player)=>{
      if(player.matchRank == "99" || common.isFalse(player.matchRank)){
        player.matchRank = "리타이어";
      }
      const {kart, matchTime} = player;
      
      // kart 속성의 메타데이터를 바꾸면 이미지 호출이 불가능하여
      // kartName 속성을 추가하여 파싱된 데이터를 삽입
      player.kartName = common.getKartData(kart);
      player.matchTime = common.convertTime(matchTime);
    });
    return players;
  },

  /**
   * 배열 합치기
   * @param {object} teams 
   * @returns {Array<object>}
   */
  concatArray: (teams) => {
    let result = new Array();
    teams.forEach((team) => {
      const { players } = team;
      players.forEach((player) => {
        result.push(player);
      });
    });
    return result;
  },
  
  /**
   * 사용하지 않는 메타데이터 삭제
   * @param {object} teams - 플레이어들의 정보
   * @returns {Array<object>}
   */
  deletePlayersInfo: (teams) => {
    teams.forEach((team) => {
      team.players.forEach((player) => {
        delete player.partsEngine;
        delete player.partsHandle;
        delete player.partsWheel;
        delete player.partsKit;
        delete player.license;
        delete player.pet;
        delete player.flyingPet;
        delete player.rankinggrade2;
        delete player.character;
      });
    });
    return teams;
  },

  /**
   * 순위에 따라 오름차순으로 정렬한다.
   * @param {object} players 
   * @returns 
   */
  sortData : (players) => {
    let i, j, k;
    for(i = 0; i < players.length; i++){
      for(j = i; j < players.length; j++){
        if(players[i].matchRank > players[j].matchRank){
          let tempPlayer = players[i];
          players[i] = players[j];
          players[j] = tempPlayer;
        }
      }
    }
    return players;
  },
};