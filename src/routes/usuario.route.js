const express = require('express');
const router = express.Router();
const usuarioCtrl = require('../controllers/usuario.controller');

router.get('/', usuarioCtrl.getUsuarios);
router.put('/:id', usuarioCtrl.updateUsuario);
router.post('/horario', usuarioCtrl.addHorario);
router.delete('/horario/:id', usuarioCtrl.deleteHorario);

module.exports = router;