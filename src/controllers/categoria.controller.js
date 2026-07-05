const Categoria = require('../models/categoria.model');
const ProfesorCategoria = require('../models/profesorCategoria.model');
const Usuario = require('../models/usuario.model');
const Tutoria = require('../models/tutoria.model');

const categoriaCtrl = {};
const { Op, where } = require('sequelize');

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
        const { profesorId, categoriaId } = req.body;

        const profesor = await Usuario.findByPk(profesorId);
        const categoria = await Categoria.findByPk(categoriaId);
        if (!profesor || !categoria) return res.status(400).json({ status: 0, msg: 'El profesor o la categoría especificada no es válida.' });
        
        const relacion = await ProfesorCategoria.findOne({ where: { profesorId, categoriaId } });

        if (relacion && relacion.estado === 'inactivo') {
            relacion.estado = 'activo'; await relacion.save();
            return res.json({ status: 1, msg: 'Profesor asociado nuevamente a la categoría.', data: relacion });
        }

        const nuevaRelacion = await ProfesorCategoria.create({ profesorId, categoriaId, estado: 'activo' });
        return res.json({ status: 1, msg: 'Profesor asociado a la categoría.', data: nuevaRelacion });

    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al asociar profesor a la categoría' });
    }
};

categoriaCtrl.desasociarProfesor = async (req, res) => {
    try {
        const { profesorId, categoriaId } = req.body;

        const relacion = await ProfesorCategoria.findOne({ where: { profesorId, categoriaId } });
        if(!relacion) return res.status(400).json({ status: 0, msg: 'La asociación no existe.' });

         // Verificar que no tenga tutorías activas
        const tutoriaActiva = await Tutoria.findOne({
            where: {
                profesorId,
                categoriaId,
                estado: {
                    [Op.in]: ['pendiente', 'aceptada']
                }
            }
        });
        if (tutoriaActiva) 
            return res.status(409).json({ status: 0, msg: 'No se puede quitar la categoría porque el profesor tiene tutorías activas en ella.' });
        
        relacion.estado = 'inactivo'; await relacion.save();
        res.json({ status: 1, msg: 'Profesor desasociado de la categoría' });
    } catch (error) {
        console.error("Error al desasociar profesor:", error);
        res.status(500).json({ status: 0, msg: 'Error interno al desasociar profesor' });
    }
};

categoriaCtrl.getCategoriasProfesor = async (req, res) => {
    try {
        const { profesorId } = req.params;
        const categorias = await Categoria.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [{
                model: Usuario,
                as: 'profesores',
                where: { id: profesorId },
                attributes: [], // No necesitamos los atributos del profesor, solo filtrar
                through: {
                    where: { estado: 'activo' },
                    attributes: [] // No necesitamos los atributos de la tabla intermedia
                }
            }]
        });
        res.json({ status: 1, data: categorias });
    } catch (error) {   
        res.status(500).json({ status: 0, msg: 'Error al obtener categorías del profesor' });
    }
}

module.exports = categoriaCtrl;
