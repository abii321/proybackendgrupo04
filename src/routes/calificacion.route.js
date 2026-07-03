const express = require('express');
const router = express.Router();
const calificacionCtrl = require('../controllers/calificacion.controller');

router.post('/', calificacionCtrl.crearCalificacion);
router.get('/tutoria/:tutoriaId', calificacionCtrl.obtenerCalificacionPorTutoria);

module.exports = router;
