const express = require('express');
const router = express.Router();
const respuestaCtrl = require('./../../controllers/solicitudes/respuestaAyuda.controller');
const authCtrl = require('./../../controllers/auth.controller');

router.get('/solicitud/:solicitudId', authCtrl.verifyToken, respuestaCtrl.getRespuestasBySolicitud);


router.post('/', authCtrl.verifyToken, respuestaCtrl.createRespuesta);
router.put('/:id', authCtrl.verifyToken, respuestaCtrl.editRespuesta);
router.put('/:id/aceptar', authCtrl.verifyToken, respuestaCtrl.aceptarRespuesta);
router.delete('/:id', authCtrl.verifyToken, respuestaCtrl.deleteRespuesta);

module.exports = router;