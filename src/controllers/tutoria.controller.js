const Tutoria = require('../models/tutoria.model');
const Usuario = require('../models/usuario.model');
const Categoria = require('../models/categoria.model'); 
const Calificacion = require('../models/calificacion.model');
const registrarAuditoria = require("../helpers/auditoria.helper");
const googleCalendarService = require('../services/google-calendar.service');

const tutoriaCtrl = {};

tutoriaCtrl.getTutorias = async (req, res) => {
    try {
        const tutorias = await Tutoria.findAll({
            include: [
                { model: Usuario, as: 'alumno', attributes: ['id', 'nombre', 'apellido', 'email'] },
                { model: Usuario, as: 'profesor', attributes: ['id', 'nombre', 'apellido', 'email'] },
                { model: Categoria, as: 'categoria', attributes: ['id', 'nombre'] },
                { model: Calificacion, as: 'calificacion' }
            ]
        });
        if (!tutorias) return res.json({ status: 0, msg: 'Tutoría no encontrada' });
        res.json({ status: 1, msg: 'success', data: tutorias });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al obtener tutorías' });
    }
};

tutoriaCtrl.getTutoria = async (req, res) => {
    try {
        const tutoria = await Tutoria.findOne({
            where: { id: req.params.id },
            include: [
                { model: Usuario, as: 'alumno', attributes: ['id', 'nombre', 'apellido', 'email'] },
                { model: Usuario, as: 'profesor', attributes: ['id', 'nombre', 'apellido', 'email'] },
                { model: Categoria, as: 'categoria', attributes: ['id', 'nombre'] },
                { model: Calificacion, as: 'calificacion' }
            ]
        });
        if (!tutoria) return res.json({ status: 0, msg: 'Tutoría no encontrada' });
        res.json({ status: 1, msg: 'success', data: tutoria });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al obtener tutoría' });
    }
};

tutoriaCtrl.createTutoria = async (req, res) => {
    try {
        const alumno = await Usuario.findOne({ where: { id: req.body.alumnoId, rol: 'alumno' } });
        const profesor = await Usuario.findOne({ where: { id: req.body.profesorId, rol: 'profesor' } });

        if (!alumno || !profesor) {
            return res.status(400).json({ status: 0, msg: 'El alumno o el profesor especificado no es válido para esta tutoría.' });
        }

        const nueva = await Tutoria.create({
            alumnoId: req.body.alumnoId,
            profesorId: req.body.profesorId,
            categoriaId: req.body.categoriaId,
            modalidad: req.body.modalidad,
            precioAcordado: req.body.precioAcordado,
            mensaje: req.body.mensaje,
            fechaHora: req.body.fechaHora,
            estado: req.body.estado || 'pendiente'
        });
        await registrarAuditoria(
                req,
                "CREATE",
                "Tutoria",
                nueva.id,
                `El alumno ${alumno.nombre} ${alumno.apellido} solicitó una tutoría con ${profesor.nombre} ${profesor.apellido}`,
                alumno.id
            );
        res.json({ status: 1, msg: 'Tutoría creada correctamente', data: nueva });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al crear tutoría' });
    }
};

tutoriaCtrl.editTutoria = async (req, res) => {
    try {
        const tutoriaExistente = await Tutoria.findByPk(req.params.id);
        if (!tutoriaExistente) {
            return res.status(404).json({ status: 0, msg: 'Tutoría no encontrada.' });
        }

        const alumno = await Usuario.findOne({ where: { id: req.body.alumnoId || tutoriaExistente.alumnoId, rol: 'alumno' } });
        const profesor = await Usuario.findOne({ where: { id: req.body.profesorId || tutoriaExistente.profesorId, rol: 'profesor' } });
        const categoria = await Categoria.findOne({ where: { id: req.body.categoriaId || tutoriaExistente.categoriaId } });

        if (!alumno || !profesor) {
            return res.status(400).json({ status: 0, msg: 'El alumno o el profesor especificado no es válido.' });
        }

        const modalidad = req.body.modalidad || tutoriaExistente.modalidad;
        const precioAcordado = req.body.precioAcordado || tutoriaExistente.precioAcordado;
        const mensaje = req.body.mensaje !== undefined ? req.body.mensaje : tutoriaExistente.mensaje;
        const fechaHora = req.body.fechaHora || tutoriaExistente.fechaHora;

        let enlaceMeet = req.body.enlaceMeet || tutoriaExistente.enlaceMeet || null;
        let eventId = req.body.googleEventId || tutoriaExistente.googleEventId || null;

        if (req.body.estado === 'aceptada') {
            try {
                const googleData = await googleCalendarService.agendarTutoria(
                    {
                        id: req.params.id,
                        fechaHora: fechaHora,
                        categoria: categoria.nombre,
                        modalidad: modalidad,
                        mensaje: mensaje
                    },
                    alumno,
                    profesor
                );
                enlaceMeet = googleData.linkMeet || null;
                eventId = googleData.idEvento;
                    await registrarAuditoria(
                    req,
                    "CREATE",
                    "GoogleCalendar",
                    req.params.id,
                    "Se creó el evento de Google Calendar y el enlace Meet.",
                    profesor.id
                  );
            } catch (googleError) {
                console.error("Error en Google Calendar (usando fallback de simulación):", googleError);
                enlaceMeet = modalidad === 'virtual' ? "https://meet.google.com/abc-defg-hij" : null;
                eventId = "simulated-event-id";
            }
        }

        await Tutoria.update({
            alumnoId: req.body.alumnoId || tutoriaExistente.alumnoId,
            profesorId: req.body.profesorId || tutoriaExistente.profesorId,
            categoriaId: req.body.categoriaId || tutoriaExistente.categoriaId,
            modalidad: modalidad,
            precioAcordado: precioAcordado,
            mensaje: mensaje,
            fechaHora: fechaHora,
            estado: req.body.estado,
            enlaceMeet: enlaceMeet,
            googleEventId: eventId
        }, { where: { id: req.params.id } });
            let descripcion = "Actualizó una tutoría";

            switch(req.body.estado){

                case "aceptada":
                    descripcion =
                    `El profesor ${profesor.nombre} ${profesor.apellido} aceptó la tutoría`;
                    break;

                case "rechazada":
                    descripcion =
                    `El profesor ${profesor.nombre} ${profesor.apellido} rechazó la tutoría`;
                    break;

                case "finalizada":
                    descripcion =
                    `La tutoría fue marcada como finalizada`;
                    break;

            }
            await registrarAuditoria(
                req,
                "UPDATE",
                "Tutoria",
                req.params.id,
                descripcion,
                profesor.id
            );


        res.json({ status: 1, msg: 'Tutoría actualizada correctamente', enlaceMeet: enlaceMeet });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al actualizar tutoría' });
    }
};

tutoriaCtrl.deleteTutoria = async (req, res) => {
    try {
        await Tutoria.destroy({ where: { id: req.params.id } });
        await registrarAuditoria(
            req,
            "DELETE",
            "Tutoria",
            req.params.id,
            "Se eliminó la tutoría",
            null
        );
        res.json({ status: 1, msg: 'Tutoría eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al eliminar tutoría' });
    }
};

module.exports = tutoriaCtrl;