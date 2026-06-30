const { google } = require('googleapis');

// Estas credenciales las vas a sacar de Google Cloud Console (las guardás en tu .env)
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

// Seteamos el refresh token (esto permite que tu app cree eventos sin pedir login a cada rato)
oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

const crearEventoTutoría = async (alumnoEmail, profesorEmail, fechaHora, categoriaNombre) => {
    // Calculamos que la tutoría dura 1 hora
    const fechaInicio = new Date(fechaHora);
    const fechaFin = new Date(fechaInicio.getTime() + 60 * 60 * 1000); 

    const event = {
        summary: `Tutoría de ${categoriaNombre}`,
        description: 'Tutoría agendada a través de la plataforma.',
        start: { dateTime: fechaInicio.toISOString(), timeZone: 'America/Argentina/Buenos_Aires' },
        end: { dateTime: fechaFin.toISOString(), timeZone: 'America/Argentina/Buenos_Aires' },
        attendees: [{ email: alumnoEmail }, { email: profesorEmail }],
        conferenceData: {
            createRequest: {
                requestId: "tutoria-" + Date.now(),
                conferenceSolutionKey: { type: "hangoutsMeet" }
            }
        }
    };

    const response = await calendar.events.insert({
        calendarId: 'primary',
        resource: event,
        conferenceDataVersion: 1, // Fundamental para que genere el link de Meet
    });

    return {
        eventId: response.data.id,
        meetLink: response.data.hangoutLink
    };
};

module.exports = { crearEventoTutoría };