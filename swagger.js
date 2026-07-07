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
            name: 'Admin',
            description: 'Operaciones de administración (usuarios, tutorías, categorías y métricas).'
        },
        {
            name: 'Solicitudes',
            description: 'Operaciones relacionadas con las solicitudes de ayuda.'
        },
        {
            name: 'Respuestas',
            description: 'Operaciones relacionadas con las respuestas a las solicitudes.'
        }
    ],
    definitions: {
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
            universidad: 'UNC',
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
        // ── Respuesta genérica ──────────────────────────────────────────────
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


