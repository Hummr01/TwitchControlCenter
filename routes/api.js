var express = require('express');
var router = express.Router();
let processedFollows = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('API');
})
  .post('/events/follow', function(req, res, next) {
    processedFollows.push(req.body);
    res.send(processedFollows);
  });


module.exports = router;
module.exports.processedFollows = processedFollows;

