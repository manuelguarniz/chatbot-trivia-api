const express = require('express');
const router = express.Router();
const triviaBusiness = require('../business/trivia.business');

/* GET users listing. */
router.post('/', function(req, res, next) {
  const userMessage = req.body.message;
  const response = triviaBusiness.processMessage(userMessage);
  res.json({ response });
});

module.exports = router;
