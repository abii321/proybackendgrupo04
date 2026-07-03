const { MercadoPagoConfig } = require("mercadoPago");

const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN
});

module.exports = client;
