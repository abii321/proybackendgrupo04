const express = require('express');
const router = express.Router();
const autenticacionCtrl = require('../controllers/autenticacion.controller');

router.post('/registrarAlumno', autenticacionCtrl.registrarAlumno);
router.post('/registrarProfesor', autenticacionCtrl.registrarProfesor);


module.exports = router;