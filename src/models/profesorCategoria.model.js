const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Usuario = require('./usuario.model');
const Categoria = require('./categoria.model');

const ProfesorCategoria = sequelize.define('ProfesorCategoria', { }, {
    tableName: 'profesores_categorias',
    timestamps: true,
});

Usuario.belongsToMany(Categoria, {
    through: ProfesorCategoria,
    as: 'categoriasEnseniadas',
    foreignKey: 'profesorId',
    otherKey: 'categoriaId'
});

Categoria.belongsToMany(Usuario, {
    through: ProfesorCategoria,
    as: 'profesores',
    foreignKey: 'categoriaId',
    otherKey: 'profesorId'
});

module.exports = ProfesorCategoria;
