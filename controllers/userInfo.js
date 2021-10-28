/**
 * 유저 정보를 이용한 라이더명 조회하기
 */
const express = require('express');
const router = express.Router();
const kartSdk = require('../configs/kartRiderSDK');
const userInfoService = require('../services/userInfo');

// 카트라이더 openAPI를 쓰기 위한 API KEY 인증 설정
const config = {
  headers: {
    Authorization : kartSdk.key
  },
}

/**
 * 닉네임을 이용한 유저 정보 조회
 */
router.get('/nickname', async (req, res, next) => {
  const {nickname} = req.query;
  const url = `https://api.nexon.co.kr/kart/v1.0/users/nickname/${nickname}`;
  
  // 한글 인식을 하기 위한 인코딩처리
  const encodedUrl = encodeURI(url);

  const riderInfo = await userInfoService.getUserInfo(encodedUrl, config);
  const obj = Object.fromEntries(riderInfo);
  res.json(obj);
});

module.exports = router;