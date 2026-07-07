const { fn, col, literal, Op } = require('sequelize');
const Usuario = require('../models/usuario.model');
const Tutoria = require('../models/tutoria.model');
const SolicitudAyuda = require('../models/solicitudes/solicitudAyuda.model');
const Categoria = require('../models/categoria.model');
const Calificacion = require('../models/calificacion.model');

const adminCtrl = {};

// Números generales para las cards
adminCtrl.getSummary = async (req, res) => {
    /* #swagger.tags = ['Admin']
       #swagger.summary = 'Resumen general del sistema'
       #swagger.description = 'Retorna métricas generales: total de usuarios, tutorías, solicitudes, categorías y calificación promedio.'
       #swagger.security = [{ bearerAuth: [] }]
       #swagger.responses[200] = {
         description: 'Resumen obtenido correctamente.',
         schema: {
           status: 1,
           msg: 'success',
           data: {
             totalUsers: 50,
             totalTutorials: 120,
             totalHelpRequests: 75,
             totalCategories: 10,
             avgRating: '4.3'
           }
         }
       }
       #swagger.responses[500] = { description: 'Error al obtener resumen.' }
    */
    try {
        const totalUsers = await Usuario.count();
        const totalTutorials = await Tutoria.count();
        const totalHelpRequests = await SolicitudAyuda.count();
        const totalCategories = await Categoria.count();
        const avgRatingResult = await Calificacion.findOne({
            attributes: [[fn('AVG', col('calificacion')), 'avgRating']]
        });
        const avgRating = avgRatingResult
            ? parseFloat(avgRatingResult.dataValues.avgRating || 0).toFixed(1)
            : '0.0';

        res.json({
            status: 1,
            msg: 'success',
            data: { totalUsers, totalTutorials, totalHelpRequests, totalCategories, avgRating }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 0, msg: 'Error al obtener resumen' });
    }
};

// Usuarios por rol y estado — gráfico barra apilada 
adminCtrl.getUsersByRole = async (req, res) => {
    /* #swagger.tags = ['Admin']
       #swagger.summary = 'Usuarios agrupados por rol y estado'
       #swagger.description = 'Retorna el conteo de usuarios agrupado por rol (alumno, profesor, admin) y estado (activo, inactivo). Útil para gráficos de barra apilada.'
       #swagger.security = [{ bearerAuth: [] }]
       #swagger.responses[200] = {
         description: 'Datos obtenidos correctamente.',
         schema: {
           status: 1,
           msg: 'success',
           data: [{ rol: 'alumno', estado: 'activo', count: 30 }]
         }
       }
       #swagger.responses[500] = { description: 'Error al obtener usuarios por rol.' }
    */
    try {
        const data = await Usuario.findAll({
            attributes: [
                'rol',
                'estado',
                [fn('COUNT', col('id')), 'count']
            ],
            group: ['rol', 'estado'],
            order: [['rol', 'ASC']]
        });
        res.json({ status: 1, msg: 'success', data });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al obtener usuarios por rol' });
    }
};

// Solicitudes por estado — gráfico torta
adminCtrl.getHelpRequestsByState = async (req, res) => {
    /* #swagger.tags = ['Admin']
       #swagger.summary = 'Solicitudes agrupadas por estado'
       #swagger.description = 'Retorna el conteo de solicitudes de ayuda agrupadas por estado (ABIERTA, RESUELTA, CERRADA). Útil para gráficos de torta.'
       #swagger.security = [{ bearerAuth: [] }]
       #swagger.responses[200] = {
         description: 'Datos obtenidos correctamente.',
         schema: {
           status: 1,
           msg: 'success',
           data: [{ estado: 'ABIERTA', count: 40 }]
         }
       }
       #swagger.responses[500] = { description: 'Error al obtener solicitudes por estado.' }
    */
    try {
        const data = await SolicitudAyuda.findAll({
            attributes: [
                'estado',
                [fn('COUNT', col('id')), 'count']
            ],
            group: ['estado']
        });
        res.json({ status: 1, msg: 'success', data });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al obtener solicitudes por estado' });
    }
};

// Tutorías por estado — gráfico torta
adminCtrl.getTutorialsByState = async (req, res) => {
    /* #swagger.tags = ['Admin']
       #swagger.summary = 'Tutorías agrupadas por estado'
       #swagger.description = 'Retorna el conteo de tutorías agrupadas por estado. Útil para gráficos de torta.'
       #swagger.security = [{ bearerAuth: [] }]
       #swagger.responses[200] = {
         description: 'Datos obtenidos correctamente.',
         schema: {
           status: 1,
           msg: 'success',
           data: [{ estado: 'CONFIRMADA', count: 55 }]
         }
       }
       #swagger.responses[500] = { description: 'Error al obtener tutorías por estado.' }
    */
    try {
        const data = await Tutoria.findAll({
            attributes: [
                'estado',
                [fn('COUNT', col('id')), 'count']
            ],
            group: ['estado'],
            order: [['estado', 'ASC']]
        });
        res.json({ status: 1, msg: 'success', data });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al obtener tutorías por estado' });
    }
};

