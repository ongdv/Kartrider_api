const express = require('express');
const router = express.Router();
const kartSdk = require('../configs/kartRiderSDK');
const userMatchDetailService = require('../services/userMatchDetail');

// 카트라이더 openAPI를 쓰기 위한 API KEY 인증 설정
const config = {
  headers: {
    Authorization: kartSdk.key,
  },
}

/**
 * 매치 상세 정보 조회
 * 해당 URL을 통해 결과를 받아오는 것이 가능하다.
 */
router.get('/matchId', async (req, res, next)=>{
  const {matchId} = req.query;
  const url = `https://api.nexon.co.kr/kart/v1.0/matches/${matchId}`;

  // 한글 인식을 하기 위한 인코딩처리
  const encodedUrl = encodeURI(url);
  let players = await userMatchDetailService.getPlayers(encodedUrl, config);
  players = userMatchDetailService.parseMetaDatas(players);
  players = userMatchDetailService.deleteMetadata(players);
  console.log(players);
  res.json(players);
});


module.exports = router;