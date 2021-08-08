const express = require('express');
const router = express.Router();

/**
 * index.ejs 랜더링
 */
router.get('/', (req, res)=>{
  res.render('index');
});

router.get('/g', (req, res)=>{
  console.log('ok');
});

module.exports = router;