const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Usuario = require('./usuario.model');

const Tutoria = sequelize.define('Tutoria', {
    alumno_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
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
        allowNull: true
    },
    fecha_hora: {
        type: DataTypes.DATE,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'aceptada', 'rechazada', 'finalizada'),
        allowNull: false,
        defaultValue: 'pendiente'
    }
}, {
    tableName: 'tutorias',
    timestamps: true,
});

Tutoria.belongsTo(Usuario, { as: 'alumno', foreignKey: 'alumno_id' });
Tutoria.belongsTo(Usuario, { as: 'profesor', foreignKey: 'profesor_id' });

Usuario.hasMany(Tutoria, { as: 'tutoriasComoAlumno', foreignKey: 'alumno_id' });
Usuario.hasMany(Tutoria, { as: 'tutoriasComoProfesor', foreignKey: 'profesor_id' });

module.exports = Tutoria;
