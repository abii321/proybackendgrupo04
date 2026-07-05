const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Categoria = sequelize.define('Categoria', {
    nombre: { type: DataTypes.STRING, allowNull: false, unique: true },
    nivel: { type: DataTypes.ENUM('primario', 'secundario', 'terciario', 'universitario', 'doctorado'), allowNull: false },
    descripcion: { type: DataTypes.TEXT, allowNull: false }
}, {
    tableName: 'categorias',
    timestamps: true,
});

module.exports = Categoria;
