const Usuario = require('../models/usuario.model');
const Categoria = require('../models/categoria.model');
const HorarioDisponible = require('../models/horarioDisponible.model');
const registrarAuditoria = require("../helpers/auditoria.helper");

const usuarioCtrl = {};

usuarioCtrl.getUsuarios = async (req, res) => {
    /* #swagger.tags = ['Usuarios']
       #swagger.summary = 'Listar usuarios o profesores'
       #swagger.description = 'Retorna todos los usuarios registrados. Permite filtrar por rol (ej. ?rol=profesor) para obtener sus tutorías dictadas, opiniones y rating.'
       #swagger.parameters['rol'] = {
         in: 'query',
         description: 'Filtrar por rol: alumno, profesor, admin.',
         required: false,
         type: 'string'
       }
       #swagger.responses[200] = {
         description: 'Usuarios obtenidos correctamente.',
         schema: { type: 'array', items: { $ref: '#/definitions/UsuarioUpdateRequest' } }
       }
       #swagger.responses[500] = { description: 'Error al obtener los usuarios.' }
    */
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
    /* #swagger.tags = ['Usuarios']
       #swagger.summary = 'Actualizar datos de perfil'
       #swagger.description = 'Actualiza la información del perfil del usuario (nombre, apellido, ubicación, carrera, tarifa base, etc.).'
       #swagger.consumes = ['application/json']
       #swagger.parameters['id'] = {
         in: 'path',
         description: 'ID del usuario a actualizar.',
         required: true,
         type: 'integer'
       }
       #swagger.parameters['body'] = {
         in: 'body',
         description: 'Datos actualizados del usuario.',
         required: true,
         schema: { $ref: '#/definitions/UsuarioUpdateRequest' }
       }
       #swagger.responses[200] = {
         description: 'Usuario actualizado correctamente.',
         schema: { status: '1', msg: 'Usuario actualizado correctamente.' }
       }
       #swagger.responses[404] = { description: 'Usuario no encontrado.' }
       #swagger.responses[500] = { description: 'Error al actualizar el usuario.' }
    */
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
                await registrarAuditoria(
                    req,
                    "UPDATE",
                    "Usuario",
                    usuario.id,
                    `Actualizó el perfil del usuario ${usuario.nombre} ${usuario.apellido}`,
                    usuario.id
                );

        res.json({ status: '1', msg: 'Usuario actualizado correctamente.', usuario: usuarioActualizado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: '0', msg: 'Error al actualizar el usuario.' });
    }
};

usuarioCtrl.addHorario = async (req, res) => {
    /* #swagger.tags = ['Usuarios']
       #swagger.summary = 'Agregar horario disponible a profesor'
       #swagger.description = 'Registra un nuevo intervalo de disponibilidad horaria para un profesor.'
       #swagger.consumes = ['application/json']
       #swagger.parameters['body'] = {
         in: 'body',
         description: 'Datos del nuevo horario.',
         required: true,
         schema: { $ref: '#/definitions/UsuarioAddHorarioRequest' }
       }
       #swagger.responses[200] = {
         description: 'Horario agregado correctamente.',
         schema: { status: 1, msg: 'Horario agregado correctamente' }
       }
       #swagger.responses[500] = { description: 'Error al agregar horario.' }
    */
    try {
        const { usuarioId, diaSemana, horaInicio, horaFin } = req.body;
        const nuevo = await HorarioDisponible.create({
            profesorId: usuarioId,
            diaSemana: diaSemana,
            horaInicio: horaInicio,
            horaFin: horaFin
        });
        await registrarAuditoria(
            req,
            "CREATE",
            "HorarioDisponible",
            nuevo.id,
            `Agregó un horario (${diaSemana} ${horaInicio}-${horaFin})`,
            usuarioId
        );
        res.json({ status: 1, msg: 'Horario agregado correctamente', data: nuevo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 0, msg: 'Error al agregar horario' });
    }
};

usuarioCtrl.deleteHorario = async (req, res) => {
    /* #swagger.tags = ['Usuarios']
       #swagger.summary = 'Eliminar horario disponible de profesor'
       #swagger.description = 'Elimina físicamente un intervalo de disponibilidad horaria.'
       #swagger.parameters['id'] = {
         in: 'path',
         description: 'ID del horario disponible a eliminar.',
         required: true,
         type: 'integer'
       }
       #swagger.responses[200] = {
         description: 'Horario eliminado correctamente.',
         schema: { status: 1, msg: 'Horario eliminado correctamente' }
       }
       #swagger.responses[500] = { description: 'Error al eliminar horario.' }
    */
    try {
        const { id } = req.params;
        await HorarioDisponible.destroy({ where: { id } });
        await registrarAuditoria(
            req,
            "DELETE",
            "HorarioDisponible",
            id,
            `Eliminó un horario`,
            null
        );
        res.json({ status: 1, msg: 'Horario eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 0, msg: 'Error al eliminar horario' });
    }
};

module.exports = usuarioCtrl;