const express = require('express');
const router = express.Router();

const mercadoPagoCtrl = require('../controllers/mercadoPago.controller');

router.post('/crear-preferencia', mercadoPagoCtrl.crearPreferencia);

// Webhook
router.post('/webhook', mercadoPagoCtrl.webhook);

module.exports = router;