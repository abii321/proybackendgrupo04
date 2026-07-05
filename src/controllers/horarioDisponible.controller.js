const HorarioDisponible = require('../models/horarioDisponible.model');

const horarioCtrl = {};

horarioCtrl.getHorariosProfesor = async (req, res) => {
    try {
        const horarios = await HorarioDisponible.findAll({
            where: { profesorId: req.params.profesorId }
        });
        res.json({ status: 1, data: horarios });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al obtener horarios' });
    }
};

horarioCtrl.createHorario = async (req, res) => {
    try {
        const nuevo = await HorarioDisponible.create(req.body);
        res.json({ status: 1, msg: 'Horario creado', data: nuevo });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al crear horario' });
    }
};

horarioCtrl.deleteHorario = async (req, res) => {
    try {
        await HorarioDisponible.destroy({ where: { id: req.params.id } });
        res.json({ status: 1, msg: 'Horario eliminado' });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al eliminar horario' });
    }
};

module.exports = horarioCtrl;