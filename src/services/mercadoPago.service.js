const { MercadoPagoConfig, Preference, Payment } = require("mercadopago");

const RespuestaAyuda = require("../models/solicitudes/respuestaAyuda.model");

const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN
    
});
console.log(process.env.MP_ACCESS_TOKEN);

const preference = new Preference(client);
const payment = new Payment(client);

async function crearPreferencia(idRespuesta) {

    const respuesta = await RespuestaAyuda.findByPk(idRespuesta);

    if (!respuesta) {
        throw new Error("Respuesta inexistente");
    }

    const preferencia = await preference.create({

        body: {

            items: [
                {
                    title: "Pago de respuesta a solicitud de ayuda",
                    quantity: 1,
                    currency_id: "ARS",
                    unit_price: Number(respuesta.precio)
                }
            ],

            external_reference: String(respuesta.id),

            //notification_url: "https://localhost:3000/api/mercadopago/webhook",

            back_urls: {
                success: "http://localhost:4200/pago-exitoso",
                failure: "http://localhost:4200/pago-error",
                pending: "http://localhost:4200/pago-pendiente"
            },

        

        }

    });

     console.log("RESPUESTA COMPLETA:", respuesta);

    respuesta.preference_id = preferencia.id;

    await respuesta.save();

    return preferencia;

}

async function procesarWebhook(data) {

    if (data.type !== "payment") return;

    const paymentId = data.data.id;

    const pago = await payment.get({
        id: paymentId
    });

    if (pago.status !== "approved") return;

    const idRespuesta = pago.external_reference;

    const respuesta = await RespuestaAyuda.findByPk(idRespuesta);

    if (!respuesta) return;

    respuesta.pagada = true;
    respuesta.payment_id = paymentId;

    await respuesta.save();

    console.log("Respuesta pagada correctamente");

}

module.exports = {

    crearPreferencia,

    procesarWebhook

};