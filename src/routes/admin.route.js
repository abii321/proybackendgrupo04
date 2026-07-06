const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/admin.controller');

router.get('/summary', adminCtrl.getSummary);
router.get('/users-by-role', adminCtrl.getUsersByRole);
router.get('/requests-by-state', adminCtrl.getHelpRequestsByState);
router.get('/tutorials-by-state', adminCtrl.getTutorialsByState);
router.get('/tutorials-by-month', adminCtrl.getTutorialsByMonth);
router.get('/full-tutorials', adminCtrl.getFullTutorials);

router.get('/users', adminCtrl.getUsers);
router.put('/users/:id', adminCtrl.updateUserAdmin);

router.put('/tutorials/:id', adminCtrl.updateTutorial);
router.delete('/tutorials/:id', adminCtrl.deleteTutorial);

router.get('/categories-list', adminCtrl.getCategoriesList);
router.put('/categories/:id', adminCtrl.updateCategory);
router.delete('/categories/:id', adminCtrl.deleteCategory);

module.exports = router;