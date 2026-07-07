const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({

    windowMs: 15 * 60 * 1000,

    max: 5,

    message: {
        mensaje: "Demasiados intentos de inicio de sesión. Intente nuevamente en 15 minutos."
    },

    standardHeaders: true,

    legacyHeaders: false
});

module.exports = loginLimiter;