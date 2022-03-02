const express = require('express');
const router = express.Router();

const CafetController = require('../controller/cafet');

//Check authentication
//Not needed for the ru router.use(require('../controller/auth').validatetoken); 

router.use(function timeLog (req, res, next) {
    console.log('Acessing /cafet...')
    next()
})

router.get('/machines/list', CafetController.list_machines);
router.get('/machine/reports/:machine_id', CafetController.infos_machine);
router.post('/machine/vote', CafetController.vote_report);
router.post('/machine/newreport', CafetController.new_report);

module.exports = router;