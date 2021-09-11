const fs = require('fs');
const trackFile = fs.readFileSync('./metadata/track.json', 'utf8');
const kartFile = fs.readFileSync('./metadata/kart.json', 'utf8');
const flyingPetFile = fs.readFileSync('./metadata/flyingPet.json', 'utf8');
const gameTypeFile = fs.readFileSync('./metadata/gameType.json', 'utf8');
const characterFile = fs.readFileSync('./metadata/character.json', 'utf8');
module.exports = {
  /**
   * 트랙 정보를 받아온다.
   * 빌리지 고가의 질주, 사막 빙글빙글 공사장...
   * @param {string} targetTrackId 
   * @returns {string}
   */
  getTrackData: (targetTrackId) => {
    const trackData = JSON.parse(trackFile);
    for (let i = 0; i < trackData.length; i++) {
      if (targetTrackId == trackData[i].id){
        return trackData[i].name;
      }
    }
    //return null;
  },

  /**
   * 카트바디 메타데이터를 받아온다.
   * 파라곤X, 파이어마라톤V1, 세이버Z7-R...
   * @param {string} targetKartId 
   * @returns {string}
   */
  getKartData: (targetKartId) => {
    
    const kartData = JSON.parse(kartFile);
    for (let i = 0; i < kartData.length; i++) {
      if (targetKartId == kartData[i].id)
        return kartData[i].name;
    }
    return null;
  },

  /**
   * 플라잉펫 메타데이터를 받아온다.
   * 플라잉 라이트론, 플라잉 수리검??, ...
   * @param {string} targetFlyingPetId 
   * @returns {string}
   */
  getFlyingPetData: (targetFlyingPetId) => {
    
    const flyingPetData = JSON.parse(flyingPetFile);
    for (let i = 0; i < flyingPetData.length; i++) {
      if (targetFlyingPetId == flyingPetData[i].id)
        return flyingPetData[i].name;
    }
    return null;
  },

  /**
   * 게임 유형 메타데이터를 받아온다.
   * 스피드팀전, 스피드개인전, 보스전...
   * @param {string} targetGameTypeId 
   * @returns {string}
   */
  getGameTypeData: (targetGameTypeId) => {
    
    const gameTypeData = JSON.parse(gameTypeFile);
    for (let i = 0; i < gameTypeData.length; i++) {
      if (targetGameTypeId == gameTypeData[i].id)
        return gameTypeData[i].name;
    }
    return null;
  },

  /**
   * 게임 유형 메타데이터를 받아온다.
   * 스피드팀전, 스피드개인전, 보스전...
   * @param {string} targetCharacterId 
   * @returns {string}
   */
  getCharacterData: (targetCharacterId) => {
    
    const characterData = JSON.parse(characterFile);
    for (let i = 0; i < characterData.length; i++) {
      if (targetCharacterId == characterData[i].id){
        return characterData[i].name;
      }
    }
    return null;
  },

  /**
   * 객체를 복사한다.
   * @param {object} target 
   * @returns 
   */
  clone: (target) => {
    return JSON.parse(JSON.stringify(target));
  },

  /**
   * 다음 결과값은 모두 False로 취급한다. (undefined, null)
   * @param {*} param 
   * @returns 
   */
  isFalse : (param) =>{
    return param == undefined || param == null;
  }
};