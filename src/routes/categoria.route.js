const express = require('express');
const router = express.Router();
const categoriaCtrl = require('../controllers/categoria.controller');

router.post('/profesor', categoriaCtrl.asociarProfesor);
router.delete('/profesor', categoriaCtrl.desasociarProfesor);

router.get('/', categoriaCtrl.getCategorias);

router.get('/profesor/:profesorId', categoriaCtrl.getCategoriasProfesor);

router.get('/:id', categoriaCtrl.getCategoria);
router.post('/', categoriaCtrl.createCategoria);
router.put('/:id', categoriaCtrl.editCategoria);
router.delete('/:id', categoriaCtrl.deleteCategoria);



module.exports = router;