// Tutorías por mes — gráfico línea
adminCtrl.getTutorialsByMonth = async (req, res) => {
    /* #swagger.tags = ['Admin']
       #swagger.summary = 'Tutorías agrupadas por mes'
       #swagger.description = 'Retorna el conteo de tutorías del año actual agrupadas por mes. Útil para gráficos de línea.'
       #swagger.security = [{ bearerAuth: [] }]
       #swagger.responses[200] = {
         description: 'Datos obtenidos correctamente.',
         schema: {
           status: 1,
           msg: 'success',
           data: [{ month: '01', count: 10 }]
         }
       }
       #swagger.responses[500] = { description: 'Error al obtener tutorías por mes.' }
    */
    try {
        const data = await Tutoria.findAll({
            attributes: [
                [fn('TO_CHAR', col('createdAt'), 'MM'), 'month'],
                [fn('COUNT', col('id')), 'count']
            ],
            where: literal(`EXTRACT(YEAR FROM "createdAt") = EXTRACT(YEAR FROM NOW())`),
            group: [fn('TO_CHAR', col('createdAt'), 'MM')],
            order: [[fn('TO_CHAR', col('createdAt'), 'MM'), 'ASC']]
        });
        res.json({ status: 1, msg: 'success', data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 0, msg: 'Error al obtener tutorías por mes' });
    }
};

// Listado completo de tutorías para DataTable
adminCtrl.getFullTutorials = async (req, res) => {
    /* #swagger.tags = ['Admin']
       #swagger.summary = 'Listado completo de tutorías'
       #swagger.description = 'Retorna el listado detallado de todas las tutorías, incluyendo alumno, profesor, categoría y calificación. Útil para DataTables.'
       #swagger.security = [{ bearerAuth: [] }]
       #swagger.responses[200] = {
         description: 'Tutorías obtenidas correctamente.',
         schema: { status: 1, msg: 'success', data: [] }
       }
       #swagger.responses[500] = { description: 'Error al obtener tutorías.' }
    */
    try {
        const data = await Tutoria.findAll({
            attributes: [
                'id', 'modalidad', 'precioAcordado', 'fechaHora',
                'estado', 'enlaceMeet', 'pagada', 'createdAt'
            ],
            include: [
                { model: Usuario, as: 'alumno', attributes: ['id', 'nombre', 'apellido', 'email'] },
                { model: Usuario, as: 'profesor', attributes: ['id', 'nombre', 'apellido', 'email'] },
                { model: Categoria, as: 'categoria', attributes: ['id', 'nombre'] },
                { model: Calificacion, as: 'calificacion', attributes: ['calificacion', 'comentario'], required: false }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json({ status: 1, msg: 'success', data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 0, msg: 'Error al obtener tutorías' });
    }
};

// Obtener listado de usuarios para el dashboard
adminCtrl.getUsers = async (req, res) => {
    /* #swagger.tags = ['Admin']
       #swagger.summary = 'Listado de usuarios'
       #swagger.description = 'Retorna todos los usuarios registrados con sus atributos principales.'
       #swagger.security = [{ bearerAuth: [] }]
       #swagger.responses[200] = {
         description: 'Usuarios obtenidos correctamente.',
         schema: { status: 1, msg: 'success', data: [] }
       }
       #swagger.responses[500] = { description: 'Error al obtener usuarios.' }
    */
    try {
        const data = await Usuario.findAll({
            attributes: [
                'id', 'nombre', 'apellido', 'email', 'rol', 'estado', 
                'universidad', 'carrera', 'genero', 'ubicacion', 'createdAt'
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json({ status: 1, msg: 'success', data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 0, msg: 'Error al obtener usuarios' });
    }
};

// Actualizar atributos de un usuario desde admin
adminCtrl.updateUserAdmin = async (req, res) => {
    /* #swagger.tags = ['Admin']
       #swagger.summary = 'Actualizar un usuario'
       #swagger.description = 'Actualiza los datos de un usuario desde el panel de administración.'
       #swagger.security = [{ bearerAuth: [] }]
       #swagger.consumes = ['application/json']
       #swagger.parameters['id'] = {
         in: 'path',
         description: 'ID del usuario a actualizar.',
         required: true,
         type: 'integer'
       }
       #swagger.parameters['body'] = {
         in: 'body',
         description: 'Datos del usuario a actualizar.',
         required: true,
         schema: { $ref: '#/definitions/AdminUpdateUsuario' }
       }
       #swagger.responses[200] = {
         description: 'Usuario actualizado correctamente.',
         schema: { $ref: '#/definitions/SuccessResponse' }
       }
       #swagger.responses[404] = { description: 'Usuario no encontrado.' }
       #swagger.responses[500] = { description: 'Error al actualizar el usuario.' }
    */
    try {
        const { id } = req.params;
        const data = req.body;

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ status: 0, msg: 'Usuario no encontrado.' });
        }

        await usuario.update({
            nombre: data.nombre,
            apellido: data.apellido,
            email: data.email,
            universidad: data.universidad,
            carrera: data.carrera,
            rol: data.rol,
            estado: data.estado
        });

        res.json({ status: 1, msg: 'Usuario actualizado correctamente.', data: usuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 0, msg: 'Error al actualizar el usuario' });
    }
};

adminCtrl.deleteUser = async (req, res) => {
    /* #swagger.tags = ['Admin']
       #swagger.summary = 'Eliminar un usuario'
       #swagger.description = 'Elimina un usuario por su ID. Falla si tiene tutorías o solicitudes asociadas.'
       #swagger.security = [{ bearerAuth: [] }]
       #swagger.parameters['id'] = {
         in: 'path',
         description: 'ID del usuario a eliminar.',
         required: true,
         type: 'integer'
       }
       #swagger.responses[200] = {
         description: 'Usuario eliminado correctamente.',
         schema: { $ref: '#/definitions/SuccessResponse' }
       }
       #swagger.responses[400] = { description: 'No se puede eliminar: tiene tutorías o solicitudes asociadas.' }
       #swagger.responses[404] = { description: 'Usuario no encontrado.' }
       #swagger.responses[500] = { description: 'Error al eliminar el usuario.' }
    */
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ status: 0, msg: 'Usuario no encontrado.' });
        }

        // Verificar dependencias manualmente
        const tutoriasCount = await Tutoria.count({
            where: { [Op.or]: [{ alumnoId: id }, { profesorId: id }] }
        });
        const solicitudesCount = await SolicitudAyuda.count({
            where: { usuarioId: id }
        });

        if (tutoriasCount > 0 || solicitudesCount > 0) {
            return res.status(400).json({ status: 0, msg: 'No se puede eliminar el usuario porque tiene tutorías o solicitudes asociadas. Por favor, cambia su estado a Inactivo.' });
        }

        await usuario.destroy();
        res.json({ status: 1, msg: 'Usuario eliminado correctamente.' });
    } catch (error) {
        console.error(error);
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({ status: 0, msg: 'No se puede eliminar el usuario porque tiene registros asociados.' });
        }
        res.status(500).json({ status: 0, msg: 'Error al eliminar el usuario' });
    }
};

