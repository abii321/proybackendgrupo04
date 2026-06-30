const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Usuario = require('./usuario.model');
const Categoria = require('./categoria.model');

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
        allowNull: false,
        references: {
            model: 'categorias',
            key: 'id'
        }
    },
    fecha_hora: {
        type: DataTypes.DATE,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'aceptada', 'rechazada', 'finalizada'),
        allowNull: false,
        defaultValue: 'pendiente'
    },
    enlace_meet: {
        type: DataTypes.STRING,
        allowNull: true
    },
    google_event_id: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'tutorias',
    timestamps: true,
});

//Tutoria.belongsTo(Alumno, { as: 'alumno', foreignKey: 'alumno_id' });
Tutoria.belongsTo(Usuario, { as: 'alumno', foreignKey: 'alumno_id' });
Tutoria.belongsTo(Usuario, { as: 'profesor', foreignKey: 'profesor_id' });
Tutoria.belongsTo(Categoria, { as: 'categoria', foreignKey: 'categoria_id' });

Usuario.hasMany(Tutoria, { as: 'tutoriasComoAlumno', foreignKey: 'alumno_id' });
Usuario.hasMany(Tutoria, { as: 'tutoriasComoProfesor', foreignKey: 'profesor_id' });
Categoria.hasMany(Tutoria, { as: 'tutorias', foreignKey: 'categoria_id' });

module.exports = Tutoria;
