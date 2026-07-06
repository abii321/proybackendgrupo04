const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');
const authCtrl = {}

authCtrl.verifyToken = async (req, res, next) => {
    // 1. Validar si el header existe antes de hacer split 
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized request: No token provided.' }); 
    }
    // 2. Extraer el token separando por el espacio 
    const token = authHeader.split(' ')[1];
        
    // 3. Validar que el token no sea undefined o esté vacío 
    if (!token || token === 'null') return res.status(401).json({ message: 'Unauthorized request: Invalid token  format.' }); 

    try {
        // 4. Capturar errores de verificación (token expirado, firma inválida, etc.) 
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = payload.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized request: Invalid or expired token.' }); 
    } 
}

authCtrl.verifyAdmin = async (req, res, next) => {
    try {
        // 1. Buscar al usuario en la base de datos usando el ID decodificado del token
        const user = await Usuario.findByPk(req.userId);
        
        // 2. Validar que el usuario realmente exista
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        
        // 3. Validar que el rol del usuario sea estrictamente 'admin'
        if (user.rol !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Admin role required.' });
        }
        
        // 4. Permitir el paso al siguiente controlador
        next();
    } catch (error) {
        // 5. Capturar y registrar errores del servidor
        console.error('Error verifying admin role:', error);
        return res.status(500).json({ message: 'Error verifying admin role.' });
    }
}

module.exports = authCtrl; 