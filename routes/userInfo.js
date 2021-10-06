/**
 * 유저 정보를 이용한 라이더명 조회하기
 */
const express = require('express');
const router = express.Router();
const kartSdk = require('../configs/kartRiderSDK');
const userInfoService = require('../services/userInfo');

/**
 * 닉네임을 이용한 유저 정보 조회
 * 단순하게 URL의 nickname만 던져서 확인을 해보도록 하자.
 * https://api.nexon.co.kr/kart/v1.0/users/nickname/{nickname}
 */
router.get('/nickname', async (req, res, next) => {
  // 라이더명을 받아옴
  const {nickname} = req.query;
  
  // 카트라이더 openAPI를 쓰기 위한 API KEY 인증 설정
  const config = {
    headers: {Authorization : kartSdk.key},
  }
  // 요청 URL
  const url = `https://api.nexon.co.kr/kart/v1.0/users/nickname/${nickname}`;
  
  // 한글 인식을 하기 위한 인코딩처리
  const encodedUrl = encodeURI(url);

  // URL 요청을 하여 정보를 받아옴.
  const riderInfo = await userInfoService.getUserInfo(encodedUrl, config);
  const obj = Object.fromEntries(riderInfo);
  res.json(obj);
});

module.exports = router;