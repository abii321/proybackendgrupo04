const express = require('express');
const router = express.Router();
const tutoriaCtrl = require('../controllers/tutoria.controller');
const authCtrl = require('../controllers/auth.controller');

router.get('/', authCtrl.verifyToken, tutoriaCtrl.getTutorias);
router.post('/', authCtrl.verifyToken, tutoriaCtrl.createTutoria);
router.get('/:id', authCtrl.verifyToken, tutoriaCtrl.getTutoria);
router.put('/:id', authCtrl.verifyToken, tutoriaCtrl.editTutoria);
router.delete('/:id', authCtrl.verifyToken, tutoriaCtrl.deleteTutoria);

module.exports = router;