const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario.model");

async function seedUsuarios() {

    const usuarios = [

        // ======================
        // ADMINS
        // ======================

        {
            rol: "admin",
            nombre: "Carlos",
            apellido: "Gómez",
            email: "carlos.admin@tutorias.com",
            contrasenia: "Carlos321#",
            genero: "masculino",
            universidad: "UNJu",
            carrera: "Ingeniería Informática"
        },
        {
            rol: "admin",
            nombre: "Lucía",
            apellido: "Martinez",
            email: "lucia.admin@tutorias.com",
            contrasenia: "Lucía321#",
            genero: "femenino",
            universidad: "UNJu",
            carrera: "Lic. Sistemas"
        },
        {
            rol: "admin",
            nombre: "Miguel",
            apellido: "Sosa",
            email: "miguel.admin@tutorias.com",
            contrasenia: "Miguel321#",
            genero: "masculino",
            universidad: "UNJu",
            carrera: "Ingeniería"
        },

        // ======================
        // PROFESORES
        // ======================

        {
            rol: "profesor",
            nombre: "Juan",
            apellido: "Perez",
            email: "juan@tutorias.com",
            contrasenia: "Juan321#",
            genero: "masculino",
            universidad: "UNJu",
            carrera: "Profesorado Matemática"
        },
        {
            rol: "profesor",
            nombre: "María",
            apellido: "Lopez",
            email: "maria@tutorias.com",
            contrasenia: "María321#",
            genero: "femenino",
            universidad: "UNJu",
            carrera: "Ingeniería Informática"
        },
        {
            rol: "profesor",
            nombre: "Pedro",
            apellido: "Rojas",
            email: "pedro@tutorias.com",
            contrasenia: "Pedro321#",
            genero: "masculino",
            universidad: "UNJu",
            carrera: "Lic. Física"
        },
        {
            rol: "profesor",
            nombre: "Ana",
            apellido: "Ruiz",
            email: "ana@tutorias.com",
            contrasenia: "Ana321#",
            genero: "femenino",
            universidad: "UNJu",
            carrera: "Lic. Química"
        },
        {
            rol: "profesor",
            nombre: "Sofía",
            apellido: "Diaz",
            email: "sofia@tutorias.com",
            contrasenia: "Sofía321#",
            genero: "femenino",
            universidad: "UNJu",
            carrera: "Profesorado Inglés"
        },

        // ======================
        // ALUMNOS
        // ======================

        {
            rol: "alumno",
            nombre: "Agustín",
            apellido: "Vega",
            email: "agustin@tutorias.com",
            contrasenia: "Agustín321#",
            genero: "masculino",
            universidad: "UNJu",
            carrera: "Ingeniería"
        },
        {
            rol: "alumno",
            nombre: "Florencia",
            apellido: "Suarez",
            email: "florencia@tutorias.com",
            contrasenia: "Florencia321#",
            genero: "femenino",
            universidad: "UNJu",
            carrera: "APU"
        },
        {
            rol: "alumno",
            nombre: "Bruno",
            apellido: "Campos",
            email: "bruno@tutorias.com",
            contrasenia: "Bruno321#",
            genero: "masculino",
            universidad: "UNJu",
            carrera: "Arquitectura"
        },
        {
            rol: "alumno",
            nombre: "Valentina",
            apellido: "Romero",
            email: "valentina@tutorias.com",
            contrasenia: "Valentina321#",
            genero: "femenino",
            universidad: "UNJu",
            carrera: "Medicina"
        },
        {
            rol: "alumno",
            nombre: "Lucas",
            apellido: "Fernandez",
            email: "lucas@tutorias.com",
            contrasenia: "Lucas321#",
            genero: "masculino",
            universidad: "UNJu",
            carrera: "Contador"
        }

    ];

    for (const u of usuarios) {

        const hash = await bcrypt.hash(u.contrasenia, 10);

        await Usuario.create({
            rol: u.rol,
            nombre: u.nombre,
            apellido: u.apellido,
            email: u.email,
            contraseniaHash: hash,
            genero: u.genero,
            estado: "activo",
            proveedorAuth: "local",
            foto: null,
            ubicacion: "San Salvador de Jujuy",
            universidad: u.universidad,
            carrera: u.carrera
        });

    }

    console.log("Usuarios cargados.");
}

module.exports = seedUsuarios;