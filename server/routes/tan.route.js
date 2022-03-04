const express = require('express');
const router = express.Router();
const logger = require('../utils/logger.js');

const TanController = require('../controller/tan');

router.use(function timeLog (req, res, next) {
    logger.logInfo('Acessing /tan...', req.ip);
    next();
});

router.get('/ecn/:direction', TanController.timetable);

module.exports = router;