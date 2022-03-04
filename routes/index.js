var express = require('express');
var router = express.Router();
var fetchController = require('../controllers/fetchController');
var homeController = require('../controllers/homeController');

/* GET home page. */
router.get('/', homeController.home);

// GET fetch information from targeted website
router.get('/fetch', fetchController.fetch);

module.exports = router;
