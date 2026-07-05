const { DataTypes } = require('sequelize');
const sequelize = require('./../../../config/database');

const RespuestaAyuda = sequelize.define('RespuestaAyuda', {
    solicitudId:{ type: DataTypes.INTEGER, allowNull: false },
    usuarioId:  { type: DataTypes.INTEGER, allowNull: false },
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

module.exports = RespuestaAyuda;