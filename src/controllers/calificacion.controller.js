const Calificacion = require('../models/calificacion.model');
const Tutoria = require('../models/tutoria.model');

const calificacionCtrl = {};

calificacionCtrl.crearCalificacion = async (req, res) => {
    try {
        const { tutoria_id, calificacion, comentario } = req.body;

        if (!tutoria_id || !calificacion) {
            return res.status(400).json({ status: 0, msg: 'La tutoría y la calificación son obligatorias.' });
        }

        const tutoria = await Tutoria.findByPk(tutoria_id);
        if (!tutoria) {
            return res.status(404).json({ status: 0, msg: 'Tutoría no encontrada.' });
        }

        if (tutoria.estado !== 'finalizada' && tutoria.estado !== 'completada') {
            return res.status(400).json({ status: 0, msg: 'Solo se pueden calificar tutorías finalizadas.' });
        }

        const calificacionExistente = await Calificacion.findOne({ where: { tutoria_id } });
        if (calificacionExistente) {
            return res.status(400).json({ status: 0, msg: 'Esta tutoría ya ha sido calificada.' });
        }

        const nuevaCalificacion = await Calificacion.create({
            tutoria_id,
            calificacion,
            comentario
        });

        res.json({ status: 1, msg: 'Calificación creada correctamente', data: nuevaCalificacion });
    } catch (error) {
        console.error("Error al crear calificación:", error);
        res.status(500).json({ status: 0, msg: 'Error al calificar la tutoría.' });
    }
};

calificacionCtrl.obtenerCalificacionPorTutoria = async (req, res) => {
    try {
        const rating = await Calificacion.findOne({ where: { tutoria_id: req.params.tutoriaId } });
        res.json({ status: 1, data: rating });
    } catch (error) {
        console.error("Error al obtener calificación:", error);
        res.status(500).json({ status: 0, msg: 'Error al obtener calificación.' });
    }
};

module.exports = calificacionCtrl;
