const SolicitudAyuda = require('../../models/solicitudes/solicitudAyuda.model');
const RespuestaAyuda = require('../../models/solicitudes/respuestaAyuda.model');

const solicitudCtrl = {};

// Listar todas las solicitudes (GET)
solicitudCtrl.getSolicitudes = async (req, res) => {
    try {
        const solicitudes = await SolicitudAyuda.findAll();
        res.json({ status: 1, msg: 'success', data: solicitudes });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al obtener solicitudes' });
    }
};

// Obtener una solicitud por su ID (GET)
solicitudCtrl.getSolicitud = async (req, res) => {
    try {
        const solicitud = await SolicitudAyuda.findOne({
            where: { id: req.params.id },
            include: [{ model: RespuestaAyuda, as: 'respuestas' }]
        });
        if (!solicitud) return res.json({ status: 0, msg: 'Solicitud no encontrada' });

        res.json({ status: 1, msg: 'success', data: solicitud });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al obtener solicitud' });
    }
};

// Crear una nueva solicitud (POST)
solicitudCtrl.createSolicitud = async (req, res) => {
    try {
        const nueva = await SolicitudAyuda.create({
            id_usuario: req.body.id_usuario,
            id_categoria: req.body.id_categoria,
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            archivoAdjunto: req.body.archivoAdjunto
        });
        res.json({ status: 1, msg: 'Solicitud creada correctamente', data: nueva });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al crear solicitud' });
    }
};

// Actualizar una solicitud por su ID (PUT)
solicitudCtrl.editSolicitud = async (req, res) => {
    try {
        await SolicitudAyuda.update({
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            id_categoria: req.body.id_categoria,
            archivoAdjunto: req.body.archivoAdjunto
        }, { where: { id: req.params.id } });
        res.json({ status: 1, msg: 'Solicitud actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al actualizar solicitud' });
    }
};

// Cerrar una solicitud por su ID (PUT)
solicitudCtrl.cerrarSolicitud = async (req, res) => {
    try {
        await SolicitudAyuda.update(
            { estado: 'CERRADA' },
            { where: { id: req.params.id } }
        );
        res.json({ status: 1, msg: 'Solicitud cerrada correctamente' });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al cerrar solicitud' });
    }
};

// Eliminar una solicitud por su ID (DELETE)
solicitudCtrl.deleteSolicitud = async (req, res) => {
    try {
        await SolicitudAyuda.destroy({ where: { id: req.params.id } });
        res.json({ status: 1, msg: 'Solicitud eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al eliminar solicitud' });
    }
};

module.exports = solicitudCtrl;