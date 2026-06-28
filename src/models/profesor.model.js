const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Usuario = require('./usuario.model');

const Profesor = sequelize.define('Profesor', {
    // id automatico
    descripcion: { type: DataTypes.STRING, allowNull: true},
    estudios: { type: DataTypes.STRING, allowNull: false },
    estadoEstudio: { type: DataTypes.BOOLEAN, allowNull: false },
    precioHora: { type: DataTypes.FLOAT, allowNull: false},
    //precioAyuda:    
}, {
    tableName: 'alumnos',
    timestamps: true,
});

Profesor.belongsTo(Usuario, {as: 'usuario'});

module.exports = Profesor;