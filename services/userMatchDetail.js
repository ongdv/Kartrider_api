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
      const gettedMatchDetail = await axios.get(url, options);
      const {players} = gettedMatchDetail.data;
      return players;
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
   * 사용하지 않는 메타데이터 삭제
   * @param {object} players - 플레이어들의 정보
   */
  deleteMetadata : (players) => {
    players.forEach((player)=>{
      delete player.character;
      delete player.license;
      delete player.pet;
      delete player.flyingPet;
      delete player.matchRetired;
      delete player.partsWheel;
      delete player.partsKit;
      delete player.partsHandle;
      delete player.partsEngine;
      delete player.matchWin;
    });
    return players;
  }
};