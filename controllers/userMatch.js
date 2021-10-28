/**
 * 유저 고유 식별자를 이용한 매치 리스트 조회하기
 * 고유 식별자는 ID 형태이기 때문에 라이더명으로 정보를 조회하고
 * 해당 라이더의 고유 식별자를 이용하여 매치 정보를 불러오게 된다.
 * 그러기 위해서는 다음과 같은 과정이 필요하다.
 * 1. 라이더 명을 이용하여 유저 정보를 가져온다.
 * 2. 라이더 고유 식별자로 매치 정보를 가져온다.
 */
const express = require('express');
const router = express.Router();
const kartSdk = require('../configs/kartRiderSDK');
const userInfoService = require('../services/userInfo');
const userMatchService = require('../services/userMatch');

// 라이더 정보를 담을 object
let obj = {};

// 카트라이더 openAPI를 쓰기 위한 API KEY 인증 설정
const config = {
  headers: {
    Authorization: kartSdk.key,
  },
}

/**
 * 먼저 라이더명을 이용하여 Id를 받아온다.
 * 매치 정보에는 다음과 같은 정보가 필요하다.
 */
router.get('/nickname', async (req, res, next) => {
  const { nickname } = req.query;
  const url = `https://api.nexon.co.kr/kart/v1.0/users/nickname/${nickname}`;

  // 한글 인식을 하기 위한 인코딩처리
  const encodedUrl = encodeURI(url);
  const riderInfo = await userInfoService.getUserInfo(encodedUrl, config);
  if (riderInfo.get("statusCode") == 200) {
    riderInfo.delete("level");

    // map -> object로 변환
    obj = Object.fromEntries(riderInfo);
    console.log(obj);

    next();
  }
  else {

    // map -> object로 변환
    obj = Object.fromEntries(riderInfo);
    console.log(obj);
    res.json(obj);
  }
});


/**
 * 받은 라이더 정보를 토대로 매치 정보를 조회한다.
 */
router.get('/nickname', async (req, res, next) => {

  const { matchType } = req.query;
  console.log(matchType);
  let url = `https://api.nexon.co.kr/kart/v1.0/users/${obj.accessId}/matches?limit=500`;

  url = userMatchService.addMatchType(url, matchType);
  console.log(url);
  // 한글 인식을 하기 위한 인코딩처리
  const encodedUrl = encodeURI(url);
  let matchInfoArray = await userMatchService.getUserMatches(encodedUrl, config);

  matchInfoArray.statusCode = obj.statusCode;
  matchInfoArray = userMatchService.parseGameTypeData(matchInfoArray);
  matchInfoArray = userMatchService.parseMetadata(matchInfoArray);
  matchInfoArray = userMatchService.updateNumToRetired(matchInfoArray);
  matchInfoArray = userMatchService.updateNullToKart(matchInfoArray);
  matchInfoArray = userMatchService.deleteDataAll(matchInfoArray);
  console.log(matchInfoArray);
  res.json(matchInfoArray);
});

module.exports = router;