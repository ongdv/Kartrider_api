const axios = require('axios');
const common = require('../configs/common');

module.exports = {
  /**
   * 라이더 매칭 정보는 대전 관련 정보를 받아온다.
   * @param {string} url - 요청 URL
   * @param {object} options - API 사용 인증 설정 
   * @returns {Map<string, string>}
   */
  getUserMatches: async (url, options) => {
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
  },

  /**
   * 메타데이터를 통해 배열의 인덱스 내 배열의 ID값을 파싱한다.
   * @param {object []} matchInfoArray
   * @returns {object []}
   */
  parseMetadata: (matchInfoArray) => {
    const { matches } = matchInfoArray.matches[0];
    if (!common.isFalse(matchInfoArray)) {
      matches.forEach((match) => {
        const { matchType, trackId, character } = match;
        const { kart, matchTime } = match.player;
        match.matchType = common.getGameTypeData(matchType);
        match.trackId = common.getTrackData(trackId);
        match.character = common.getCharacterData(character);
        match.player.kartName = common.getKartData(kart);
        match.player.character = common.getCharacterData(character);
        match.player.matchTime = common.convertTime(matchTime);
      });
      return matchInfoArray;
    }
    else {
      console.log('대전 정보가 존재하지 않습니다.');
      return null;
    }
  },

  /**
   * 대전 유형 정보를 변환한다.
   * 스피드 개인전, 스피드 팀전....
   * @param {*} matchInfoArray 
   */
  parseGameTypeData: (matchInfoArray) => {
    const { matches } = matchInfoArray;
    matches.forEach((match) => {
      const { matchType } = match;
      match.matchType = common.getGameTypeData(matchType);
    });
    return matchInfoArray;
  },

  /**
   * 불필요한 데이터를 모두 삭제한다.
   * @param {object []} matchInfoArray 
   * @returns {object []}
   */
  deleteDataAll: (matchInfoArray) => {
    const { matches } = matchInfoArray.matches[0];
    matches.forEach((match) => {
      delete match.seasonType;
      delete match.startTime;
      delete match.endTime;
      delete match.player.accountNo;
      delete match.player.license;
      delete match.player.pet;
      delete match.player.flyingPet;
      delete match.player.characterName;
      delete match.player.partsEngine;
      delete match.player.partsHandle;
      delete match.player.partsWheel;
      delete match.player.partsKit;
    });
    return matchInfoArray;
  },

  /**
   * 일부 숫자는 리타이어로 표기되게 변경
   * @param {object} matchInfoArray
   */
  updateNumToRetired: (matchInfoArray) => {
    const { matches } = matchInfoArray.matches[0];
    matches.forEach((match) => {
      const { matchRank } = match.player;
      const { playerCount } = match;

      if (matchRank == "99" || common.isFalse(matchRank))
        match.player.matchRank = "#리타이어";
      else
        match.player.matchRank = `#${matchRank}/${playerCount}`;
    });
    return matchInfoArray;
  },

  /**
   * 등록되어 있지 않은 카트바디를 "알 수 없는 카트바디"로 표기
   * @param {object} matchInfoArray
   */
  updateNullToKart: (matchInfoArray) => {
    const { matches } = matchInfoArray.matches[0];
    matches.forEach((match) => {
      const { kartName } = match.player;
      if (common.isFalse(kartName))
        match.player.kartName = "알 수 없는 카트바디";
    });
    return matchInfoArray;
  },

  /**
   * 요청 url에 대전유형을 추가한다.
   * @param {string} url - 대전 정보 요청 URL
   * @returns {string}
   */
  addMatchType: (url, matchType) => {
    if (common.isFalse(matchType))
      url += `&match_types=7b9f0fd5377c38514dbb78ebe63ac6c3b81009d5a31dd569d1cff8f005aa881a`;
    else if(matchType == "스피드 개인전")
      url += `&match_types=7b9f0fd5377c38514dbb78ebe63ac6c3b81009d5a31dd569d1cff8f005aa881a`;
    else if (matchType == "스피드 팀전")
      url += '&match_types=effd66758144a29868663aa50e85d3d95c5bc0147d7fdb9802691c2087f3416e';
    else if (matchType == "클럽 스피드 팀전")
      url += `&match_types=826ecdb309f3a2b80a790902d1b133499866d6b933c7deb0916979d1232f968c`;
    return url;
  },

};