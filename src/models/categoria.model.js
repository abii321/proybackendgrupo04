const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Categoria = sequelize.define('Categoria', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'categorias',
    timestamps: true,
});

module.exports = Categoria;
