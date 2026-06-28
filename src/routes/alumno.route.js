const express = require('express');
const router = express.Router();
const alumnoCtrl = require('../controllers/alumno.controller');

route.get('/',alumnoCtrl.getAlumnos);

module.exports = router;