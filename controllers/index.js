const express = require('express');
const router = express.Router();

/**
 * userInfo.ejs 랜더링
 */
router.get('/', (req, res)=>{
  res.render('index', {pageInfo: 'userInfo.ejs'});
});

/**
 * userInfo.ejs 랜더링
 */
 router.get('/userInfo', (req, res)=>{
  res.render('userInfo');
});

/**
 * userMatch.ejs 랜더링
 */
router.get('/userMatch', (req, res)=>{
  res.render('userMatch');
});

module.exports = router;