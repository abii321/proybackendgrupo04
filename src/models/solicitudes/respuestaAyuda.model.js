const { DataTypes } = require('sequelize');
const sequelize = require('./../../../config/database');

const RespuestaAyuda = sequelize.define('RespuestaAyuda', {
    id_solicitud:{ type: DataTypes.INTEGER, allowNull: false },
    id_usuario:  { type: DataTypes.INTEGER, allowNull: false },
    respuesta:   { type: DataTypes.TEXT, allowNull: false },
    archivoAdjunto: { type: DataTypes.TEXT, allowNull: true, defaultValue: null }
}, {
    tableName: 'respuestas_ayuda',
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion'
});

module.exports = RespuestaAyuda;