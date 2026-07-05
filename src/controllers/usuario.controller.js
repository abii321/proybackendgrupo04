const Usuario = require('../models/usuario.model');
const Categoria = require('../models/categoria.model');
const HorarioDisponible = require('../models/horarioDisponible.model');

const usuarioCtrl = {};

usuarioCtrl.getUsuarios = async (req, res) => {
    try {
        const { rol } = req.query;
        const whereClause = rol ? { rol } : {};
        const include = [];

        if (!rol || rol === 'profesor') {
            include.push({ 
                model: Categoria, 
                as: 'categoriasEnseniadas', 
                attributes: ['id', 'nombre'], 
                through: { attributes: [] } 
            });
            include.push({ model: HorarioDisponible, as: 'horarios' });
        }

        const usuarios = await Usuario.findAll({
            where: whereClause,
            include: include,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        });

        const Tutoria = require('../models/tutoria.model');
        const Calificacion = require('../models/calificacion.model');

        const usuariosData = [];
        for (const u of usuarios) {
            const userJson = u.toJSON();
            if (userJson.rol === 'profesor') {
                const tutorias = await Tutoria.findAll({
                    where: {
                        profesorId: userJson.id,
                        estado: 'finalizada'
                    },
                    include: [
                        { model: Calificacion, as: 'calificacion' },
                        { model: Usuario, as: 'alumno', attributes: ['nombre', 'apellido'] }
                    ]
                });

                userJson.tutoriasDictadas = tutorias.length;

                const opiniones = [];
                const calificaciones = [];
                for (const t of tutorias) {
                    if (t.calificacion) {
                        calificaciones.push(t.calificacion);
                        opiniones.push({
                            id: t.calificacion.id,
                            calificacion: t.calificacion.calificacion,
                            comentario: t.calificacion.comentario,
                            fecha: t.calificacion.createdAt,
                            alumno: t.alumno ? `${t.alumno.nombre} ${t.alumno.apellido}` : 'Alumno'
                        });
                    }
                }
                userJson.opiniones = opiniones;

                if (calificaciones.length > 0) {
                    const suma = calificaciones.reduce((sum, c) => sum + c.calificacion, 0);
                    userJson.rating = parseFloat((suma / calificaciones.length).toFixed(1));
                } else {
                    userJson.rating = 5.0;
                }
            }
            usuariosData.push(userJson);
        }

        res.json(usuariosData);
    } catch (error) {
        console.error(error);
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
            carrera: data.carrera,
            nivelAcademico: data.nivelAcademico,
            biografia: data.biografia,
            tarifaBase: data.tarifaBase
        });

        if (usuario.rol === 'profesor' && data.perfilProfesor) {
            const [perfil] = await PerfilProfesor.findOrCreate({
                where: { usuarioId: id },
                defaults: { primario: false, secundario: false, universitario: false, doctorado: false }
            });
            await perfil.update({
                primario: !!data.perfilProfesor.primario,
                secundario: !!data.perfilProfesor.secundario,
                universitario: !!data.perfilProfesor.universitario,
                doctorado: !!data.perfilProfesor.doctorado
            });
        }

        const usuarioActualizado = await Usuario.findByPk(id, {
            include: [
                { model: PerfilProfesor, as: 'perfilProfesor' },
                { model: Categoria, as: 'categoriasEnseniadas', attributes: ['id', 'nombre'], through: { attributes: [] } },
                { model: HorarioDisponible, as: 'horarios' }
            ]
        });

        res.json({ status: '1', msg: 'Usuario actualizado correctamente.', usuario: usuarioActualizado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: '0', msg: 'Error al actualizar el usuario.' });
    }
};

usuarioCtrl.addHorario = async (req, res) => {
    try {
        const { usuarioId, diaSemana, horaInicio, horaFin } = req.body;
        const nuevo = await HorarioDisponible.create({
            profesorId: usuarioId,
            diaSemana: diaSemana,
            horaInicio: horaInicio,
            horaFin: horaFin
        });
        res.json({ status: 1, msg: 'Horario agregado correctamente', data: nuevo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 0, msg: 'Error al agregar horario' });
    }
};

usuarioCtrl.deleteHorario = async (req, res) => {
    try {
        const { id } = req.params;
        await HorarioDisponible.destroy({ where: { id } });
        res.json({ status: 1, msg: 'Horario eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 0, msg: 'Error al eliminar horario' });
    }
};

module.exports = usuarioCtrl;