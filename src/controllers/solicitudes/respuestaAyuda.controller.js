const RespuestaAyuda = require('./../../models/solicitudes/respuestaAyuda.model');
const SolicitudAyuda = require('./../../models/solicitudes/solicitudAyuda.model');

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

        const solicitud = await SolicitudAyuda.findByPk(req.body.id_solicitud);

        if (!solicitud) {

            return res.status(404).json({

                status: 0,

                msg: 'La solicitud no existe.'

            });

        }

        if (solicitud.estado != 'ABIERTA') {

            return res.status(400).json({

                status: 0,

                msg: 'La solicitud ya no acepta respuestas.'

            });

        }

        const nueva = await RespuestaAyuda.create({

            id_solicitud: req.body.id_solicitud,

            id_usuario: req.body.id_usuario,

            respuesta: req.body.respuesta,

            precio: req.body.precio,

            archivoAdjunto: req.body.archivoAdjunto

        });

        res.json({

            status: 1,

            msg: 'Respuesta creada correctamente',

            data: nueva

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            status: 0,

            msg: 'Error al crear respuesta'

        });

    }

};

// Actualizar una respuesta por su ID (PUT)
respuestaCtrl.editRespuesta = async (req, res) => {

    try {

        await RespuestaAyuda.update({

            respuesta: req.body.respuesta,

            precio: req.body.precio,

            archivoAdjunto: req.body.archivoAdjunto

        }, {

            where: {

                id: req.params.id

            }

        });

        res.json({

            status: 1,

            msg: 'Respuesta actualizada correctamente'

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            status: 0,

            msg: 'Error al actualizar respuesta'

        });

    }

};




respuestaCtrl.aceptarRespuesta = async (req, res) => {

    try {

        const respuesta = await RespuestaAyuda.findByPk(req.params.id);

        if (!respuesta) {

            return res.status(404).json({

                status: 0,

                msg: 'Respuesta no encontrada.'

            });

        }

        await respuesta.update({

            estado: 'ACEPTADA'

        });

        await SolicitudAyuda.update({

            estado: 'RESUELTA'

        }, {

            where: {

                id: respuesta.id_solicitud

            }

        });

        res.json({

            status: 1,

            msg: 'Respuesta aceptada.'

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            status: 0,

            msg: 'Error al aceptar la respuesta.'

        });

    }

};

respuestaCtrl.deleteRespuesta = async (req, res) => {

    try {

        await RespuestaAyuda.destroy({

            where: {

                id: req.params.id

            }

        });

        res.json({

            status: 1,

            msg: 'Respuesta eliminada correctamente'

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            status: 0,

            msg: 'Error al eliminar respuesta'

        });

    }

};

module.exports = respuestaCtrl;
module.exports = respuestaCtrl;