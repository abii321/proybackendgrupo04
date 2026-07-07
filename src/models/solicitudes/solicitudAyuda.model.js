const { DataTypes } = require('sequelize');
const sequelize = require('./../../../config/database');

const SolicitudAyuda = sequelize.define('SolicitudAyuda', {

    titulo: {
        type: DataTypes.STRING(150),
        allowNull: false
    },

    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    archivoAdjunto: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },

    estado: {
        type: DataTypes.ENUM('ABIERTA', 'RESUELTA', 'CERRADA'),
        allowNull: false,
        defaultValue: 'ABIERTA'
    }

}, {
    tableName: 'solicitudes_ayuda',
    timestamps: true,
    createdAt: 'fecha_creacion',
    updatedAt: 'fecha_actualizacion'
});

module.exports = SolicitudAyuda;



