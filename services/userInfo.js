const axios = require('axios');
module.exports = {
 /**
  * 라이더 정보를 받아온다.
  * 라이더 정보는 이름과 레벨, 접근ID를 받아온다.
  * @param {string} url - 요청 URL
  * @param {object} options - API 사용 인증 설정 
  * @returns {Map<string, string>}
  */
  getUserInfo : async (url, options) => {
    const map = new Map();
    // 라이더 명
    const keyName = "name";

    // 라이더 레벨
    const keyLevel = "level";

    // 라이더 식별자
    const keyAccessId = "accessId";

    // 상태 코드
    const keyStatusCode = "statusCode";

    // 상태 코드에 따른 메시지
    const keyMessage = "message";
    try{
      // 정보 요청
      const response = await axios.get(url, options);
      const resData = response.data;
      // 객체리터럴을 읽지 못하는 문제로 인해 Map을 사용하여 정보를 반환
      map.set(keyName, resData.name);
      map.set(keyLevel, resData.level);
      map.set(keyAccessId, resData.accessId);
      map.set(keyStatusCode, 200);
      map.set(keyMessage, "라이더 정보가 존재합니다.");
    }catch(error){
      map.set(keyStatusCode, 404);
      map.set(keyMessage, "라이더 정보가 존재하지 않습니다.");
    }
    return map;
  },
};