const { fn, col, literal, Op } = require('sequelize');
const Usuario = require('../models/usuario.model');
const Tutoria = require('../models/tutoria.model');
const SolicitudAyuda = require('../models/solicitudes/solicitudAyuda.model');
const Categoria = require('../models/categoria.model');
const Calificacion = require('../models/calificacion.model');

const adminCtrl = {};

// Números generales para las cards
adminCtrl.getSummary = async (req, res) => {
    try {
        const totalUsers = await Usuario.count();
        const totalTutorials = await Tutoria.count();
        const totalHelpRequests = await SolicitudAyuda.count();
        const totalCategories = await Categoria.count();
        const avgRatingResult = await Calificacion.findOne({
            attributes: [[fn('AVG', col('calificacion')), 'avgRating']]
        });
        const avgRating = avgRatingResult
            ? parseFloat(avgRatingResult.dataValues.avgRating || 0).toFixed(1)
            : '0.0';

        res.json({
            status: 1,
            msg: 'success',
            data: { totalUsers, totalTutorials, totalHelpRequests, totalCategories, avgRating }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 0, msg: 'Error al obtener resumen' });
    }
};

// Usuarios por rol y estado — gráfico barra apilada 
adminCtrl.getUsersByRole = async (req, res) => {
    try {
        const data = await Usuario.findAll({
            attributes: [
                'rol',
                'estado',
                [fn('COUNT', col('id')), 'count']
            ],
            group: ['rol', 'estado'],
            order: [['rol', 'ASC']]
        });
        res.json({ status: 1, msg: 'success', data });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al obtener usuarios por rol' });
    }
};

// Solicitudes por estado — gráfico torta
adminCtrl.getHelpRequestsByState = async (req, res) => {
    try {
        const data = await SolicitudAyuda.findAll({
            attributes: [
                'estado',
                [fn('COUNT', col('id')), 'count']
            ],
            group: ['estado']
        });
        res.json({ status: 1, msg: 'success', data });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al obtener solicitudes por estado' });
    }
};

// Tutorías por estado — gráfico torta
adminCtrl.getTutorialsByState = async (req, res) => {
    try {
        const data = await Tutoria.findAll({
            attributes: [
                'estado',
                [fn('COUNT', col('id')), 'count']
            ],
            group: ['estado'],
            order: [['estado', 'ASC']]
        });
        res.json({ status: 1, msg: 'success', data });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al obtener tutorías por estado' });
    }
};

// Tutorías por mes — gráfico línea
adminCtrl.getTutorialsByMonth = async (req, res) => {
    try {
        const data = await Tutoria.findAll({
            attributes: [
                [fn('TO_CHAR', col('createdAt'), 'MM'), 'month'],
                [fn('COUNT', col('id')), 'count']
            ],
            where: literal(`EXTRACT(YEAR FROM "createdAt") = EXTRACT(YEAR FROM NOW())`),
            group: [fn('TO_CHAR', col('createdAt'), 'MM')],
            order: [[fn('TO_CHAR', col('createdAt'), 'MM'), 'ASC']]
        });
        res.json({ status: 1, msg: 'success', data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 0, msg: 'Error al obtener tutorías por mes' });
    }
};

