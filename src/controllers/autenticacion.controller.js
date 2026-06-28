const Usuario = require('../models/usuario.model');
const Alumno = require('../models/alumno.model');
const Profesor = require('../models/profesor.model');

const autenticacionCtrl = {};

autenticacionCtrl.registrarAlumno = async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
        const data = req.body;

        // Verificar si ya existe el email
        const existe = await Usuario.findOne({
            where: {
                email: data.email
            }
        });
        if (existe) {
            await transaction.rollback();
            return res.status(400).json({ status: "0", msg: "El email ya está registrado." });
        }

        // Crear usuario
        const usuario = await Usuario.create({
            nombre: data.nombre,
            email: data.email,
            contraseniaHash: data.password,
            rol: "alumno",
            estado: "activo",
            proveedorAuth: "local",
            foto: data.foto,
            ubicacion: data.ubicacion
        }, { transaction });

        // Crear alumno
        await Alumno.create({
            usuarioId: usuario.id,
            estudios: data.estudios
        }, { transaction });

        await transaction.commit();
        res.status(201).json({ status: "1", msg: "Alumno registrado correctamente." });

    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ status: "0", msg: "Error al registrar alumno." });
    }
}

autenticacionCtrl.registrarProfesor = async (req, res) => {
    const transaction = await sequelize.transaction();
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

        const usuario = await Usuario.create({
            nombre: data.nombre,
            email: data.email,
            contraseniaHash: data.password,
            rol: "profesor",
            estado: "activo",
            proveedorAuth: "local",
            foto: data.foto,
            ubicacion: data.ubicacion

        }, { transaction });

        await Profesor.create({
            usuarioId: usuario.id,
            descripcionPersonal: data.descripcionPersonal,
            estudios: data.estudios,
            estadoEstudio: false,
            precioHora: data.precioHora,
            precioAyuda: data.precioAyuda
        }, { transaction });

        await transaction.commit();
        res.status(201).json({ status: "1", msg: "Profesor registrado correctamente."});
    }

    catch (error) {
        await transaction.rollback();
        res.status(500).json({ status: "0", msg: "Error al registrar profesor." });
    }
}


module.exports = autenticacionCtrl;