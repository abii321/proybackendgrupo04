const express = require('express');
const router = express.Router();
const solicitudCtrl = require('./../../controllers/solicitudes/solicitudAyuda.controller');
const authCtrl = require('./../../controllers/auth.controller');

router.get('/', solicitudCtrl.getSolicitudes);
router.get('/:id', solicitudCtrl.getSolicitud);

// Proteger todas las rutas de solicitudes (requiere sesión iniciada)
router.use(authCtrl.verifyToken);

router.post('/', solicitudCtrl.createSolicitud);
router.put('/:id', solicitudCtrl.editSolicitud);
router.put('/:id/cerrar', solicitudCtrl.cerrarSolicitud);
router.delete('/:id', solicitudCtrl.deleteSolicitud);

module.exports = router;