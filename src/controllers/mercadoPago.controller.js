const mercadoPagoService = require('../services/mercadoPago.service');

const mercadoPagoCtrl = {};

mercadoPagoCtrl.crearPreferencia = async (req, res) => {
    /* #swagger.tags = ['MercadoPago']
       #swagger.summary = 'Crear preferencia de pago'
       #swagger.description = 'Genera una preferencia en Mercado Pago asociada a una respuesta de ayuda para poder iniciar el checkout en el frontend.'
       #swagger.consumes = ['application/json']
       #swagger.parameters['body'] = {
         in: 'body',
         description: 'ID de la respuesta de ayuda a pagar.',
         required: true,
         schema: { $ref: '#/definitions/PreferenciaRequest' }
       }
       #swagger.responses[200] = {
         description: 'Preferencia de pago creada correctamente.',
         schema: { $ref: '#/definitions/PreferenciaResponse' }
       }
       #swagger.responses[500] = { description: 'Error al crear la preferencia.' }
    */
    try {
        const respuesta = await mercadoPagoService.crearPreferencia(
            req.body.respuestaId
        );

        res.json({
            status: 1,
            init_point: respuesta.init_point
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            status: 0,
            msg: "Error al crear la preferencia"
        });

    }

};

mercadoPagoCtrl.webhook = async (req, res) => {
    /* #swagger.tags = ['MercadoPago']
       #swagger.summary = 'Webhook de notificaciones de pago'
       #swagger.description = 'Recibe notificaciones instantáneas de pago (IPN) desde Mercado Pago para procesar y validar el estado de los pagos.'
       #swagger.parameters['body'] = {
         in: 'body',
         description: 'Payload enviado por Mercado Pago.',
         required: true,
         schema: { type: 'object' }
       }
       #swagger.responses[200] = { description: 'Notificación procesada.' }
       #swagger.responses[500] = { description: 'Error interno.' }
    */
    try {
        console.log("Webhook recibido");

        console.log(req.body);

        await mercadoPagoService.procesarWebhook(req.body);

        res.sendStatus(200);

    } catch (error) {

        console.error(error);

        res.sendStatus(500);

    }

};

module.exports = mercadoPagoCtrl;