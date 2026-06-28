const Profesor = require('../models/profesor.model');
const Usuario = require('../models/usuario.model');
const profesorCtrl = {};

// Recuperar todos los profesores
profesorCtrl.getProfesores = async (req, res) => {
    try {
        const profesores = await Profesor.findAll(
            {
                attributes: {
                    exclude: [ 'usuarioId','createdAt', 'updatedAt']
                },
                include: [{
                    model: Usuario,
                    as: 'usuario',
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                }]
            }
        );
        res.json(profesores);

    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener los profesores.' });
    }
}


module.exports = profesorCtrl;