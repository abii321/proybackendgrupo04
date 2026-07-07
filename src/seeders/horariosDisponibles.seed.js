const HorarioDisponible = require("../models/horarioDisponible.model");
const Usuario = require("../models/usuario.model");

async function seedHorarios(){

    // buscar profesores por email en lugar de asumir el ID
    const juan  = await Usuario.findOne({ where: { email: 'juan@tutorias.com' } });
    const maria = await Usuario.findOne({ where: { email: 'maria@tutorias.com' } });
    const pedro = await Usuario.findOne({ where: { email: 'pedro@tutorias.com' } });
    const ana   = await Usuario.findOne({ where: { email: 'ana@tutorias.com' } });
    const sofia = await Usuario.findOne({ where: { email: 'sofia@tutorias.com' } });

    const horarios = [];

    if (juan) {
        horarios.push({ profesorId: juan.id,  diaSemana: "lunes",    horaInicio: "08:00", horaFin: "11:00", modalidad: "ambas",      estado: "activo" });
        horarios.push({ profesorId: juan.id,  diaSemana: "miercoles", horaInicio: "18:00", horaFin: "21:00", modalidad: "virtual",    estado: "activo" });
    }
    if (maria) {
        horarios.push({ profesorId: maria.id, diaSemana: "martes",   horaInicio: "09:00", horaFin: "12:00", modalidad: "presencial", estado: "activo" });
        horarios.push({ profesorId: maria.id, diaSemana: "jueves",   horaInicio: "16:00", horaFin: "20:00", modalidad: "ambas",      estado: "activo" });
    }
    if (pedro) {
        horarios.push({ profesorId: pedro.id, diaSemana: "viernes",  horaInicio: "14:00", horaFin: "18:00", modalidad: "virtual",    estado: "activo" });
    }
    if (ana) {
        horarios.push({ profesorId: ana.id,   diaSemana: "lunes",    horaInicio: "15:00", horaFin: "19:00", modalidad: "ambas",      estado: "activo" });
        horarios.push({ profesorId: ana.id,   diaSemana: "jueves",   horaInicio: "08:00", horaFin: "11:00", modalidad: "presencial", estado: "activo" });
    }
    if (sofia) {
        horarios.push({ profesorId: sofia.id, diaSemana: "sabado",   horaInicio: "09:00", horaFin: "13:00", modalidad: "virtual",    estado: "activo" });
    }

    if (horarios.length > 0) {
        await HorarioDisponible.bulkCreate(horarios);
    }

    console.log("Horarios cargados.");
}

module.exports = seedHorarios;