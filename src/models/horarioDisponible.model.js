const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Profesor = require('./profesor.model');


const HorarioDisponible = sequelize.define('HorarioDisponible', {
    // id automatico
    diaSemana: { type: DataTypes.ENUM('lunes','martes','miercoles','jueves','viernes','sabado','domingo'), allowNull: false},
    horaInicio: { type: DataTypes.Integer, allowNull: false },
    horaFin: { type: DataTypes.Integer, allowNull:false }
}, {
    tableName: 'horariosDisponibles',
    timestamps: true,
});

HorarioDisponible.belongsTo(Profesor, {as: 'profesor'});
Profesor.hasMany(HorarioDisponible, { as: 'horarios', foreignKey: 'profesorId' });

module.exports = HorarioDisponible;