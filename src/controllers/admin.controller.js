const { fn, col, literal } = require('sequelize');
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

module.exports = adminCtrl;