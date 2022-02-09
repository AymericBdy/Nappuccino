const express = require('express');
const router = express.Router();

const RuController = require('../controller/ru');

//Check authentication
//Not needed for the ru router.use(require('../controller/auth').validatetoken); 

router.use(function timeLog (req, res, next) {
    console.log('Acessing /ru...')
    next()
})

router.get('/menu', RuController.menu);

module.exports = router;