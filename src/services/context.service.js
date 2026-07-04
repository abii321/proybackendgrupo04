const Usuario = require('../models/usuario.model');
const Categoria = require('../models/categoria.model');
const SolicitudAyuda = require('../models/solicitudes/solicitudAyuda.model');
const RespuestaAyuda = require('../models/solicitudes/respuestaAyuda.model');
const Tutoria = require('../models/tutoria.model');
const Calificacion = require('../models/calificacion.model');
const HorarioDisponible = require('../models/horarioDisponible.model');
const PerfilProfesor = require('../models/perfilProfesor');

const contextService = {};

contextService.buildContext = async () => {
    const profesores = await Usuario.findAll({
        where: { rol: 'profesor', estado: 'activo' },
        attributes: ['id', 'nombre', 'apellido', 'email', 'genero', 'ubicacion', 'universidad', 'carrera', 'nivelAcademico', 'biografia', 'tarifaBase']
    });

    const categorias = await Categoria.findAll({
        attributes: ['id', 'nombre', 'descripcion']
    });

    const solicitudesAbiertas = await SolicitudAyuda.findAll({
        where: { estado: 'ABIERTA' },
        attributes: ['id', 'id_usuario', 'id_categoria', 'titulo', 'descripcion', 'fecha_creacion']
    });

    const tutorias = await Tutoria.findAll({
        attributes: ['id', 'alumno_id', 'profesor_id', 'categoria_id', 'modalidad', 'precio_acordado', 'fecha_hora', 'estado', 'pagada']
    });

    const calificaciones = await Calificacion.findAll({
        attributes: ['id', 'tutoria_id', 'calificacion', 'comentario']
    });

    const horariosDisponibles = await HorarioDisponible.findAll({
        attributes: ['id', 'profesor_id', 'dia_semana', 'hora_inicio', 'hora_fin']
    });

    const perfilesProfesor = await PerfilProfesor.findAll({
        attributes: ['id', 'usuarioId', 'primario', 'secundario', 'universitario', 'doctorado']
    });

    return `
        Sos un asistente virtual de una plataforma de tutorías académicas.
        No uses markdown ni símbolos de formato.
        Respondé siempre en español, de forma cruel y concisa.
        Solo respondé preguntas relacionadas con la plataforma.
        Si te preguntan algo que no está en el contexto, decí que no tenés esa información y que no rompa los huevos.

        CONTEXTO ACTUAL DE LA PLATAFORMA:

        PROFESORES ACTIVOS (${profesores.length} en total):
        ${JSON.stringify(profesores)}

        CATEGORÍAS DE TUTORÍAS DISPONIBLES:
        ${JSON.stringify(categorias)}

        SOLICITUDES DE AYUDA ABIERTAS (${solicitudesAbiertas.length} en total):
        ${JSON.stringify(solicitudesAbiertas)}

        TUTORÍAS (${tutorias.length} en total):
        ${JSON.stringify(tutorias)}

        CALIFICACIONES (${calificaciones.length} en total):
        ${JSON.stringify(calificaciones)}

        HORARIOS DISPONIBLES DE PROFESORES (${horariosDisponibles.length} en total):
        ${JSON.stringify(horariosDisponibles)}

        PERFILES DE PROFESORES (${perfilesProfesor.length} en total):
        ${JSON.stringify(perfilesProfesor)}
    `;
};

module.exports = contextService;