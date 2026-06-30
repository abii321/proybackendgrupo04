const Tutoria = require('../models/tutoria.model');
const Usuario = require('../models/usuario.model');
const { crearEventoTutoría } = require('../services/calendar.service');
const Categoria = require('../models/categoria.model'); // Asegurate de importarlo
const Alumno = require('../models/alumno.model');

const tutoriaCtrl = {};

tutoriaCtrl.getTutorias = async (req, res) => {
    try {
        const tutorias = await Tutoria.findAll({
            include: [
                { model: Usuario, as: 'alumno', attributes: ['id', 'nombre', 'apellido', /*'email'*/] },
                { model: Usuario, as: 'profesor', attributes: ['id', 'nombre', 'apellido', /*'email'*/] },
                { model: Categoria, as: 'categoria', attributes: ['id', 'nombre'] }
            ]
        });
        if (!tutorias) return res.json({ status: 0, msg: 'Tutoría no encontrada' });

        res.json({ status: 1, msg: 'success', data: tutorias });
    } catch (error) {
        console.error("ERROR DETALLADO EN GET TUTORIA:", error);
        res.status(500).json({ status: 0, msg: 'Error al obtener tutorías' });
    }
};

tutoriaCtrl.getTutoria = async (req, res) => {
    try {
        const tutoria = await Tutoria.findOne({
            where: { id: req.params.id },
            include: [
                { model: Usuario, as: 'alumno', attributes: ['id', 'nombre', 'apellido', /*'email'*/] },
                { model: Usuario, as: 'profesor', attributes: ['id', 'nombre', 'apellido', /*'email'*/] },
                { model: Categoria, as: 'categoria', attributes: ['id', 'nombre'] }
            ]
        });
        if (!tutoria) return res.json({ status: 0, msg: 'Tutoría no encontrada' });

        res.json({ status: 1, msg: 'success', data: tutoria });
    } catch (error) {
        console.error("ERROR DETALLADO EN GET TUTORIA:", error);
        res.status(500).json({ status: 0, msg: 'Error al obtener tutoría' });
    }
};

tutoriaCtrl.createTutoria = async (req, res) => {
    try {
        const alumno = await Usuario.findOne({ where: { id: req.body.alumno_id, rol: 'alumno' } });
        const profesor = await Usuario.findOne({ where: { id: req.body.profesor_id, rol: 'profesor' } });

        if (!alumno || !profesor) {
            return res.status(400).json({ status: 0, msg: 'El alumno o el profesor especificado no es válido para esta tutoría.' });
        }

        const nueva = await Tutoria.create({
            alumno_id: req.body.alumno_id,
            profesor_id: req.body.profesor_id,
            categoria_id: req.body.categoria_id,
            fecha_hora: req.body.fecha_hora,
            estado: req.body.estado || 'pendiente'
        });
        res.json({ status: 1, msg: 'Tutoría creada correctamente', data: nueva });
    } catch (error) {
        console.error("ERROR DETALLADO EN CREATE TUTORIA:", error);
        res.status(500).json({ status: 0, msg: 'Error al crear tutoría' });
    }
};

tutoriaCtrl.editTutoria = async (req, res) => {
    try {
        const alumno = await Usuario.findOne({ where: { id: req.body.alumno_id, rol: 'alumno' } });
        const profesor = await Usuario.findOne({ where: { id: req.body.profesor_id, rol: 'profesor' } });
        const categoria = await Categoria.findOne({ where: { id: req.body.categoria_id } });

        if (!alumno || !profesor) {
            return res.status(400).json({ status: 0, msg: 'El alumno o el profesor especificado no es válido.' });
        }

        let enlaceMeet = null;
        let eventId = null;

        // Si el profesor acepta, creamos el evento en Google
        if (req.body.estado === 'aceptada') {
            try {
                const googleData = await crearEventoTutoría(
                    alumno.email,
                    profesor.email,
                    req.body.fecha_hora,
                    categoria.nombre
                );
                enlaceMeet = googleData.meetLink;
                eventId = googleData.eventId;
            } catch (googleError) {
                console.error("Error en Google Calendar:", googleError);
                return res.status(500).json({ status: 0, msg: 'Error al generar el link de Meet' });
            }
        }

        await Tutoria.update({
            alumno_id: req.body.alumno_id,
            profesor_id: req.body.profesor_id,
            categoria_id: req.body.categoria_id,
            fecha_hora: req.body.fecha_hora,
            estado: req.body.estado,
            enlace_meet: enlaceMeet,       // Guardamos el link
            google_event_id: eventId       // Guardamos el ID del evento
        }, { where: { id: req.params.id } });

        res.json({ status: 1, msg: 'Tutoría actualizada correctamente', enlace_meet: enlaceMeet });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 0, msg: 'Error al actualizar tutoría' });
    }
};

tutoriaCtrl.deleteTutoria = async (req, res) => {
    try {
        await Tutoria.destroy({ where: { id: req.params.id } });
        res.json({ status: 1, msg: 'Tutoría eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al eliminar tutoría' });
    }
};

module.exports = tutoriaCtrl;
