module.exports = (sequelize, DataTypes) => {
    const HorarioDisponible = sequelize.define('HorarioDisponible', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        profesorId: {
            type: DataTypes.INTEGER,
            allowNull: false
            // Acá en el futuro irá la relación (references) a la tabla Profesor/Usuario
        },
        diaSemana: {
            type: DataTypes.ENUM('lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'),
            allowNull: false
        },
        horaInicio: {
            type: DataTypes.TIME,
            allowNull: false
        },
        horaFin: {
            type: DataTypes.TIME,
            allowNull: false
        }
    }, {
        tableName: 'horarios_disponibles',
        timestamps: false // No necesitamos fecha de creación para esto
    });

    return HorarioDisponible;
};