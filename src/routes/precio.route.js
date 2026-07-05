const express = require('express');
const router = express.Router();
const precioCtrl = require('../controllers/precio.controller');

router.get('/', precioCtrl.getPrecios);

module.exports = router;