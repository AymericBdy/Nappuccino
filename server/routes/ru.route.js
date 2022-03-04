const express = require('express');
const router = express.Router();
const logger = require('../utils/logger.js');

const RuController = require('../controller/ru');

//Check authentication
//Not needed for the ru router.use(require('../controller/auth').validatetoken); 

router.use(function timeLog (req, res, next) {
    logger.logInfo('Acessing /ru...', req.ip);
    next()
})

router.get('/menu', RuController.menu);

module.exports = router;