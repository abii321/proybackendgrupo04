module.exports = (sequelize, DataTypes) => {
    const Alumno = sequelize.define('Alumno', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        descripcion: {
            type: DataTypes.STRING(255)
        },
        estudios: {
            type: DataTypes.STRING(255)
        },
        estadoEstudio: {
            type: DataTypes.BOOLEAN
        },
        precioHora: {
            type: DataTypes.DOUBLE
        },
        usuarioId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'alumnos',
        timestamps: true 
    });

    return Alumno;
};