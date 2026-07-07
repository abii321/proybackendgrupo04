const express = require('express');
const router = express.Router();
const calificacionCtrl = require('../controllers/calificacion.controller');
const authCtrl = require('../controllers/auth.controller');

// Proteger todas las rutas de calificaciones (requiere sesión iniciada)
router.use(authCtrl.verifyToken);
router.post('/', calificacionCtrl.crearCalificacion);
router.get('/tutoria/:tutoriaId', calificacionCtrl.obtenerCalificacionPorTutoria);

module.exports = router;
