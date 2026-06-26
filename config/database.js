//Importar sequelize 
const { Sequelize } = require('sequelize');

//Crear la conexion  
// se crea el objeto que representa la conexion a la BD : nombreBD,usuario,contraseña,configuracion 
const sequelize = new Sequelize('tpFinal', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false, // evita que llene la consola con logs de consultas SQL básicas 
});

//Probar la conexion 
sequelize.authenticate()
    .then(() => console.log('DB is connected to PostgreSQL'))
    .catch(err => console.error('Error al conectar a PostgreSQL:', err));

module.exports = sequelize;