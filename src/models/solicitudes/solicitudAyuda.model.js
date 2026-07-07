const { DataTypes } = require('sequelize');
const sequelize = require('./../../../config/database');
const RespuestaAyuda = require('./respuestaAyuda.model');
const Usuario = require('./../usuario.model')

const SolicitudAyuda = sequelize.define('SolicitudAyuda', {
    //categoriaId: { type: DataTypes.INTEGER },
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

Usuario.belongsTo(SolicitudAyuda, { foreignKey: 'usuarioId', as: 'solicitudes' });
SolicitudAyuda.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });
//Usuario.hasMany(SolicitudAyuda, { foreignKey: 'usuarioId', as: 'solicitudes' });

module.exports = SolicitudAyuda;