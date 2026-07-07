const express = require('express');
const router = express.Router();
const solicitudCtrl = require('./../../controllers/solicitudes/solicitudAyuda.controller');
const authCtrl = require('./../../controllers/auth.controller');

router.get('/', authCtrl.verifyToken, solicitudCtrl.getSolicitudes);
router.get('/:id', authCtrl.verifyToken, solicitudCtrl.getSolicitud);

// Proteger todas las rutas de solicitudes (requiere sesión iniciada)

router.post('/', authCtrl.verifyToken, solicitudCtrl.createSolicitud);
router.put('/:id', authCtrl.verifyToken, solicitudCtrl.editSolicitud);
router.put('/:id/cerrar', authCtrl.verifyToken, solicitudCtrl.cerrarSolicitud);
router.delete('/:id', authCtrl.verifyToken, solicitudCtrl.deleteSolicitud);

module.exports = router;