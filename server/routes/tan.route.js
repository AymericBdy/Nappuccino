const express = require('express');
const router = express.Router();

const TanController = require('../controller/tan');

router.use(function timeLog (req, res, next) {
    console.log('Acessing /tan...')
    next()
})

router.get('/horairesecn', TanController.timetable);

module.exports = router;