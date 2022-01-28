const express = require('express');
const router = express.Router();

const RuController = require('../controller/ru');

router.use(function timeLog (req, res, next) {
    console.log('Acessing /ru...')
    next()
})

router.get('/menu', RuController.menu);

module.exports = router;