const mercadoPagoService = require('../services/mercadoPago.service');

const mercadoPagoCtrl = {};

mercadoPagoCtrl.crearPreferencia = async (req, res) => {

    try {

        const respuesta = await mercadoPagoService.crearPreferencia(
            req.body.respuesta_id
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