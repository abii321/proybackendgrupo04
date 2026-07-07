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
            carrera: "Ingeniería Informática",
            lat: -24.1833,
            lng: -65.3312
        },
        {
            rol: "admin",
            nombre: "Lucía",
            apellido: "Martinez",
            email: "lucia.admin@tutorias.com",
            contrasenia: "Lucía321#",
            genero: "femenino",
            universidad: "UNJu",
            carrera: "Lic. Sistemas",
            lat: -24.1954,
            lng: -65.2987
        },
        {
            rol: "admin",
            nombre: "Miguel",
            apellido: "Sosa",
            email: "miguel.admin@tutorias.com",
            contrasenia: "Miguel321#",
            genero: "masculino",
            universidad: "UNJu",
            carrera: "Ingeniería",
            lat: -24.1858,
            lng: -65.3015
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
            carrera: "Profesorado Matemática",
            lat: -24.176,
            lng: -65.315
        },
        {
            rol: "profesor",
            nombre: "María",
            apellido: "Lopez",
            email: "maria@tutorias.com",
            contrasenia: "María321#",
            genero: "femenino",
            universidad: "UNJu",
            carrera: "Ingeniería Informática",
            lat: -24.19,
            lng: -65.29
        },
        {
            rol: "profesor",
            nombre: "Pedro",
            apellido: "Rojas",
            email: "pedro@tutorias.com",
            contrasenia: "Pedro321#",
            genero: "masculino",
            universidad: "UNJu",
            carrera: "Lic. Física",
            lat: -24.18,
            lng: -65.32
        },
        {
            rol: "profesor",
            nombre: "Ana",
            apellido: "Ruiz",
            email: "ana@tutorias.com",
            contrasenia: "Ana321#",
            genero: "femenino",
            universidad: "UNJu",
            carrera: "Lic. Química",
            lat: -24.20,
            lng: -65.31
        },
        {
            rol: "profesor",
            nombre: "Sofía",
            apellido: "Diaz",
            email: "sofia@tutorias.com",
            contrasenia: "Sofía321#",
            genero: "femenino",
            universidad: "UNJu",
            carrera: "Profesorado Inglés",
            lat: -24.17,
            lng: -65.295
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
            carrera: "Ingeniería",
            lat: -24.188,
            lng: -65.305
        },
        {
            rol: "alumno",
            nombre: "Florencia",
            apellido: "Suarez",
            email: "florencia@tutorias.com",
            contrasenia: "Florencia321#",
            genero: "femenino",
            universidad: "UNJu",
            carrera: "APU",
            lat: -24.181,
            lng: -65.319
        },
        {
            rol: "alumno",
            nombre: "Bruno",
            apellido: "Campos",
            email: "bruno@tutorias.com",
            contrasenia: "Bruno321#",
            genero: "masculino",
            universidad: "UNJu",
            carrera: "Arquitectura",
            lat: -24.192,
            lng: -65.323
        },
        {
            rol: "alumno",
            nombre: "Valentina",
            apellido: "Romero",
            email: "valentina@tutorias.com",
            contrasenia: "Valentina321#",
            genero: "femenino",
            universidad: "UNJu",
            carrera: "Medicina",
            lat: -24.179,
            lng: -65.299
        },
        {
            rol: "alumno",
            nombre: "Lucas",
            apellido: "Fernandez",
            email: "lucas@tutorias.com",
            contrasenia: "Lucas321#",
            genero: "masculino",
            universidad: "UNJu",
            carrera: "Contador",
            lat: -24.184,
            lng: -65.287
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
            lat: u.lat,
            lng: u.lng,
            universidad: u.universidad,
            carrera: u.carrera
        });

    }

    console.log("Usuarios cargados.");
}

module.exports = seedUsuarios;