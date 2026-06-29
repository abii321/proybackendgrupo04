const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Usuario = require('./usuario.model');


const HorarioDisponible = sequelize.define('HorarioDisponible', {
    // id automatico
    diaSemana: { type: DataTypes.ENUM('lunes','martes','miercoles','jueves','viernes','sabado','domingo'), allowNull: false},
    horaInicio: { type: DataTypes.Integer, allowNull: false },
    horaFin: { type: DataTypes.Integer, allowNull:false }
}, {
    tableName: 'horariosDisponibles',
    timestamps: true,
});

HorarioDisponible.belongsTo(Usuario, {as: 'usuario'});
Usuario.hasMany(HorarioDisponible, { as: 'horarios', foreignKey: 'usuarioId' });

module.exports = HorarioDisponible;