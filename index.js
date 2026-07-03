//Importaciones 
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

//Creacion de la aplicacion 
var app = express();

//Middlewares  
app.use(express.json()); //permite recibir JSON 
app.use(cors({ origin: 'http://localhost:4200' })); //permite que angular acceda a la API 

//Cargar swagger 
/*const swaggerUi = require('swagger-ui-express'); 
const swaggerFile = require('./swagger_output.json'); // Asegúrate de que esta ruta sea correcta*/

//Rutas 
app.use('/api/autenticacion', require('./src/routes/autenticacion.route.js'));
app.use('/api/usuario', require('./src/routes/usuario.route.js'));

app.use('/api/solicitud', require('./src/routes/solicitudes/solicitudAyuda.route'));
app.use('/api/respuesta', require('./src/routes/solicitudes/respuestaAyuda.route'));
app.use('/api/tutoria', require('./src/routes/tutoria.route.js'));
app.use('/api/categoria', require('./src/routes/categoria.route.js'));

//Configuracion del puerto  
app.set('port', process.env.PORT || 3000);

//Sincronizar Base de Datos y arrancar el servidor 
// .sync() crea las tablas automáticamente en Postgres si aún no existen 
// force en false crea las tablas solo si no existe, no borra datos en cada inicio 
sequelize.sync({ force: true })
    .then(() => {
        console.log('Tablas de PostgreSQL sincronizadas');
        app.listen(app.get('port'), () => { // Arranca el servidor 
            console.log(`Server started on port`, app.get('port'));
        });
    })
    .catch(err => {
        console.error('No se pudo iniciar el servidor debido a un error en la BD:', err);
    });

