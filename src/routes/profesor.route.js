const express = require('express');
const router = express.Router();
const profesorCtrl = require('../controllers/profesor.controller');

router.get('/',profesorCtrl.getProfesores);

module.exports = router;