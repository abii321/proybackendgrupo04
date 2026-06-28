const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Usuario = require('./usuario.model');

const Alumno = sequelize.define('Alumno', {
    // id automatico
    estudios: { type: DataTypes.STRING, allowNull: false },
}, {
    tableName: 'alumnos',
    timestamps: true,
});

Alumno.belongsTo(Usuario, {as: 'usuario'});

module.exports = Alumno;