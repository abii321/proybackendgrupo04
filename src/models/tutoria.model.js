const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Usuario = require('./usuario.model');
const Categoria = require('./categoria.model');

const Tutoria = sequelize.define('Tutoria', {
    modalidad: {
        type: DataTypes.ENUM('virtual', 'presencial'),
        allowNull: false,
        defaultValue: 'virtual'
    },
    precioAcordado: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    mensaje: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    fechaHora: {
        type: DataTypes.DATE,
        allowNull: false
    },
    estado: {
        type: DataTypes.ENUM('pendiente', 'aceptada', 'rechazada', 'finalizada', 'completada'),
        allowNull: false,
        defaultValue: 'pendiente'
    },
    enlaceMeet: {
        type: DataTypes.STRING,
        allowNull: true
    },
    googleEventId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    preferenceId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    paymentId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pagada: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'tutorias',
    timestamps: true,
});

Tutoria.belongsTo(Usuario, { as: 'alumno', foreignKey: 'alumnoId' });
Tutoria.belongsTo(Usuario, { as: 'profesor', foreignKey: 'profesorId' });
Tutoria.belongsTo(Categoria, { as: 'categoria', foreignKey: 'categoriaId' });

//Usuario.hasMany(Tutoria, { as: 'tutoriasComoAlumno', foreignKey: 'alumnoId' });
//Usuario.hasMany(Tutoria, { as: 'tutoriasComoProfesor', foreignKey: 'profesorId' });
//Categoria.hasMany(Tutoria, { as: 'tutorias', foreignKey: 'categoriaId' });

module.exports = Tutoria;