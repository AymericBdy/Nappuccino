const express = require('express');
const router = express.Router();
const logger = require('../utils/logger.js');

const RuController = require('../controller/ru');

router.get('/menu', RuController.menu);

module.exports = router;