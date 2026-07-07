const express = require('express');
const router = express.Router();
const usuarioCtrl = require('../controllers/usuario.controller');
const authCtrl = require('../controllers/auth.controller');

// Proteger todas las rutas de usuario (requiere sesión iniciada)
router.use(authCtrl.verifyToken);


router.get('/', authCtrl.verifyToken, usuarioCtrl.getUsuarios);
router.put('/:id', authCtrl.verifyToken, usuarioCtrl.updateUsuario);
router.post('/horario', authCtrl.verifyToken, usuarioCtrl.addHorario);
router.delete('/horario/:id', authCtrl.verifyToken, usuarioCtrl.deleteHorario);

module.exports = router;