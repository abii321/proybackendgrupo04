const RespuestaAyuda = require('./../../models/solicitudes/respuestaAyuda.model');

const respuestaCtrl = {};

// Listar todas las respuestas por ID de solicitud (GET)
respuestaCtrl.getRespuestasBySolicitud = async (req, res) => {
    try {
        const respuestas = await RespuestaAyuda.findAll({
            where: { id_solicitud: req.params.id_solicitud }
        });

        res.json({ status: 1, msg: 'success', data: respuestas });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al obtener respuestas' });
    }
};

// Crear una nueva respuesta (POST)
respuestaCtrl.createRespuesta = async (req, res) => {
    try {
        const yaExiste = await RespuestaAyuda.findOne({
            where: { id_solicitud: req.body.id_solicitud }
        });
        if (yaExiste) {
            return res.status(400).json({ status: 0, msg: 'Esta solicitud ya tiene una respuesta' });
        }

        const nueva = await RespuestaAyuda.create({
            id_solicitud: req.body.id_solicitud,
            id_usuario: req.body.id_usuario,
            respuesta: req.body.respuesta,
            archivoAdjunto: req.body.archivoAdjunto
        });
        res.json({ status: 1, msg: 'Respuesta creada correctamente', data: nueva });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al crear respuesta' });
    }
};

// Actualizar una respuesta por su ID (PUT)
respuestaCtrl.editRespuesta = async (req, res) => {
    try {
        await RespuestaAyuda.update(
            { respuesta: req.body.respuesta, archivoAdjunto: req.body.archivoAdjunto },
            { where: { id: req.params.id } }
        );
        res.json({ status: 1, msg: 'Respuesta actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al actualizar respuesta' });
    }
};

// Eliminar una respuesta por su ID (DELETE)
respuestaCtrl.deleteRespuesta = async (req, res) => {
    try {
        await RespuestaAyuda.destroy({ where: { id: req.params.id } });
        res.json({ status: 1, msg: 'Respuesta eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al eliminar respuesta' });
    }
};

module.exports = respuestaCtrl;