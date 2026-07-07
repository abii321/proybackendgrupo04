const Precio = require('../models/precio.model');
const precioCtrl = {};

precioCtrl.getPrecios = async (req, res) => {
    /* #swagger.tags = ['Precios']
       #swagger.summary = 'Obtener precios base'
       #swagger.description = 'Retorna la lista de precios y tarifas base registradas en el sistema.'
       #swagger.responses[200] = {
         description: 'Precios obtenidos correctamente.',
         schema: { status: 1, msg: 'success', data: [] }
       }
       #swagger.responses[500] = { description: 'Error al obtener precios.' }
    */
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