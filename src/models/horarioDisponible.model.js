const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Usuario = require('./usuario.model');

const HorarioDisponible = sequelize.define('HorarioDisponible', {
    profesor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' }
    },
    dia_semana: {
        type: DataTypes.ENUM('lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'),
        allowNull: false
    },
    hora_inicio: {
        type: DataTypes.TIME,
        allowNull: false
    },
    hora_fin: {
        type: DataTypes.TIME,
        allowNull: false
    }
}, {
    tableName: 'horarios_disponibles',
    timestamps: false
});

HorarioDisponible.belongsTo(Usuario, { as: 'profesor', foreignKey: 'profesor_id' });
Usuario.hasMany(HorarioDisponible, { as: 'horarios', foreignKey: 'profesor_id' });

module.exports = HorarioDisponible;