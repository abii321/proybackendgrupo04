const express = require('express');
const router = express.Router();
const respuestaCtrl = require('./../../controllers/solicitudes/respuestaAyuda.controller');
const authCtrl = require('./../../controllers/auth.controller');

router.get('/solicitud/:solicitudId', respuestaCtrl.getRespuestasBySolicitud);

// Proteger todas las rutas de respuestas (requiere sesión iniciada)
router.use(authCtrl.verifyToken);

router.post('/', respuestaCtrl.createRespuesta);
router.put('/:id', respuestaCtrl.editRespuesta);
router.put('/:id/aceptar', respuestaCtrl.aceptarRespuesta);
router.delete('/:id', respuestaCtrl.deleteRespuesta);

module.exports = router;