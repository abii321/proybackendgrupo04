const Alumno = require('../models/alumno.model');
const Usuario = require('../models/usuario.model');
const alumnoCtrl = {};

// Recuperar todos los alumnos
alumnoCtrl.getAlumnos = async (req, res) => {
    try {
        const alumnos = await Alumno.findAll(
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
        res.json(alumnos);

    } catch (error) {
        res.status(500).json({ status: '0', msg: 'Error al obtener los alumnos.' });
    }
}

module.exports = alumnoCtrl;