// Listado completo de tutorías para DataTable
adminCtrl.getFullTutorials = async (req, res) => {
    try {
        const data = await Tutoria.findAll({
            attributes: [
                'id', 'modalidad', 'precioAcordado', 'fechaHora',
                'estado', 'enlaceMeet', 'pagada', 'createdAt'
            ],
            include: [
                { model: Usuario, as: 'alumno', attributes: ['id', 'nombre', 'apellido', 'email'] },
                { model: Usuario, as: 'profesor', attributes: ['id', 'nombre', 'apellido', 'email'] },
                { model: Categoria, as: 'categoria', attributes: ['id', 'nombre'] },
                { model: Calificacion, as: 'calificacion', attributes: ['calificacion', 'comentario'], required: false }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json({ status: 1, msg: 'success', data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 0, msg: 'Error al obtener tutorías' });
    }
};

// Obtener listado de usuarios para el dashboard
adminCtrl.getUsers = async (req, res) => {
    try {
        const data = await Usuario.findAll({
            attributes: [
                'id', 'nombre', 'apellido', 'email', 'rol', 'estado', 
                'universidad', 'carrera', 'genero', 'ubicacion', 'createdAt'
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json({ status: 1, msg: 'success', data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 0, msg: 'Error al obtener usuarios' });
    }
};

// Actualizar atributos de un usuario desde admin
adminCtrl.updateUserAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ status: 0, msg: 'Usuario no encontrado.' });
        }

        await usuario.update({
            nombre: data.nombre,
            apellido: data.apellido,
            email: data.email,
            universidad: data.universidad,
            carrera: data.carrera,
            rol: data.rol,
            estado: data.estado
        });

        res.json({ status: 1, msg: 'Usuario actualizado correctamente.', data: usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 0, msg: 'Error al actualizar el usuario' });
    }
};

adminCtrl.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ status: 0, msg: 'Usuario no encontrado.' });
        }

        // Verificar dependencias manualmente
        const tutoriasCount = await Tutoria.count({
            where: { [Op.or]: [{ alumnoId: id }, { profesorId: id }] }
        });
        const solicitudesCount = await SolicitudAyuda.count({
            where: { usuarioId: id }
        });

        if (tutoriasCount > 0 || solicitudesCount > 0) {
            return res.status(400).json({ status: 0, msg: 'No se puede eliminar el usuario porque tiene tutorías o solicitudes asociadas. Por favor, cambia su estado a Inactivo.' });
        }

        await usuario.destroy();
        res.json({ status: 1, msg: 'Usuario eliminado correctamente.' });
    } catch (error) {
        console.error(error);
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({ status: 0, msg: 'No se puede eliminar el usuario porque tiene registros asociados.' });
        }
        res.status(500).json({ status: 0, msg: 'Error al eliminar el usuario' });
    }
};

// --- TUTORÍAS ---
adminCtrl.updateTutorial = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const tutoria = await Tutoria.findByPk(id);
        if (!tutoria) return res.status(404).json({ status: 0, msg: 'Tutoría no encontrada' });
        
        await tutoria.update({
            estado: data.estado,
            modalidad: data.modalidad,
            precioAcordado: data.precioAcordado,
            fechaHora: data.fechaHora,
            pagada: data.pagada
        });
        res.json({ status: 1, msg: 'Tutoría actualizada', data: tutoria });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al actualizar tutoría' });
    }
};

adminCtrl.deleteTutorial = async (req, res) => {
    try {
        const { id } = req.params;
        await Tutoria.destroy({ where: { id } });
        res.json({ status: 1, msg: 'Tutoría eliminada' });
    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({ status: 0, msg: 'No se puede eliminar la tutoría porque tiene registros asociados (ej. calificaciones).' });
        }
        res.status(500).json({ status: 0, msg: 'Error al eliminar tutoría' });
    }
};

// --- CATEGORÍAS ---
adminCtrl.getCategoriesList = async (req, res) => {
    try {
        const data = await Categoria.findAll({
            order: [['nombre', 'ASC']]
        });
        res.json({ status: 1, msg: 'success', data });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al obtener categorías' });
    }
};

adminCtrl.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const categoria = await Categoria.findByPk(id);
        if (!categoria) return res.status(404).json({ status: 0, msg: 'Categoría no encontrada' });
        
        await categoria.update({
            nombre: data.nombre,
            nivel: data.nivel,
            descripcion: data.descripcion
        });
        res.json({ status: 1, msg: 'Categoría actualizada', data: categoria });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al actualizar categoría' });
    }
};

adminCtrl.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const count = await Tutoria.count({ where: { categoriaId: id } });
        if (count > 0) {
            return res.status(400).json({ status: 0, msg: 'No se puede eliminar la categoría porque hay tutorías asociadas a ella.' });
        }
        await Categoria.destroy({ where: { id } });
        res.json({ status: 1, msg: 'Categoría eliminada' });
    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({ status: 0, msg: 'No se puede eliminar la categoría porque tiene registros asociados.' });
        }
        res.status(500).json({ status: 0, msg: 'Error al eliminar categoría' });
    }
};

module.exports = adminCtrl;