// --- TUTORÍAS ---
adminCtrl.updateTutorial = async (req, res) => {
    /* #swagger.tags = ['Admin']
       #swagger.summary = 'Actualizar una tutoría'
       #swagger.description = 'Actualiza los datos de una tutoría existente desde el panel de administración.'
       #swagger.security = [{ bearerAuth: [] }]
       #swagger.consumes = ['application/json']
       #swagger.parameters['id'] = {
         in: 'path',
         description: 'ID de la tutoría a actualizar.',
         required: true,
         type: 'integer'
       }
       #swagger.parameters['body'] = {
         in: 'body',
         description: 'Datos de la tutoría a actualizar.',
         required: true,
         schema: { $ref: '#/definitions/AdminUpdateTutoria' }
       }
       #swagger.responses[200] = {
         description: 'Tutoría actualizada correctamente.',
         schema: { $ref: '#/definitions/SuccessResponse' }
       }
       #swagger.responses[404] = { description: 'Tutoría no encontrada.' }
       #swagger.responses[500] = { description: 'Error al actualizar tutoría.' }
    */
    try {
        const { id } = req.params;
        const data = req.body;
        const tutoria = await Tutoria.findByPk(id);
        if (!tutoria) return res.status(404).json({ status: 0, msg: 'Tutoría no encontrada' });
        
        await tutoria.update({
            estado: data.estado,
            modalidad: data.modalidad,
            precioAcordado: data.precioAcordado,
            fechaHora: data.fechaHora,
            pagada: data.pagada
        });
        res.json({ status: 1, msg: 'Tutoría actualizada', data: tutoria });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al actualizar tutoría' });
    }
};

