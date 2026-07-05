//Importaciones 
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const { DataTypes } = require('sequelize');

const pagoRoutes = require("./src/routes/mercadoPago.route.js");
// --------------------------------
//Creacion de la aplicacion 
var app = express();

//Middlewares  
app.use(express.json()); //permite recibir JSON 
app.use(cors({
    origin: process.env.FRONTEND_URL
        ? ['http://localhost:4200', process.env.FRONTEND_URL]
        : 'http://localhost:4200'
}));

//Cargar swagger 
/*const swaggerUi = require('swagger-ui-express'); 
const swaggerFile = require('./swagger_output.json'); // Asegúrate de que esta ruta sea correcta*/

//Rutas 
app.use('/api/admin', require('./src/routes/admin.route'));
app.use('/api/autenticacion', require('./src/routes/autenticacion.route.js'));
app.use('/api/usuario', require('./src/routes/usuario.route.js'));

app.use('/api/solicitud', require('./src/routes/solicitudes/solicitudAyuda.route'));
app.use('/api/respuesta', require('./src/routes/solicitudes/respuestaAyuda.route'));
app.use('/api/tutoria', require('./src/routes/tutoria.route.js'));

app.use('/api/categoria', require('./src/routes/categoria.route.js'));
app.use('/api/mercadopago', require('./src/routes/mercadoPago.route.js'));
app.use('/api/calificacion', require('./src/routes/calificacion.route.js'));


// =========================
// REDIRECCIONES DE MERCADO PAGO
// AGREGALAS ACÁ
// =========================

app.get("/pago-exitoso", (req, res) => {
    res.redirect(
        "http://localhost:4200/pago-exitoso?" +
        new URLSearchParams(req.query).toString()
    );
});

app.get("/pago-error", (req, res) => {
    res.redirect(
        "http://localhost:4200/pago-error?" +
        new URLSearchParams(req.query).toString()
    );
});

app.get("/pago-pendiente", (req, res) => {
    res.redirect(
        "http://localhost:4200/pago-pendiente?" +
        new URLSearchParams(req.query).toString()
    );
});


app.use('/api/precio', require('./src/routes/precio.route.js'));
app.use('/api/mercadopago', require('./src/routes/mercadoPago.route.js'));
app.use('/api/calificacion', require('./src/routes/calificacion.route.js'));

app.use('/api/horarioDisponible', require('./src/routes/horarioDisponible.route.js'))
app.use('/api/chat', require('./src/routes/chat.route'));


//Configuracion del puerto 
app.set('port', process.env.PORT || 3000);

const seedPrecios = require('./src/seeders/precios.seed.js')
const seedCategorias = require('./src/seeders/categorias.seed.js');

sequelize.sync({ force: false }) 
    .then( async () => {
        console.log('Tablas de PostgreSQL sincronizadas');

        // datos precargados
        await seedPrecios();
        await seedCategorias();

        app.listen(app.get('port'), () => { // Arranca el servidor 
            console.log(`Server started on port`, app.get('port'));
        });
    })
    .catch(err => {
        console.error('No se pudo iniciar el servidor debido a un error en la BD:', err);
    });

