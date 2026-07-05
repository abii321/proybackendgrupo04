const { DataTypes } = require('sequelize');
const sequelize = require('./../../../config/database');
const RespuestaAyuda = require('./respuestaAyuda.model');

const SolicitudAyuda = sequelize.define('SolicitudAyuda', {
    usuarioId:    { type: DataTypes.INTEGER, allowNull: false },
    categoriaId: { type: DataTypes.INTEGER },
    titulo:       { type: DataTypes.STRING(150), allowNull: false },
    descripcion:  { type: DataTypes.TEXT, allowNull: false },
    archivoAdjunto: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
    estado:       { type: DataTypes.ENUM('ABIERTA', 'RESUELTA', 'CERRADA'), allowNull: false, defaultValue: 'ABIERTA' }
}, {
    tableName: 'solicitudes_ayuda',
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion'
});

SolicitudAyuda.hasMany(RespuestaAyuda, { foreignKey: 'solicitudId', as: 'respuestas' });
RespuestaAyuda.belongsTo(SolicitudAyuda, { foreignKey: 'solicitudId', as: 'solicitud' });

module.exports = SolicitudAyuda;