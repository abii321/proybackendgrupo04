const SolicitudAyuda = require('../../models/solicitudes/solicitudAyuda.model');
const RespuestaAyuda = require('../../models/solicitudes/respuestaAyuda.model');

const solicitudCtrl = {};

// Listar todas las solicitudes (GET)
solicitudCtrl.getSolicitudes = async (req, res) => {
    /* #swagger.tags = ['Solicitudes']
       #swagger.summary = 'Listar todas las solicitudes'
       #swagger.description = 'Retorna el listado completo de solicitudes de ayuda.'
       #swagger.responses[200] = {
         description: 'Listado de solicitudes obtenido correctamente.',
         schema: { $ref: '#/definitions/SolicitudAyudaResponse' }
       }
       #swagger.responses[500] = { description: 'Error interno del servidor.' }
    */
    try {
        const solicitudes = await SolicitudAyuda.findAll();
        res.json({ status: 1, msg: 'success', data: solicitudes });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al obtener solicitudes' });
    }
};

// Obtener una solicitud por su ID (GET)
solicitudCtrl.getSolicitud = async (req, res) => {
    /* #swagger.tags = ['Solicitudes']
       #swagger.summary = 'Obtener una solicitud por ID'
       #swagger.description = 'Retorna una solicitud de ayuda específica junto con sus respuestas.'
       #swagger.parameters['id'] = {
         in: 'path',
         description: 'ID de la solicitud.',
         required: true,
         type: 'integer'
       }
       #swagger.responses[200] = {
         description: 'Solicitud encontrada.',
         schema: { $ref: '#/definitions/SolicitudAyudaResponse' }
       }
       #swagger.responses[404] = { description: 'Solicitud no encontrada.' }
       #swagger.responses[500] = { description: 'Error interno del servidor.' }
    */
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
    /* #swagger.tags = ['Solicitudes']
       #swagger.summary = 'Crear una solicitud de ayuda'
       #swagger.description = 'Crea una nueva solicitud de ayuda. Requiere autenticación.'
       #swagger.security = [{ bearerAuth: [] }]
       #swagger.consumes = ['application/json']
       #swagger.parameters['body'] = {
         in: 'body',
         description: 'Datos de la solicitud a crear.',
         required: true,
         schema: { $ref: '#/definitions/SolicitudAyuda' }
       }
       #swagger.responses[200] = {
         description: 'Solicitud creada correctamente.',
         schema: { $ref: '#/definitions/SolicitudAyudaResponse' }
       }
       #swagger.responses[500] = { description: 'Error al crear solicitud.' }
    */
    try {
        const nueva = await SolicitudAyuda.create({
            usuarioId: req.body.usuarioId,
            categoriaId: req.body.categoriaId,
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            archivoAdjunto: req.body.archivoAdjunto
        });
        res.json({ status: 1, msg: 'Solicitud creada correctamente', data: nueva });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al crear solicitud' });
    }
};

// Actualizar una solicitud por su ID (PUT)
solicitudCtrl.editSolicitud = async (req, res) => {
    /* #swagger.tags = ['Solicitudes']
       #swagger.summary = 'Actualizar una solicitud'
       #swagger.description = 'Actualiza los datos de una solicitud de ayuda existente. Requiere autenticación.'
       #swagger.security = [{ bearerAuth: [] }]
       #swagger.consumes = ['application/json']
       #swagger.parameters['id'] = {
         in: 'path',
         description: 'ID de la solicitud a actualizar.',
         required: true,
         type: 'integer'
       }
       #swagger.parameters['body'] = {
         in: 'body',
         description: 'Datos actualizados de la solicitud.',
         required: true,
         schema: { $ref: '#/definitions/SolicitudAyuda' }
       }
       #swagger.responses[200] = {
         description: 'Solicitud actualizada correctamente.',
         schema: { $ref: '#/definitions/SuccessResponse' }
       }
       #swagger.responses[500] = { description: 'Error al actualizar solicitud.' }
    */
    try {
        await SolicitudAyuda.update({
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            categoriaId: req.body.categoriaId,
            archivoAdjunto: req.body.archivoAdjunto
        }, { where: { id: req.params.id } });
        res.json({ status: 1, msg: 'Solicitud actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al actualizar solicitud' });
    }
};

// Cerrar una solicitud por su ID (PUT)
solicitudCtrl.cerrarSolicitud = async (req, res) => {
    /* #swagger.tags = ['Solicitudes']
       #swagger.summary = 'Cerrar una solicitud'
       #swagger.description = 'Cambia el estado de una solicitud a CERRADA. Requiere autenticación.'
       #swagger.security = [{ bearerAuth: [] }]
       #swagger.parameters['id'] = {
         in: 'path',
         description: 'ID de la solicitud a cerrar.',
         required: true,
         type: 'integer'
       }
       #swagger.responses[200] = {
         description: 'Solicitud cerrada correctamente.',
         schema: { $ref: '#/definitions/SuccessResponse' }
       }
       #swagger.responses[500] = { description: 'Error al cerrar solicitud.' }
    */
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
    /* #swagger.tags = ['Solicitudes']
       #swagger.summary = 'Eliminar una solicitud'
       #swagger.description = 'Elimina una solicitud de ayuda por su ID. Requiere autenticación.'
       #swagger.security = [{ bearerAuth: [] }]
       #swagger.parameters['id'] = {
         in: 'path',
         description: 'ID de la solicitud a eliminar.',
         required: true,
         type: 'integer'
       }
       #swagger.responses[200] = {
         description: 'Solicitud eliminada correctamente.',
         schema: { $ref: '#/definitions/SuccessResponse' }
       }
       #swagger.responses[500] = { description: 'Error al eliminar solicitud.' }
    */
    try {
        await SolicitudAyuda.destroy({ where: { id: req.params.id } });
        res.json({ status: 1, msg: 'Solicitud eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al eliminar solicitud' });
    }
};

module.exports = solicitudCtrl;