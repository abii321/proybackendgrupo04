const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Usuario = require('./usuario.model');
const Categoria = require('./categoria.model');

const ProfesorCategoria = sequelize.define('ProfesorCategoria', { 
    estado: { type: DataTypes.ENUM('activo','inactivo'), allowNull: false}
}, {
    tableName: 'profesores_categorias',
    timestamps: true,
});

// Definición de la relación muchos a muchos entre Usuario y Categoria
Usuario.belongsToMany(Categoria, { through: ProfesorCategoria, as: 'categoriasEnseniadas', foreignKey: 'profesorId' });
Categoria.belongsToMany(Usuario, { through: ProfesorCategoria, as: 'profesores', foreignKey: 'categoriaId' });

ProfesorCategoria.belongsTo(Usuario, { as: 'profesor', foreignKey: 'profesorId' });
ProfesorCategoria.belongsTo(Categoria, { as: 'categoria', foreignKey: 'categoriaId' });

module.exports = ProfesorCategoria;
