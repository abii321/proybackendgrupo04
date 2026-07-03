const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Usuario = require('./usuario.model');

const PerfilProfesor = sequelize.define('PerfilProfesor', {
    // id automatico
    primario:       { type: DataTypes.BOOLEAN, allowNull: false },
    secundario:     { type: DataTypes.BOOLEAN, allowNull: false },
    universitario:  { type: DataTypes.BOOLEAN, allowNull: false },
    doctorado:      { type: DataTypes.BOOLEAN, allowNull: false },
}, {
    tableName: 'perfiles_profesor',
    timestamps: true,
});

PerfilProfesor.belongsTo(Usuario, { as: 'profesor', foreignKey: 'usuarioId' });
Usuario.hasOne(PerfilProfesor, { as: 'perfilProfesor', foreignKey: 'usuarioId' });

module.exports = PerfilProfesor;