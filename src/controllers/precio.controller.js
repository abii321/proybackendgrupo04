const Precio = require('../models/precio.model');
const precioCtrl = {};

precioCtrl.getPrecios = async (req, res) => {
    try {
        const precios = await Precio.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });
        res.json({ status: 1, msg: 'success', data: precios });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al obtener precios' });
    }
};

module.exports = precioCtrl;