const Usuario = require('../models/usuario.model');
const Alumno = require('../models/alumno.model');
const Profesor = require('../models/profesor.model');
const passwordService = require('../services/password.service')

const autenticacionCtrl = {};

autenticacionCtrl.signUpUsuario = async (req, res) => {
    const transaction = await Usuario.sequelize.transaction();

    try {
        const data = req.body;

        const existe = await Usuario.findOne({
            where: {
                email: data.email
            }
        });
        if (existe) {
            await transaction.rollback();
            return res.status(400).json({ status: "0", msg: "El email ya está registrado." });
        }

        const hash = await passwordService.hashPassword(data.password);
        const usuario = await Usuario.create({
            nombre: data.nombre,
            email: data.email,
            contraseniaHash: hash,
            rol: rol,
            estado: "activo",
            proveedorAuth: "local",
            foto: data.foto,
            ubicacion: data.ubicacion
        }, { transaction });

        if (rol == 'alumno') {
            await Alumno.create({
                usuarioId: usuario.id,
                estudios: data.estudios
            }, { transaction });
        }
        else {
            await Profesor.create({
                usuarioId: usuario.id,
                descripcion: data.descripcion,
                estudios: data.estudios,
                estadoEstudio: false,
                precioHora: data.precioHora,
                //precioAyuda: data.precioAyuda
            }, { transaction });
        }

        await transaction.commit();
        res.status(201).json({ status: "1", msg: "Usuario registrado correctamente." });

    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ status: "0", msg: "Error al registrar usuario." });
    }
}

autenticacionCtrl.loginUsuario = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ status: 0, msg: "Faltan credenciales" });
    }

    try {
        const user = await Usuario.findOne({
            where: {
                email: req.body.email,
            }
        });
        if (!user || !passwordService.comparePassword(req.body.password, user.contraseniaHash) ) res.json({ status: 0, msg: "not found" })
        else {
            res.json({ 
                status: 1, msg: "success",
                email: user.email, 
                nombre: user.nombre,
                apellido: user.apellido,
                rol: user.rol,             
            });
        }

    } catch (error) { 
        res.json({ status: 0, msg: 'error' });
    }

}

autenticacionCtrl.loginGoogle = async (req, res) => {

}


module.exports = autenticacionCtrl;