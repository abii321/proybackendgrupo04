const express = require('express');
const router = express.Router();
const horarioCtrl = require('../controllers/horario.controller');

router.get('/profesor/:profesor_id', horarioCtrl.getHorariosProfesor);
router.post('/', horarioCtrl.createHorario);
router.delete('/:id', horarioCtrl.deleteHorario);

module.exports = router;