adminCtrl.deleteTutorial = async (req, res) => {
    /* #swagger.tags = ['Admin']
       #swagger.summary = 'Eliminar una tutoría'
       #swagger.description = 'Elimina una tutoría por su ID. Falla si tiene calificaciones asociadas.'
       #swagger.security = [{ bearerAuth: [] }]
       #swagger.parameters['id'] = {
         in: 'path',
         description: 'ID de la tutoría a eliminar.',
         required: true,
         type: 'integer'
       }
       #swagger.responses[200] = {
         description: 'Tutoría eliminada correctamente.',
         schema: { $ref: '#/definitions/SuccessResponse' }
       }
       #swagger.responses[400] = { description: 'No se puede eliminar: tiene registros asociados.' }
       #swagger.responses[500] = { description: 'Error al eliminar tutoría.' }
    */
    try {
        const { id } = req.params;
        await Tutoria.destroy({ where: { id } });
        res.json({ status: 1, msg: 'Tutoría eliminada' });
    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({ status: 0, msg: 'No se puede eliminar la tutoría porque tiene registros asociados (ej. calificaciones).' });
        }
        res.status(500).json({ status: 0, msg: 'Error al eliminar tutoría' });
    }
};

// --- CATEGORÍAS ---
adminCtrl.getCategoriesList = async (req, res) => {
    /* #swagger.tags = ['Admin']
       #swagger.summary = 'Listado de categorías'
       #swagger.description = 'Retorna todas las categorías disponibles ordenadas alfabéticamente.'
       #swagger.security = [{ bearerAuth: [] }]
       #swagger.responses[200] = {
         description: 'Categorías obtenidas correctamente.',
         schema: { status: 1, msg: 'success', data: [] }
       }
       #swagger.responses[500] = { description: 'Error al obtener categorías.' }
    */
    try {
        const data = await Categoria.findAll({
            order: [['nombre', 'ASC']]
        });
        res.json({ status: 1, msg: 'success', data });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al obtener categorías' });
    }
};

adminCtrl.updateCategory = async (req, res) => {
    /* #swagger.tags = ['Admin']
       #swagger.summary = 'Actualizar una categoría'
       #swagger.description = 'Actualiza los datos de una categoría existente desde el panel de administración.'
       #swagger.security = [{ bearerAuth: [] }]
       #swagger.consumes = ['application/json']
       #swagger.parameters['id'] = {
         in: 'path',
         description: 'ID de la categoría a actualizar.',
         required: true,
         type: 'integer'
       }
       #swagger.parameters['body'] = {
         in: 'body',
         description: 'Datos de la categoría a actualizar.',
         required: true,
         schema: { $ref: '#/definitions/AdminUpdateCategoria' }
       }
       #swagger.responses[200] = {
         description: 'Categoría actualizada correctamente.',
         schema: { $ref: '#/definitions/SuccessResponse' }
       }
       #swagger.responses[404] = { description: 'Categoría no encontrada.' }
       #swagger.responses[500] = { description: 'Error al actualizar categoría.' }
    */
    try {
        const { id } = req.params;
        const data = req.body;
        const categoria = await Categoria.findByPk(id);
        if (!categoria) return res.status(404).json({ status: 0, msg: 'Categoría no encontrada' });
        
        await categoria.update({
            nombre: data.nombre,
            nivel: data.nivel,
            descripcion: data.descripcion
        });
        res.json({ status: 1, msg: 'Categoría actualizada', data: categoria });
    } catch (error) {
        res.status(500).json({ status: 0, msg: 'Error al actualizar categoría' });
    }
};

adminCtrl.deleteCategory = async (req, res) => {
    /* #swagger.tags = ['Admin']
       #swagger.summary = 'Eliminar una categoría'
       #swagger.description = 'Elimina una categoría por su ID. Falla si hay tutorías asociadas a ella.'
       #swagger.security = [{ bearerAuth: [] }]
       #swagger.parameters['id'] = {
         in: 'path',
         description: 'ID de la categoría a eliminar.',
         required: true,
         type: 'integer'
       }
       #swagger.responses[200] = {
         description: 'Categoría eliminada correctamente.',
         schema: { $ref: '#/definitions/SuccessResponse' }
       }
       #swagger.responses[400] = { description: 'No se puede eliminar: tiene tutorías asociadas.' }
       #swagger.responses[500] = { description: 'Error al eliminar categoría.' }
    */
    try {
        const { id } = req.params;
        const count = await Tutoria.count({ where: { categoriaId: id } });
        if (count > 0) {
            return res.status(400).json({ status: 0, msg: 'No se puede eliminar la categoría porque hay tutorías asociadas a ella.' });
        }
        await Categoria.destroy({ where: { id } });
        res.json({ status: 1, msg: 'Categoría eliminada' });
    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({ status: 0, msg: 'No se puede eliminar la categoría porque tiene registros asociados.' });
        }
        res.status(500).json({ status: 0, msg: 'Error al eliminar categoría' });
    }
};

module.exports = adminCtrl;