const express = require('express');
const router = express.Router();
const solicitudCtrl = require('./../../controllers/solicitudes/solicitudAyuda.controller');
// const authCtrl = require('./../../controllers/auth.controller');

// rutas solicitud
// despues agregar authCtrl.verifyToken para proteger las rutas
router.get('/', solicitudCtrl.getSolicitudes);
router.get('/:id', solicitudCtrl.getSolicitud);
router.post('/', solicitudCtrl.createSolicitud);
router.put('/:id', solicitudCtrl.editSolicitud);
router.put('/:id/cerrar', solicitudCtrl.cerrarSolicitud);
router.delete('/:id', solicitudCtrl.deleteSolicitud);

module.exports = router;