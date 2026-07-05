const Categoria = require('../models/categoria.model');
const ProfesorCategoria = require('../models/profesorCategoria.model');
const Usuario = require('../models/usuario.model');

const categoriaCtrl = {};

categoriaCtrl.getCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.findAll({
            attributes: {
                exclude: [ 'createdAt, updatedAt' ]
            }
        });
        res.json({ status: 1, msg: 'success', data: categorias });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al obtener categorías' });
    }
};


categoriaCtrl.getCategoria = async (req, res) => {
    try {
        const categoria = await Categoria.findByPk(req.params.id);
        if (!categoria) return res.json({ status: 0, msg: 'Categoría no encontrada' });
        res.json({ status: 1, msg: 'success', data: categoria });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al obtener categoría' });
    }
};

categoriaCtrl.createCategoria = async (req, res) => {
    try {
        const nueva = await Categoria.create({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion
        });
        res.json({ status: 1, msg: 'Categoría creada correctamente', data: nueva });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al crear categoría' });
    }
};

categoriaCtrl.editCategoria = async (req, res) => {
    try {
        await Categoria.update({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion
        }, { where: { id: req.params.id } });
        res.json({ status: 1, msg: 'Categoría actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al actualizar categoría' });
    }
};

categoriaCtrl.deleteCategoria = async (req, res) => {
    try {
        await Categoria.destroy({ where: { id: req.params.id } });
        res.json({ status: 1, msg: 'Categoría eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al eliminar categoría' });
    }
};

categoriaCtrl.asociarProfesor = async (req, res) => {
    try {
        const { profesor_id, categoria_id } = req.body;

        const profesor = await Usuario.findOne({ where: { id: profesor_id, rol: 'profesor' } });
        const categoria = await Categoria.findByPk(categoria_id);

        if (!profesor || !categoria) {
            return res.status(400).json({ status: 0, msg: 'El profesor o la categoría especificada no es válida.' });
        }

        const [relacion, creada] = await ProfesorCategoria.findOrCreate({
            where: { profesor_id, categoria_id }
        });

        res.json({
            status: 1,
            msg: creada ? 'Profesor asociado a la categoría' : 'La asociación ya existía',
            data: relacion
        });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al asociar profesor a la categoría' });
    }
};

categoriaCtrl.desasociarProfesor = async (req, res) => {
    try {
        const { profesor_id, categoria_id } = req.body;
        await ProfesorCategoria.destroy({ where: { profesor_id, categoria_id } });
        res.json({ status: 1, msg: 'Profesor desasociado de la categoría' });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al desasociar profesor' });
    }
};

module.exports = categoriaCtrl;
