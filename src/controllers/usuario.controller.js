const Usuario = require('../models/usuario.model');
const usuarioCtrl = {};

usuarioCtrl.getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll(
            {
                attributes: {
                    exclude: [ 'createdAt', 'updatedAt']
                }
            }
        );
        res.json(usuarios);

    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener los usuarios.' });
    }
}

module.exports = usuarioCtrl;