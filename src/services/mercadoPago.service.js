const { MercadoPagoConfig, Preference, Payment } = require("mercadopago");

const RespuestaAyuda = require("../models/solicitudes/respuestaAyuda.model");
const Tutoria = require("../models/tutoria.model");

const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN
    
});
console.log(process.env.MP_ACCESS_TOKEN);

const preference = new Preference(client);
const payment = new Payment(client);

async function crearPreferencia(idRespuesta) {
    let tipo = 'ayuda';
    let entidad = await RespuestaAyuda.findByPk(idRespuesta);

    if (!entidad) {
        entidad = await Tutoria.findByPk(idRespuesta);
        tipo = 'tutoria';
    }

    if (!entidad) {
        throw new Error("Entidad inexistente");
    }

    const precioCobrar = tipo === 'ayuda' ? Number(entidad.precio) : Number(entidad.precioAcordado);
    const tituloItem = tipo === 'ayuda' ? "Pago de respuesta a solicitud de ayuda" : "Pago de sesión de tutoría";

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:4200";
    const prodFrontendUrl = process.env.PRODUCTION_FRONTEND_URL;

    const isBridge = !!prodFrontendUrl;
    const targetFrontendUrl = isBridge ? prodFrontendUrl : frontendUrl;

    const body = {

        items: [
            {
                title: tituloItem,
                quantity: 1,
                currency_id: "ARS",
                unit_price: precioCobrar
            }
        ],

        external_reference: `${tipo}:${entidad.id}${isBridge ? ':dev' : ''}`,

        notification_url: "https://thesaurus-thong-doing.ngrok-free.dev/api/mercadopago/webhook",

        back_urls: {
            success: `${targetFrontendUrl}/pago-exitoso`,
            failure: `${targetFrontendUrl}/pago-error`,
            pending: `${targetFrontendUrl}/pago-pendiente`
        }

    };

    if (targetFrontendUrl.startsWith("https://")) {
        body.auto_return = "approved";
    }

    const preferencia = await preference.create({ body });

     console.log("ENTIDAD COMPLETA:", entidad);

    entidad.preferenceId = preferencia.id;

    await entidad.save();

    return preferencia;

}

async function procesarWebhook(data) {

    if (data.type !== "payment") return;

    const paymentId = data.data.id;

    const pago = await payment.get({
        id: paymentId
    });

    if (pago.status !== "approved") return;

    const ref = pago.external_reference;
    let tipo = 'ayuda';
    let id = ref;

    if (ref && ref.includes(':')) {
        const parts = ref.split(':');
        tipo = parts[0];
        id = parts[1];
    }

    if (tipo === 'ayuda') {
        const respuesta = await RespuestaAyuda.findByPk(id);
        if (respuesta) {
            respuesta.pagada = true;
            respuesta.paymentId = paymentId;
            await respuesta.save();
            console.log("Respuesta pagada correctamente");
        }
    } else if (tipo === 'tutoria') {
        const tutoria = await Tutoria.findByPk(id);
        if (tutoria) {
            tutoria.pagada = true;
            tutoria.paymentId = paymentId;
            await tutoria.save();
            console.log("Tutoría pagada correctamente");
        }
    }

}

module.exports = {

    crearPreferencia,

    procesarWebhook

};