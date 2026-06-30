const Usuario = require('../models/usuario.model');
const usuarioCtrl = {};

usuarioCtrl.getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener los usuarios.' });
    }
};

usuarioCtrl.updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ status: '0', msg: 'Usuario no encontrado.' });
        }

        await usuario.update({
            nombre: data.nombre,
            apellido: data.apellido,
            ubicacion: data.ubicacion,
            universidad: data.universidad,
            carrera: data.carrera
        });

        res.json({ status: '1', msg: 'Usuario actualizado correctamente.', usuario });
    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al actualizar el usuario.' });
    }
};

module.exports = usuarioCtrl;