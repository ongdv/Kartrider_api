const axios = require('axios');
const common = require('../configs/common');

let myModule = {};

/**
 * 라이더 매칭 정보는 대전 관련 정보를 받아온다.
 * @param {string} url - 요청 URL
 * @param {object} options - API 사용 인증 설정 
 * @returns {Map<string, string>}
 */
myModule.getUserMatches = async (url, options) => {
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
myModule.parseMetadataAll = (matchObj) => {
  if (!common.isFalse(matchObj)) {
    for (let i = 0; i < matchObj.matches.length; i++) {
      myModule.parseMetadata(matchObj.matches[i]);
    }
  }
  return matchObj;
};


/**
 * 메타데이터를 통해 배열의 인덱스 내 배열의 ID값을 파싱한다.
 * @param {object} matchObj
 * @returns {object}
 */
myModule.parseMetadata = (matchObj) => {
  if (!common.isFalse(matchObj)) {

    // 큰 분류값 (개인전, 팀전 구분)
    matchObj.matchType = common.getGameTypeData(matchObj.matchType);

    for (let i = 0; i < matchObj.matches.length; i++) {
      // 불필요한 데이터 삭제
      matchObj = myModule.deleteDataAll(matchObj, i);

      const { matchType, trackId, character } = matchObj.matches[i];
      const { kart, matchTime } = matchObj.matches[i].player;

      // 메타데이터 파싱
      matchObj.matches[i].matchType = common.getGameTypeData(matchType);
      matchObj.matches[i].trackId = common.getTrackData(trackId);
      matchObj.matches[i].character = common.getCharacterData(character);
      matchObj.matches[i].player.kartName = common.getKartData(kart);
      matchObj.matches[i].player.character = common.getCharacterData(character);
      matchObj.matches[i].player.matchTime = common.convertTime(matchTime);
    }
    return matchObj;
  }
  console.log('대전 정보가 존재하지 않습니다.');
  return null;
};


/**
 * 불필요한 데이터를 모두 삭제한다.
 * @param {object} matchObj 
 * @param {number} i 
 * @returns {object}
 */
myModule.deleteDataAll = function (matchObj, index) {
  delete matchObj.matches[index].seasonType;
  delete matchObj.matches[index].startTime;
  delete matchObj.matches[index].endTime;
  delete matchObj.matches[index].player.accountNo;
  delete matchObj.matches[index].player.characterName;
  delete matchObj.matches[index].player.partsEngine;
  delete matchObj.matches[index].player.partsHandle;
  delete matchObj.matches[index].player.partsWheel;
  delete matchObj.matches[index].player.partsKit;
  return matchObj;
};

module.exports = myModule;