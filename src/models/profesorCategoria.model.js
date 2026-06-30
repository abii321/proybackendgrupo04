const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Usuario = require('./usuario.model');
const Categoria = require('./categoria.model');

const ProfesorCategoria = sequelize.define('ProfesorCategoria', {
    profesor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
    categoria_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categorias',
            key: 'id'
        }
    }
}, {
    tableName: 'profesores_categorias',
    timestamps: true,
});

Usuario.belongsToMany(Categoria, {
    through: ProfesorCategoria,
    as: 'categoriasEnseniadas',
    foreignKey: 'profesor_id',
    otherKey: 'categoria_id'
});

Categoria.belongsToMany(Usuario, {
    through: ProfesorCategoria,
    as: 'profesores',
    foreignKey: 'categoria_id',
    otherKey: 'profesor_id'
});

module.exports = ProfesorCategoria;
