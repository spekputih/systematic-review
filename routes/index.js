var express = require('express');
var router = express.Router();
var fetchController = require('../controllers/fetchController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/fetch', fetchController.index);



module.exports = router;
