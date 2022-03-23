const express = require('express');
const router = express.Router();
const logger = require('../utils/logger.js');

const RuController = require('../controller/ru');

router.use(function timeLog (req, res, next) {
    logger.logInfo('Acessing /ru...', req.ip);
    next()
})

router.get('/menu', RuController.menu);

module.exports = router;