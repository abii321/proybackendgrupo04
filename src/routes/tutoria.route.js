const express = require('express');
const router = express.Router();
const tutoriaCtrl = require('../controllers/tutoria.controller');

router.get('/', tutoriaCtrl.getTutorias);
router.post('/', tutoriaCtrl.createTutoria);
router.get('/:id', tutoriaCtrl.getTutoria);
router.put('/:id', tutoriaCtrl.editTutoria);
router.delete('/:id', tutoriaCtrl.deleteTutoria);

module.exports = router;