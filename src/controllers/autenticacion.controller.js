const Usuario = require('../models/usuario.model');
const passwordService = require('../services/password.service')

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client( '514983060587-l7mo7rrdidk3p0l1skhemau7lmddajvi.apps.googleusercontent.com' );

const autenticacionCtrl = {};

autenticacionCtrl.signUpUsuario = async (req, res) => {
    try {
        const data = req.body;

        const existe = await Usuario.findOne({
            where: {
                email: data.email
            }
        });
        if (existe) res.status(400).json({ status: "0", msg: "El email ya está registrado." });

        const hash = await passwordService.hashPassword(data.password);
        const usuario = await Usuario.create({
            nombre: data.nombre,
            apellido: data.apellido,
            email: data.email,
            contraseniaHash: hash,
            rol: data.rol,
            estado: "activo",
            proveedorAuth: "local",
            //foto: data.foto,
            ubicacion: data.ubicacion,
            universidad: data.universidad,
            carrera: data.carrera,
        });

        res.status(201).json({ status: "1", msg: "Usuario registrado correctamente." });

    } catch (error) {
        res.status(500).json({ status: "0", msg: "Error al registrar usuario." });
    }
}

autenticacionCtrl.loginUsuario = async (req, res) => {
    if (!req.body.email || !req.body.password) res.status(400).json({ status: 0, msg: "Faltan credenciales" });

    try {
        const user = await Usuario.findOne({
            where: {
                email: req.body.email,
            }
        });
        if (!user || !passwordService.comparePassword(req.body.password, user.contraseniaHash)) res.json({ status: 0, msg: "not found" })
        else {
            res.json({
                status: 1, msg: "success",
                email: user.email,
                nombre: user.nombre,
                apellido: user.apellido,
                rol: user.rol,
                ubicacion: user.ubicacion,
                universidad: user.universidad,
                carrera: user.carrera,
            });
        }

    } catch (error) {
        res.json({ status: 0, msg: 'error' });
    }

}

autenticacionCtrl.signUpGoogle = async (req, res) => {
    try {
        const data = req.body;

        // Verificar que el token realmente proviene de Google
        const ticket = await client.verifyIdToken({
            idToken: data.token,
            audience: '514983060587-l7mo7rrdidk3p0l1skhemau7lmddajvi.apps.googleusercontent.com'
        });

        // Información del usuario
        const payload = ticket.getPayload();
        //console.log(payload);

        // Buscar si ya existe
        let usuario = await Usuario.findOne({
            where: {
                email: payload.email
            }
        });

        // Si no existe, lo registramos
        if (!usuario) {
            usuario = await Usuario.create({
                nombre: payload.given_name,
                apellido: payload.family_name || '',
                email: payload.email,
                contraseniaHash: null,
                rol: data.rol,
                estado: "activo",
                proveedorAuth: "Google",
                foto: payload.picture,
                ubicacion: data.ubicacion,
                universidad: data.universidad,
                carrera: data.carrera,
            });
        }
        res.status(201).json({ status: "1", msg: "Usuario registrado correctamente." });
        
    } catch (error) {
    console.error(error);

    res.status(500).json({ status: "0", msg: error.message });
}
}

autenticacionCtrl.loginGoogle = async (req, res) => {
    try {
        const { token } = req.body;

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: '514983060587-l7mo7rrdidk3p0l1skhemau7lmddajvi.apps.googleusercontent.com'
        });

        const payload = ticket.getPayload();

        console.log(payload);

        const usuario = await Usuario.findOne({
            where: {
                email: payload.email
            }
        });

        if (!usuario) {
            return res.json({
                status: 0,
                msg: "Usuario no registrado"
            });
        }

        return res.json({
            status: 1,
            msg: "success",
            email: usuario.email,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            rol: usuario.rol,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 0, msg: error.message });
    }
}
module.exports = autenticacionCtrl;