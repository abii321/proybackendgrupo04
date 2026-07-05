const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/admin.controller');

router.get('/summary', adminCtrl.getSummary);
router.get('/users-by-role', adminCtrl.getUsersByRole);
router.get('/requests-by-state', adminCtrl.getHelpRequestsByState);
router.get('/tutorials-by-state', adminCtrl.getTutorialsByState);
router.get('/tutorials-by-month', adminCtrl.getTutorialsByMonth);
router.get('/full-tutorials', adminCtrl.getFullTutorials);

module.exports = router;