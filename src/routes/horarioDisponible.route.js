const express = require('express');
const router = express.Router();
const horarioCtrl = require('../controllers/horarioDisponible.controller');
const authCtrl = require('../controllers/auth.controller');

// Proteger todas las rutas de horario disponible (requiere sesión iniciada)
router.use(authCtrl.verifyToken);


router.post('/', horarioCtrl.createHorario);
router.get('/profesor/:profesorId', horarioCtrl.getHorariosProfesor);
router.delete('/:id', horarioCtrl.deleteHorario);

module.exports = router;