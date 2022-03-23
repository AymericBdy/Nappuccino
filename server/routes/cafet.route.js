const express = require('express');
const router = express.Router();

const logger = require('../utils/logger');
const CafetController = require('../controller/cafet');

router.get('/machines/list', CafetController.list_machines);
router.get('/machine/reports/:machine_id', CafetController.infos_machine);
router.post('/machine/vote', CafetController.vote_report);
router.post('/machine/newreport', CafetController.new_report);
router.get('/machine/:type/report_list', CafetController.report_list_old);
router.get('/machine/:type/:machine_id/report_list', CafetController.report_list);

module.exports = router;