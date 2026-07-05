const { fn, col, literal } = require('sequelize');
const Usuario = require('../models/usuario.model');
const Tutoria = require('../models/tutoria.model');
const SolicitudAyuda = require('../models/solicitudes/solicitudAyuda.model');
const Categoria = require('../models/categoria.model');

const adminCtrl = {};

// Números generales para las cards
adminCtrl.getSummary = async (req, res) => {
    try {
        const totalUsers = await Usuario.count();
        const totalTutorials = await Tutoria.count();
        const totalHelpRequests = await SolicitudAyuda.count();
        const totalCategories = await Categoria.count();

        res.json({
            status: 1,
            msg: 'success',
            data: { totalUsers, totalTutorials, totalHelpRequests, totalCategories }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 0, msg: 'Error al obtener resumen' });
    }
};

// Usuarios por rol — gráfico barra
adminCtrl.getUsersByRole = async (req, res) => {
    try {
        const data = await Usuario.findAll({
            attributes: [
                'rol',
                [fn('COUNT', col('id')), 'count']
            ],
            group: ['rol']
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
                'id', 'modalidad', 'precio_acordado', 'fecha_hora',
                'estado', 'pagada', 'createdAt'
            ],
            include: [
                { model: Usuario, as: 'alumno', attributes: ['id', 'nombre', 'apellido', 'email'] },
                { model: Usuario, as: 'profesor', attributes: ['id', 'nombre', 'apellido', 'email'] },
                { model: Categoria, as: 'categoria', attributes: ['id', 'nombre'] }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json({ status: 1, msg: 'success', data });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al obtener tutorías' });
    }
};

module.exports = adminCtrl;