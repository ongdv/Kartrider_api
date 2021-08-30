const express = require('express');
const router = express.Router();
const show = require('../services/show');

/**
 * userInfo.ejs 랜더링
 */
router.get('/', (req, res)=>{
  res.render('userInfo');
});

/**
 * loginpage.ejs 랜더링
 */
router.get('/login', (req, res)=>{
  res.render('loginpage');
});

router.post('/put', (req, res)=>{
  console.log('/put/userID/userName');
  const {userID, userName} = req.query;
  show.showAll(userID, userName);
  const result = show.putStringAtUserID(userID);
  console.log(result);
  res.status(200).send({
    userID : userID,
    userName : userName
  });
});

module.exports = router;