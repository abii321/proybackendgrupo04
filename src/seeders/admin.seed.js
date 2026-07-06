const Usuario = require('../models/usuario.model');
const passwordService = require('../services/password.service');

const seedAdmin = async () => {
    try {
        const adminEmail = 'admin@admin.com';
        const existingAdmin = await Usuario.findOne({ where: { email: adminEmail } });

        if (!existingAdmin) {
            const hashedPassword = await passwordService.hashPassword('Admin123!');

            await Usuario.create({
                rol: 'admin',
                nombre: 'Administrador',
                apellido: 'Sistema',
                email: adminEmail,
                contraseniaHash: hashedPassword,
                genero: 'masculino',
                estado: 'activo',
                proveedorAuth: 'local',
                universidad: 'Admin',
                carrera: 'Administración'
            });
            console.log('Usuario administrador creado correctamente (admin@admin.com / Admin123!).');
        } else {
            console.log('El usuario administrador ya existe.');
        }
    } catch (error) {
        console.error('Error al poblar el usuario administrador:', error);
    }
};

module.exports = seedAdmin;
