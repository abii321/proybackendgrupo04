const HorarioDisponible = require('../models/horarioDisponible.model');

const horarioCtrl = {};

horarioCtrl.getHorariosProfesor = async (req, res) => {
    try {
        const horarios = await HorarioDisponible.findAll({
            where: { 
                profesorId: req.params.profesorId,
                estado: 'activo'
            }, 
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        res.json({ status: 1, data: horarios });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al obtener horarios' });
    }
};

horarioCtrl.createHorario = async (req, res) => {
    try {
        const busq = await HorarioDisponible.findOne({
            where: {
                profesorId: req.body.profesorId,
                diaSemana: req.body.diaSemana,
                horaInicio: req.body.horaInicio,
                horaFin: req.body.horaFin
            }
        })
        if(busq) { busq.estado = 'activo'; await busq.save(); }
        else {
            const nuevo = await HorarioDisponible.create(req.body);
        }
        res.json({ status: 1, msg: 'Horario creado', data: nuevo });
        
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al crear horario' });
    }
};

horarioCtrl.createHorario = async (req, res) => {
    try {
        const busq = await HorarioDisponible.findOne({
            where: {
                profesorId: req.body.profesorId,
                diaSemana: req.body.diaSemana,
                horaInicio: req.body.horaInicio,
                horaFin: req.body.horaFin
            }
        });
        if (busq) {
            busq.estado = 'activo';
            await busq.save();
            return res.json({ status: 1, msg: 'Horario reactivado', data: busq });
        }
        const nuevo = await HorarioDisponible.create(req.body);
        return res.json({ status: 1, msg: 'Horario creado', data: nuevo });

    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al crear horario' });
    }
};


horarioCtrl.deleteHorario = async (req, res) => {
    try {
        const horario = await HorarioDisponible.findByPk(req.params.id);
        if (!horario) return res.status(404).json({ status: 0, msg: 'Horario no encontrado' });

        horario.estado = 'inactivo';
        await horario.save();
        return res.json({ status: 1, msg: 'Horario eliminado lógicamente' });
    } catch (error) {
        return res.status(500).json({ status: 0, msg: 'Error al eliminar horario' });
    }
};

module.exports = horarioCtrl;