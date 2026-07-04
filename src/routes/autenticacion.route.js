const express = require('express');
const router = express.Router();
const autenticacionCtrl = require('../controllers/autenticacion.controller');

router.post('/signUp', autenticacionCtrl.signUpUsuario);
router.post('/login', autenticacionCtrl.loginUsuario);
router.post('/signUpGoogle', autenticacionCtrl.signUpGoogle);
router.post('/loginGoogle', autenticacionCtrl.loginGoogle);
//router.post('/vincularGoogle', autenticacionCtrl.vincularGoogle);

module.exports = router;