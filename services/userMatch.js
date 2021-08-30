const axios = require('axios');
module.exports={

  /**
  * 라이더 매치 정보는 대전 관련 정보를 받아온다.
  * @param {string} url - 요청 URL
  * @param {object} options - API 사용 인증 설정 
  * @returns {Map<string, string>}
   */
  getUserMatches : async (url, options)=>{
    const map = new Map();
    try{
      const response = await axios.get(url, options);
      const resData = response.data;
      const data = resData.matches[0].matchType;
      console.log(data);
    }catch(error){
      console.log("대전 정보가 존재하지 않습니다.");
      console.log(error);
    }
  }
};