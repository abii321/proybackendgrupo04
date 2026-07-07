const express = require('express');
const router = express.Router();
const chatCtrl = require('../controllers/chat.controller');
const authCtrl = require('../controllers/auth.controller');

// Proteger todas las rutas de chat (requiere sesión iniciada)
router.use(authCtrl.verifyToken);

router.post('/', chatCtrl.sendMessage);

module.exports = router;