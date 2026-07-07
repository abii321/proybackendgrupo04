const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");
const Usuario = require("./usuario.model");

const Auditoria = sequelize.define("Auditoria", {

    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    accion: {
        type: DataTypes.STRING,
        allowNull: false
    },

    entidad: {
        type: DataTypes.STRING,
        allowNull: false
    },

    entidad_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    ip: {
        type: DataTypes.STRING,
        allowNull: true
    },

    user_agent: {
        type: DataTypes.TEXT,
        allowNull: true
    }

},{
    tableName:"auditorias",
    timestamps:true
});

Auditoria.belongsTo(Usuario,{
    foreignKey:"usuario_id",
    as:"usuario"
});

module.exports = Auditoria;