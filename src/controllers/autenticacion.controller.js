const Usuario = require('../models/usuario.model');
const passwordService = require('../services/password.service')

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

/*autenticacionCtrl.signUpGoogle = async (req, res) => {
    try {
        const data = req.body;

        // Verificar que el token realmente proviene de Google
        const ticket = await client.verifyIdToken({
            idToken: data.token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        // Información del usuario
        const payload = ticket.getPayload();

        // Buscar si ya existe
        let usuario = await Usuario.findOne({
            where: {
                email: payload.email
            }
        });

        // Si no existe, lo registramos
        if (!usuario) {
            usuario = await Usuario.create({
                nombre: payload.name,
                email: payload.email,
                contraseniaHash: null,
                rol: data.rol,
                estado: "activo",
                proveedorAuth: "Google",
                foto: payload.picture,
                ubicacion: data.ubicacion
            });

            if ( data.rol == 'alumno') {
                await Alumno.create({
                    usuarioId: usuario.id,
                    estudios: data.estudios
                });
            }
            else {
                await Profesor.create({
                    usuarioId: usuario.id,
                    descripcion: data.descripcion,
                    estudios: data.estudios,
                    estadoEstudio: false,
                    precioHora: data.precioHora,
                    //precioAyuda: data.precioAyuda
                });
            }
            res.status(201).json({ status: "1", msg: "Usuario registrado correctamente." });
        }

        res.status(200).json({ status: "1", msg: "Inicio de sesión correcto." });

    } catch (error) {
        res.status(500).json({ status: "0", msg: "Error al iniciar sesión con Google." });
    }

}

autenticacionCtrl.loginGoogle = async (req, res) => {
    try{
        // Verificar que el token realmente proviene de Google
        const ticket = await client.verifyIdToken({
            idToken: data.token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        // Información del usuario
        const payload = ticket.getPayload();
    
        // Buscar si ya existe
        let usuario = await Usuario.findOne({
            where: {
                email: payload.email
            }
        });
        if(!usuario) res.json({ status: 0, msg: "not found" });
    
        res.json({
            status: 1, msg: "success",
            email: user.email,
            nombre: user.nombre,
            apellido: user.apellido,
            rol: user.rol,
        });

    } catch (error) {
        res.json({ status: 0, msg: 'error' });
    }
}*/

module.exports = autenticacionCtrl;