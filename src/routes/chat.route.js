const express = require('express');
const router = express.Router();
const chatCtrl = require('../controllers/chat.controller');

// sin verifyToken por ahora
router.post('/', chatCtrl.sendMessage);

module.exports = router;