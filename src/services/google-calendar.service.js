const { google } = require('googleapis');

// credenciales de la aplicación
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

// (refresh token) para que nunca caduque la sesión
oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

const googleCalendarService = {
    
    /**
Crea un evento en el calendario cuando se acepta una tutoría
     */
    agendarTutoria: async (tutoria, alumno, profesor) => {
        try {
            // Calculamos la hora de fin (asumiendo 1 hora de duración por defecto)
            const fechaInicio = new Date(tutoria.fechaHora);
            const fechaFin = new Date(fechaInicio.getTime() + (60 * 60 * 1000));

            const evento = {
                summary: `Tutoría: ${tutoria.categoria} - ${profesor.nombre} y ${alumno.nombre}`,
                description: `Clase agendada a través de la plataforma.\nModalidad: ${tutoria.modalidad}\nMensaje del alumno: ${tutoria.mensaje || 'Sin detalles adicionales.'}`,
                start: {
                    dateTime: fechaInicio.toISOString(),
                    timeZone: 'America/Argentina/Buenos_Aires', // Ajustado a nuestra zona horaria
                },
                end: {
                    dateTime: fechaFin.toISOString(),
                    timeZone: 'America/Argentina/Buenos_Aires',
                },
                attendees: [
                    { email: profesor.email },
                    { email: alumno.email }
                ],
                reminders: {
                    useDefault: false,
                    overrides: [
                        { method: 'email', minutes: 24 * 60 }, // Aviso 1 día antes
                        { method: 'popup', minutes: 30 },      // Aviso 30 min antes
                    ],
                },
            };

            // Si es virtual, le pedimos a Google que genere el link de Meet 
            if (tutoria.modalidad === 'virtual') {
                evento.conferenceData = {
                    createRequest: {
                        requestId: `tutoria-${tutoria.id}-${Date.now()}`,
                        conferenceSolutionKey: { type: 'hangoutsMeet' }
                    }
                };
            }

            // Insertamos el evento en el calendario principal
            const respuesta = await calendar.events.insert({
                calendarId: 'primary',
                resource: evento,
                conferenceDataVersion: 1, // Obligatorio para generar el Meet
                sendUpdates: 'all' // Envía correos automáticos a los invitados
            });

            return {
                exito: true,
                idEvento: respuesta.data.id,
                linkCalendario: respuesta.data.htmlLink,
                linkMeet: respuesta.data.hangoutLink || null
            };

        } catch (error) {
            console.error('Error en el servicio de Google Calendar:', error);
            throw new Error('No se pudo agendar el evento en Google Calendar');
        }
    },

    /**
     * Elimina el evento si se cancela la tutoría
     */
    cancelarTutoria: async (eventId) => {
        try {
            await calendar.events.delete({
                calendarId: 'primary',
                eventId: eventId,
                sendUpdates: 'all'
            });
            return { exito: true };
        } catch (error) {
            console.error('Error al cancelar evento en Google Calendar:', error);
            throw new Error('No se pudo cancelar el evento');
        }
    }
};

module.exports = googleCalendarService;