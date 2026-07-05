const express = require('express');
const router = express.Router();
const horarioCtrl = require('../controllers/horarioDisponible.controller');

router.post('/', horarioCtrl.createHorario);
router.get('/profesor/:profesorId', horarioCtrl.getHorariosProfesor);
router.delete('/:id', horarioCtrl.deleteHorario);

module.exports = router;