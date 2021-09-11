const axios = require('axios');
const common = require('../configs/common');

let comm = {};

/**
 * 라이더 매치 정보는 대전 관련 정보를 받아온다.
 * @param {string} url - 요청 URL
 * @param {object} options - API 사용 인증 설정 
 * @returns {Map<string, string>}
 */
comm.getUserMatches = async (url, options) => {
  try {
    // 대전 정보를 받아온다.
    const response = await axios.get(url, options);

    // 응답 헤더에서는 data부분만 필요하기 때문에 data를 뽑아낸다.
    const resData = response.data;
    
    return resData;
  } catch (error) {
    console.log("대전 정보가 존재하지 않습니다.");
    console.log(error);
    return null;
  }
};

/**
 * 받아온 요청정보를 메타데이터를 이용하여
 * 모든 ID값을 파싱한다.
 * @param {object} matchObj
 * @returns {object}
 */
comm.parseMetadataAll = (matchObj) => {
  if(!common.isFalse(matchObj)){
    for(let i = 0; i <matchObj.matches.length; i++){
      comm.parseMetadata(matchObj.matches[i]);
    }
  }
  return matchObj;
};


/**
 * 메타데이터를 통해 배열의 인덱스 내 배열의 ID값을 파싱한다.
 * @param {object} matchObj
 * @returns {object}
 */
comm.parseMetadata = (matchObj) => {
  if(!common.isFalse(matchObj)){
    
    // 큰 분류값 (개인전, 팀전 구분)
    matchObj.matchType = common.getGameTypeData(matchObj.matchType);

    for (let i = 0; i < matchObj.matches.length; i++) {
      // 불필요한 데이터 삭제
      matchObj = comm.deleteDataAll(matchObj, i);
      
      // 메타데이터 파싱
      matchObj.matches[i].matchType = common.getGameTypeData(matchObj.matches[i].matchType);
      matchObj.matches[i].trackId = common.getTrackData(matchObj.matches[i].trackId);
      matchObj.matches[i].character = common.getCharacterData(matchObj.matches[i].character);
      matchObj.matches[i].player.kart = common.getKartData(matchObj.matches[i].player.kart);
      matchObj.matches[i].player.flyingPet = common.getFlyingPetData(matchObj.matches[i].player.flyingPet);
      matchObj.matches[i].player.character = common.getCharacterData(matchObj.matches[i].player.character);
    }
    return matchObj;
  }
  console.log('대전 정보가 존재하지 않습니다.');
  return null;
};

// /**
//  * 메타데이터를 통해 ID값을 파싱한다.
//  * @param {object} matchObj
//  * @returns {object}
//  */
//  comm.parseMetadata = (matchObj) => {
//   if(!common.isFalse(matchObj)){
//     for (let i = 0; i < matchObj.matches.length; i++) {
//       // 불필요한 데이터 삭제
//       matchObj = comm.deleteDataAll(matchObj, i);
  
//       // 메타데이터 파싱
//       matchObj.matches[i].matchType = common.getGameTypeData(matchObj.matches[i].matchType);
//       matchObj.matches[i].trackId = common.getTrackData(matchObj.matches[i].trackId);
//       matchObj.matches[i].character = common.getCharacterData(matchObj.matches[i].character);
//       matchObj.matches[i].player.kart = common.getKartData(matchObj.matches[i].player.kart);
//       matchObj.matches[i].player.flyingPet = common.getFlyingPetData(matchObj.matches[i].player.flyingPet);
//       matchObj.matches[i].player.character = common.getCharacterData(matchObj.matches[i].player.character);
//     }
//     return matchObj;
//   }
//   console.log('대전 정보가 존재하지 않습니다.');
//   return null;
// };


/**
 * 불필요한 데이터를 모두 삭제한다.
 * @param {object} matchObj 
 * @param {number} i 
 * @returns {object}
 */
comm.deleteDataAll = function (matchObj, index) {
  delete matchObj.matches[index].seasonType;
  delete matchObj.matches[index].accountNo;
  delete matchObj.matches[index].matchId;
  delete matchObj.matches[index].startTime;
  delete matchObj.matches[index].endTime;
  delete matchObj.matches[index].player.accountNo;
  delete matchObj.matches[index].player.characterName;
  delete matchObj.matches[index].player.partsEngine;
  delete matchObj.matches[index].player.partsHandle;
  delete matchObj.matches[index].player.partsWheel;
  delete matchObj.matches[index].player.partsKit;
  delete matchObj.matches[index].player.matchTime;
  return matchObj;
};

module.exports = comm;