const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Tutoria = require('./tutoria.model');

const Calificacion = sequelize.define('Calificacion', {
    tutoria_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: { model: 'tutorias', key: 'id' }
    },
    calificacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    comentario: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'calificaciones',
    timestamps: true,
});

Calificacion.belongsTo(Tutoria, { as: 'tutoria', foreignKey: 'tutoria_id' });
Tutoria.hasOne(Calificacion, { as: 'calificacion', foreignKey: 'tutoria_id' });

module.exports = Calificacion;
