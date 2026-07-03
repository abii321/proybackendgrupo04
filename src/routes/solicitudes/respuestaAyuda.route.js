const express = require('express');
const router = express.Router();
const respuestaCtrl = require('./../../controllers/solicitudes/respuestaAyuda.controller');
// const authCtrl = require('./../../controllers/auth.controller');

//después agregar authCtrl.verifyToken para proteger las rutas
router.get('/solicitud/:id_solicitud',  respuestaCtrl.getRespuestasBySolicitud);
router.post('/', respuestaCtrl.createRespuesta);
router.put('/:id', respuestaCtrl.editRespuesta);
router.put('/:id/aceptar', respuestaCtrl.aceptarRespuesta);
router.delete('/:id', respuestaCtrl.deleteRespuesta);

module.exports = router;