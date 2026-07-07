const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Tutorias API',
        description: 'Documentación de la API de Tutorias — Grupo 04',
        version: '1.0.0'
    },
    host: 'localhost:3000',
    basePath: '/',
    schemes: ['http'],
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: 'JWT token. Formato: Bearer {token}'
        }
    },
    tags: [
        {
            name: 'Autenticacion',
            description: 'Operaciones de inicio de sesión y registro de usuarios.'
        },
        {
            name: 'Usuarios',
            description: 'Operaciones para gestionar perfiles de alumnos y profesores.'
        },
        {
            name: 'Solicitudes',
            description: 'Operaciones relacionadas con las solicitudes de ayuda.'
        },
        {
            name: 'Respuestas',
            description: 'Operaciones relacionadas con las respuestas a las solicitudes.'
        },
        {
            name: 'Categorias',
            description: 'Operaciones sobre categorías de asignaturas.'
        },
        {
            name: 'Horarios',
            description: 'Operaciones sobre horarios disponibles de profesores.'
        },
        {
            name: 'Calificaciones',
            description: 'Operaciones para calificar y obtener opiniones de tutorías.'
        },
        {
            name: 'MercadoPago',
            description: 'Operaciones de integración con Mercado Pago.'
        },
        {
            name: 'Precios',
            description: 'Operaciones sobre la lista de precios base.'
        },
        {
            name: 'Chat',
            description: 'Operaciones de asistencia con Inteligencia Artificial.'
        },
        {
            name: 'Admin',
            description: 'Operaciones de administración (usuarios, tutorías, categorías y métricas).'
        }
    ],
    definitions: {
        // ── Autenticación ───────────────────────────────────────────────────
        LoginRequest: {
            email: 'admin@admin.com',
            password: 'Admin123!'
        },
        LoginResponse: {
            status: 1,
            msg: 'success',
            id: 1,
            email: 'admin@admin.com',
            nombre: 'Administrador',
            apellido: 'Sistema',
            rol: 'admin',
            token: 'eyJhbGciOiJIUzI1NiIsIn...'
        },
        SignUpRequest: {
            nombre: 'Juan',
            apellido: 'Perez',
            email: 'juan@example.com',
            contrasenia: 'Juan123!',
            genero: 'masculino',
            rol: 'alumno',
            universidad: 'UNC',
            carrera: 'Ingeniería',
            ubicacion: 'Cordoba, Argentina',
            lat: -31.416,
            lng: -64.183
        },
        GoogleAuthRequest: {
            token: 'eyJhbGciOi...',
            rol: 'alumno',
            universidad: 'UNC',
            carrera: 'Ingeniería',
            genero: 'masculino',
            ubicacion: 'Cordoba, Argentina',
            lat: -31.416,
            lng: -64.183
        },
        // ── Solicitud de Ayuda ──────────────────────────────────────────────
        SolicitudAyuda: {
            usuarioId: 1,
            titulo: 'Necesito ayuda con cálculo',
            descripcion: 'No entiendo integrales dobles.',
            archivoAdjunto: null
        },
        SolicitudAyudaResponse: {
            status: 1,
            msg: 'success',
            data: {
                id: 1,
                usuarioId: 1,
                titulo: 'Necesito ayuda con cálculo',
                descripcion: 'No entiendo integrales dobles.',
                archivoAdjunto: null,
                estado: 'ABIERTA',
                fecha_creacion: '2025-01-01T00:00:00.000Z',
                fecha_actualizacion: '2025-01-01T00:00:00.000Z'
            }
        },
        // ── Respuesta de Ayuda ──────────────────────────────────────────────
        RespuestaAyuda: {
            solicitudId: 1,
            usuarioId: 3,
            respuesta: 'Puedo ayudarte con integrales dobles.',
            precio: 500,
            archivoAdjunto: null
        },
        RespuestaAyudaResponse: {
            status: 1,
            msg: 'success',
            data: {
                id: 1,
                solicitudId: 1,
                usuarioId: 3,
                respuesta: 'Puedo ayudarte con integrales dobles.',
                precio: 500,
                estado: 'PENDIENTE',
                pagada: false,
                paymentId: null,
                archivoAdjunto: null,
                fecha_creacion: '2025-01-01T00:00:00.000Z',
                fecha_actualizacion: '2025-01-01T00:00:00.000Z'
            }
        },
        // ── Admin: Usuario ──────────────────────────────────────────────────
        AdminUpdateUsuario: {
            nombre: 'Juan',
            apellido: 'Pérez',
            email: 'juan@example.com',
            universidad: 'UNJU',
            carrera: 'Ingeniería',
            rol: 'alumno',
            estado: 'activo'
        },
        // ── Admin: Tutoría ──────────────────────────────────────────────────
        AdminUpdateTutoria: {
            estado: 'CONFIRMADA',
            modalidad: 'virtual',
            precioAcordado: 1500,
            fechaHora: '2025-06-01T10:00:00.000Z',
            pagada: false
        },
        // ── Admin: Categoría ────────────────────────────────────────────────
        AdminUpdateCategoria: {
            nombre: 'Matemáticas',
            nivel: 'universitario',
            descripcion: 'Cálculo, álgebra y estadística'
        },
        // ── Calificaciones ──────────────────────────────────────────────────
        CalificacionRequest: {
            tutoriaId: 1,
            calificacion: 5,
            comentario: 'Excelente clase, muy clara explicación.'
        },
        CalificacionResponse: {
            status: 1,
            msg: 'Calificación creada correctamente',
            data: {
                id: 1,
                tutoriaId: 1,
                calificacion: 5,
                comentario: 'Excelente clase, muy clara explicación.',
                createdAt: '2025-01-01T00:00:00.000Z'
            }
        },
        // ── Categorías ──────────────────────────────────────────────────────
        CategoriaRequest: {
            nombre: 'Física',
            descripcion: 'Mecánica, termodinámica y óptica'
        },
        CategoriaResponse: {
            status: 1,
            msg: 'success',
            data: {
                id: 1,
                nombre: 'Física',
                descripcion: 'Mecánica, termodinámica y óptica'
            }
        },
        AsociarProfesorRequest: {
            profesorId: 1,
            categoriaId: 2
        },
        // ── Horarios ────────────────────────────────────────────────────────
        HorarioRequest: {
            profesorId: 1,
            diaSemana: 'Lunes',
            horaInicio: '09:00',
            horaFin: '11:00',
            modalidad: 'virtual'
        },
        HorarioResponse: {
            status: 1,
            msg: 'Horario creado',
            data: {
                id: 1,
                profesorId: 1,
                diaSemana: 'Lunes',
                horaInicio: '09:00',
                horaFin: '11:00',
                modalidad: 'virtual',
                estado: 'activo'
            }
        },
        // ── MercadoPago ─────────────────────────────────────────────────────
        PreferenciaRequest: {
            respuestaId: 1
        },
        PreferenciaResponse: {
            status: 1,
            init_point: 'https://www.mercadopago.com.ar/checkout/v1/redirect?...'
        },
        // ── Chat ────────────────────────────────────────────────────────────
        ChatRequest: {
            message: '¿Cuánto profesores activos hay?'
        },
        ChatResponse: {
            status: 1,
            msg: 'success',
            data: 'Según la información disponible, los profesores activos son 5...'
        },
        // ── Usuarios ────────────────────────────────────────────────────────
        UsuarioUpdateRequest: {
            nombre: 'Juan',
            apellido: 'Perez',
            ubicacion: 'Cordoba, Argentina',
            universidad: 'UNC',
            carrera: 'Ingeniería',
            nivelAcademico: 'universitario',
            biografia: 'Me gusta estudiar programación.',
            tarifaBase: 1200
        },
        UsuarioAddHorarioRequest: {
            usuarioId: 1,
            diaSemana: 'Martes',
            horaInicio: '14:00',
            horaFin: '16:00'
        },
        // ── Respuestas genéricas ─────────────────────────────────────────────
        SuccessResponse: {
            status: 1,
            msg: 'Operación realizada correctamente'
        },
        ErrorResponse: {
            status: 0,
            msg: 'Error al realizar la operación'
        }
    }
};

const outputFile = './swagger_output.json';

const endpointsFiles = [
    './index.js'
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log(`Documentación generada en ${outputFile}`);
});
