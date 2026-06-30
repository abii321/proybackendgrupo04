const express = require('express');
const router = express.Router();
const categoriaCtrl = require('../controllers/categoria.controller');

router.get('/', categoriaCtrl.getCategorias);
router.get('/:id', categoriaCtrl.getCategoria);
router.post('/', categoriaCtrl.createCategoria);
router.put('/:id', categoriaCtrl.editCategoria);
router.delete('/:id', categoriaCtrl.deleteCategoria);

router.post('/profesor', categoriaCtrl.asociarProfesor);
router.delete('/profesor', categoriaCtrl.desasociarProfesor);

module.exports = router;
