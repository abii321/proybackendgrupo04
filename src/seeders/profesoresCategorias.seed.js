const ProfesorCategoria = require("../models/profesorCategoria.model");
const Usuario = require("../models/usuario.model");
const Categoria = require("../models/categoria.model");

async function seedProfesorCategorias() {
    const juan  = await Usuario.findOne({ where: { email: "juan@tutorias.com" } });
    const maria = await Usuario.findOne({ where: { email: "maria@tutorias.com" } });
    const pedro = await Usuario.findOne({ where: { email: "pedro@tutorias.com" } });
    const ana   = await Usuario.findOne({ where: { email: "ana@tutorias.com" } });
    const sofia = await Usuario.findOne({ where: { email: "sofia@tutorias.com" } });

    const matematicaPrimaria = await Categoria.findOne({
        where: { nombre: "Matemática", nivel: "primario" }
    });

    const algebraSecundaria = await Categoria.findOne({
        where: { nombre: "Álgebra", nivel: "secundario" }
    });

    const analisisUniversitario = await Categoria.findOne({
        where: { nombre: "Análisis Matemático", nivel: "universitario" }
    });

    // María
    const programacionSecundario = await Categoria.findOne({
        where: { nombre: "Programación", nivel: "secundario" }
    });

    const algoritmosUniversitario = await Categoria.findOne({
        where: { nombre: "Algoritmos", nivel: "universitario" }
    });

    const estructurasUniversitario = await Categoria.findOne({
        where: { nombre: "Estructuras de Datos", nivel: "universitario" }
    });

    // Pedro
    const fisicaSecundario = await Categoria.findOne({
        where: { nombre: "Física", nivel: "secundario" }
    });

    const quimicaSecundario = await Categoria.findOne({
        where: { nombre: "Química", nivel: "secundario" }
    });

    const biologiaSecundario = await Categoria.findOne({
        where: { nombre: "Biología", nivel: "secundario" }
    });

    // Ana
    const inglesPrimario = await Categoria.findOne({
        where: { nombre: "Inglés", nivel: "primario" }
    });

    const inglesSecundario = await Categoria.findOne({
        where: { nombre: "Inglés", nivel: "secundario" }
    });

    // Sofía
    const basesUniversitario = await Categoria.findOne({
        where: { nombre: "Bases de Datos", nivel: "universitario" }
    });

    const desarrolloWebUniversitario = await Categoria.findOne({
        where: { nombre: "Desarrollo Web", nivel: "universitario" }
    });

    const ingenieriaSoftwareUniversitario = await Categoria.findOne({
        where: { nombre: "Ingeniería de Software", nivel: "universitario" }
    });

    await ProfesorCategoria.bulkCreate([

        // Juan
        {
            profesorId: juan.id,
            categoriaId: matematicaPrimaria.id,
            estado: "activo"
        },
        {
            profesorId: juan.id,
            categoriaId: algebraSecundaria.id,
            estado: "activo"
        },
        {
            profesorId: juan.id,
            categoriaId: analisisUniversitario.id,
            estado: "activo"
        },

        // María
        {
            profesorId: maria.id,
            categoriaId: programacionSecundario.id,
            estado: "activo"
        },
        {
            profesorId: maria.id,
            categoriaId: algoritmosUniversitario.id,
            estado: "activo"
        },
        {
            profesorId: maria.id,
            categoriaId: estructurasUniversitario.id,
            estado: "activo"
        },

        // Pedro
        {
            profesorId: pedro.id,
            categoriaId: fisicaSecundario.id,
            estado: "activo"
        },
        {
            profesorId: pedro.id,
            categoriaId: quimicaSecundario.id,
            estado: "activo"
        },
        {
            profesorId: pedro.id,
            categoriaId: biologiaSecundario.id,
            estado: "activo"
        },

        // Ana
        {
            profesorId: ana.id,
            categoriaId: inglesPrimario.id,
            estado: "activo"
        },
        {
            profesorId: ana.id,
            categoriaId: inglesSecundario.id,
            estado: "activo"
        },

        // Sofía
        {
            profesorId: sofia.id,
            categoriaId: basesUniversitario.id,
            estado: "activo"
        },
        {
            profesorId: sofia.id,
            categoriaId: desarrolloWebUniversitario.id,
            estado: "activo"
        },
        {
            profesorId: sofia.id,
            categoriaId: ingenieriaSoftwareUniversitario.id,
            estado: "activo"
        }

    ],{ 
    ignoreDuplicates: true // <--- ESTA LÍNEA EVITA QUE TU SERVIDOR SE CAIGA
});

    console.log("ProfesorCategoria cargado.");
}

module.exports = seedProfesorCategorias;