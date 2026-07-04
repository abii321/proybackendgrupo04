const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Usuario = require('./usuario.model');

const HorarioDisponible = sequelize.define('HorarioDisponible', {
    diaSemana: { type: DataTypes.ENUM('lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'), allowNull: false },
    horaInicio: { type: DataTypes.TIME, allowNull: false },
    horaFin: { type: DataTypes.TIME, allowNull: false },
    modalidad: { type: DataTypes.ENUM('presencial','virtual','ambas'), allowNull: false },
}, {
    tableName: 'horarios_disponibles',
    timestamps: false
});

HorarioDisponible.belongsTo(Usuario, { as: 'profesor', foreignKey: 'profesorId' });
Usuario.hasMany(HorarioDisponible, { as: 'horarios', foreignKey: 'profesorId' });

module.exports = HorarioDisponible;