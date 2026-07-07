const express = require('express');
const router = express.Router();
const autenticacionCtrl = require('../controllers/autenticacion.controller');
const loginLimiter = require('../middleware/loginIntentos');

router.post('/signUp', autenticacionCtrl.signUpUsuario);
router.post('/login', loginLimiter, autenticacionCtrl.loginUsuario);
router.post('/signUpGoogle', autenticacionCtrl.signUpGoogle);
router.post('/loginGoogle', autenticacionCtrl.loginGoogle);
//router.post('/vincularGoogle', autenticacionCtrl.vincularGoogle);

module.exports = router;