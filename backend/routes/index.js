var express = require('express');
var router = express.Router();

/* Redirects to Frontend */
router.get('/', function(req, res, next) {
  res.redirect(process.env.FRONTEND_URL);
});

module.exports = router;
