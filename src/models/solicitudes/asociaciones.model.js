const Usuario = require('../usuario.model');
const Categoria = require('../categoria.model');

const SolicitudAyuda = require('./solicitudAyuda.model');
const RespuestaAyuda = require('./respuestaAyuda.model');

// Usuario -> Solicitudes
Usuario.hasMany(SolicitudAyuda, {
    foreignKey: 'usuarioId',
    as: 'solicitudes'
});

SolicitudAyuda.belongsTo(Usuario, {
    foreignKey: 'usuarioId',
    as: 'usuario'
});

// Categoría -> Solicitud
SolicitudAyuda.belongsTo(Categoria, {
    foreignKey: 'categoriaId',
    as: 'categoria'
});

// Solicitud -> Respuestas
SolicitudAyuda.hasMany(RespuestaAyuda, {
    foreignKey: 'solicitudId',
    as: 'respuestas'
});

RespuestaAyuda.belongsTo(SolicitudAyuda, {
    foreignKey: 'solicitudId',
    as: 'solicitud'
});

// Usuario -> Respuestas
Usuario.hasMany(RespuestaAyuda, {
    foreignKey: 'usuarioId',
    as: 'respuestas'
});

RespuestaAyuda.belongsTo(Usuario, {
    foreignKey: 'usuarioId',
    as: 'usuario'
});

module.exports = {
    SolicitudAyuda,
    RespuestaAyuda
};