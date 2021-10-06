const fs = require('fs');
const trackFile = fs.readFileSync('./metadata/track.json', 'utf8');
const kartFile = fs.readFileSync('./metadata/kart.json', 'utf8');
const flyingPetFile = fs.readFileSync('./metadata/flyingPet.json', 'utf8');
const gameTypeFile = fs.readFileSync('./metadata/gameType.json', 'utf8');
const characterFile = fs.readFileSync('./metadata/character.json', 'utf8');
module.exports = {
  /**
   * 트랙 정보를 받아온다.
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
   * 게임 캐릭터 정보를 받아온다.
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
  },

  /**
   * 사람이 읽을 수 있는 시간값으로 변환한다.
   * @param {string} timeData 
   */
  convertTime : (timeData) => {
    let result = ''; 
    let sec = '';
    let milliSec = ''; 
    let minute = '';
  
    // 리타이어일 경우 0으로 표기됨
    if(timeData == 0)
      return "리타이어";
    
    // 내가 작성했던 방법
    // switch(timeData.length){
    //   // s.SSS (10초 미만)
    //   case 4:
    //     sec = parseInt(timeData.slice(0, 1));
    //     milliSec = timeData.slice(1, 4);
    //     break;
    //   // ss.SSS (10초 이상 100초 미만)
    //   case 5:
    //     sec = parseInt(timeData.slice(0, 2));
    //     milliSec = timeData.slice(2, 5);
    //     break;
    //   // sss.SSS (100초 이상 1000초 미만)
    //   case 6:
    //     sec = parseInt(timeData.slice(0, 3));
    //     milliSec = timeData.slice(3, 6);
    //     break;
    // }
  
    // 개선 사항
    sec = parseInt(timeData.slice(0, timeData.length - 3));
    milliSec = timeData.slice(timeData.length - 3, timeData.length);
  
    // 나눗셈 후 정수값만 받을 수 있게 처리
    minute = parseInt(sec / 60);
    sec = sec % 60;
  
    // x분 01초, x분 02초, 이런 형태로 표기되게끔 처리
    if(sec < 10)
      sec = `0${sec}`;
    
    result = `${minute}'${sec}'${milliSec}`;
    return result;
  }
};