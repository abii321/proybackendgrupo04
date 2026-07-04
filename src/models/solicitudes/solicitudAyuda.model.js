const { DataTypes } = require('sequelize');
const sequelize = require('./../../../config/database');
const RespuestaAyuda = require('./respuestaAyuda.model');

const SolicitudAyuda = sequelize.define('SolicitudAyuda', {
    id_usuario:    { type: DataTypes.INTEGER, allowNull: false },
    id_categoria: { type: DataTypes.INTEGER },
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

SolicitudAyuda.hasMany(RespuestaAyuda, { foreignKey: 'id_solicitud', as: 'respuestas' });
RespuestaAyuda.belongsTo(SolicitudAyuda, { foreignKey: 'id_solicitud', as: 'solicitud' });

module.exports = SolicitudAyuda;