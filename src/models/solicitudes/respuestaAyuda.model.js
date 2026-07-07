const { DataTypes } = require('sequelize');
const sequelize = require('./../../../config/database');
const SolicitudAyuda = require('./solicitudAyuda.model');
const Usuario = require('./../usuario.model');

const RespuestaAyuda = sequelize.define('RespuestaAyuda', {
    respuesta:   { type: DataTypes.TEXT, allowNull: false },
    precio: {type: DataTypes.FLOAT,allowNull: false },
    estado: {type: DataTypes.ENUM('PENDIENTE', 'ACEPTADA', 'RECHAZADA'), allowNull: false, defaultValue: 'PENDIENTE'  },
    pagada: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    paymentId: { type: DataTypes.STRING, allowNull: true  },
    archivoAdjunto: { type: DataTypes.TEXT, allowNull: true, defaultValue: null }
}, {
    tableName: 'respuestas_ayuda',
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion'
});

RespuestaAyuda.belongsTo(SolicitudAyuda, { foreignKey: 'solicitudId', as: 'solicitud' });
RespuestaAyuda.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
//Usuario.hasMany(RespuestaAyuda, { foreignKey: 'usuarioId', as: 'respuestas' });


module.exports = RespuestaAyuda;