const { MercadoPagoConfig, Preference, Payment } = require("mercadopago");

const Tutoria = require("../models/tutoria.model");

const client = new MercadoPagoConfig({

    accessToken: process.env.MP_ACCESS_TOKEN

});

const preference = new Preference(client);

const payment = new Payment(client);

async function crearPreferencia(idTutoria) {

    const tutoria = await Tutoria.findByPk(idTutoria);

    if (!tutoria) {

        throw new Error("Tutoría inexistente");

    }

    const respuesta = await preference.create({

        body: {

            items: [

                {

                    title: "Tutoría",

                    quantity: 1,

                    currency_id: "ARS",

                    unit_price: Number(tutoria.precio)

                }

            ],

            external_reference: String(tutoria.id),

            notification_url: "https://TU-DOMINIO/api/mercadopago/webhook",

            back_urls: {

                success: "http://localhost:4200/pago-exitoso",

                failure: "http://localhost:4200/pago-error",

                pending: "http://localhost:4200/pago-pendiente"

            },

            auto_return: "approved"

        }

    });

    tutoria.preference_id = respuesta.id;

    await tutoria.save();

    return respuesta;

}
async function procesarWebhook(data) {

    if (data.type !== "payment") {

        return;

    }

    const paymentId = data.data.id;

    const pago = await payment.get({

        id: paymentId

    });

    if (pago.status !== "approved") {

        return;

    }

    const idTutoria = pago.external_reference;

    const tutoria = await Tutoria.findByPk(idTutoria);

    if (!tutoria) {

        return;

    }

    tutoria.pagada = true;

    tutoria.payment_id = paymentId;

    await tutoria.save();

    console.log("Tutoría pagada correctamente");

}

module.exports = {

    crearPreferencia,

    procesarWebhook

};