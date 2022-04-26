const express = require('express');
const controller = require('../controllers/outercontroller');
const router = express.Router();

router.get('/',controller.index);

router.get('/About',controller.About);

router.get('/contact',controller.contact);


module.exports = router;