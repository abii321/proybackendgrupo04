const express = require('express');
const router = express.Router();
const precioCtrl = require('../controllers/precio.controller');
const authCtrl = require('../controllers/auth.controller');

// Proteger todas las rutas de precios (requiere sesión iniciada)
router.use(authCtrl.verifyToken);


router.get('/', precioCtrl.getPrecios);

module.exports = router;