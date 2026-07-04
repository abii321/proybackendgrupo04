const PerfilProfesor = require('../models/perfilProfesor');
const Usuario = require('../models/usuario.model');
const passwordService = require('../services/password.service')

const { OAuth2Client } = require('google-auth-library');
const GOOGLE_ID = process.env.GOOGLE_CLIENT_ID
const client = new OAuth2Client( GOOGLE_ID );

require('dotenv').config();
const jwt = require('jsonwebtoken'); 

const autenticacionCtrl = {};

autenticacionCtrl.signUpUsuario = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);

        const existe = await Usuario.findOne({
            where: {
                email: data.email
            }
        });
        if (existe) res.status(400).json({ status: "0", msg: "El email ya está registrado." });

        const hash = await passwordService.hashPassword(data.contrasenia);
        const usuario = await Usuario.create({
            nombre: data.nombre,
            apellido: data.apellido,
            email: data.email,
            contraseniaHash: hash,
            genero: data.genero,
            rol: data.rol,
            estado: "activo",
            proveedorAuth: "local",
            //foto: data.foto,
            ubicacion: data.ubicacion,
            universidad: data.universidad,
            carrera: data.carrera,
        });

        return res.status(201).json({ status: "1", msg: "Usuario registrado correctamente." });

    } catch (error) {
         console.error('ERROR:', error.message);
        res.status(500).json({ status: '0', msg: error.message });
        //return res.status(500).json({ status: "0", msg: "Error al registrar usuario." });
    }
}

autenticacionCtrl.loginUsuario = async (req, res) => {
    if (!req.body.email || !req.body.password) return res.status(400).json({ status: 0, msg: "Faltan credenciales" });

    try {
        const user = await Usuario.findOne({
            where: {
                email: req.body.email,
            }
        });
        
        const coincide = await passwordService.comparePassword( req.body.password, user.contraseniaHash );
        if (!user || !coincide) return res.json({ status: 0, msg: "not found" });

        else {
            console.log("JWT_SECRET:", process.env.JWT_SECRET);
            const unToken = jwt.sign({id: user.id}, process.env.JWT_SECRET); 
            res.json({
                status: 1, msg: "success",
                id: user.id, 
                email: user.email,
                nombre: user.nombre,
                apellido: user.apellido,
                rol: user.rol,
                ubicacion: user.ubicacion,
                universidad: user.universidad,
                carrera: user.carrera,
                token: unToken,
            });
        }

    } catch (error) {
        return res.json({ status: 0, msg: 'error' });
    }

}

autenticacionCtrl.signUpGoogle = async (req, res) => {
    try {
        const data = req.body;

        // Verificar que el token realmente proviene de Google
        const ticket = await client.verifyIdToken({
            idToken: data.token,
            audience: process.env.GOOGLE_CLIENT_ID })

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
                genero: data.genero,
            });
        }
        return res.status(201).json({ status: "1", msg: "Usuario registrado correctamente." });
        
    } catch (error) {
    console.error(error);

    return res.status(500).json({ status: "0", msg: error.message });
}
}

autenticacionCtrl.loginGoogle = async (req, res) => {
    try {
        const { token } = req.body;

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
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
        const unToken = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET);
        return res.json({
            status: 1,
            msg: "success",
            id: usuario.id,
            email: usuario.email,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            rol: usuario.rol,
            ubicacion: usuario.ubicacion,
            universidad: usuario.universidad,
            carrera: usuario.carrera,
            proveedorAuth: usuario.proveedorAuth,
            token: unToken,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 0, msg: error.message });
    }
}

module.exports = autenticacionCtrl;
//181