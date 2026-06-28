const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Usuario = sequelize.define('Usuario', {
    // id automatico
    nombre: { type: DataTypes.STRING, allowNull: false },
    apellido: { type: DataTypes.STRING, allowNull: false },
    contraseniaHash: { type: DataTypes.STRING, allowNull: false },
    rol: { type: DataTypes.ENUM('alumno','profesor','admin'), allowNull: false },
    estado: { type: DataTypes.ENUM('activo','inactivo'), allowNull: false },
    proveedorAuth: { type: DataTypes.ENUM('local','Google','Microsoft'), allowNull: false},
    foto: { type: DataTypes.STRING, allowNull: false },
    ubicacion: { type: DataTypes.STRING, allowNull: false },

}, {
    tableName: 'usuarios',
    timestamps: true,
});

module.exports = Usuario;