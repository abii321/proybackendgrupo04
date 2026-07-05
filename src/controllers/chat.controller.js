const aiService = require('../services/ai.service');
const contextService = require('../services/context.service');

const chatCtrl = {};

chatCtrl.sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message || message.trim() === '') {
            return res.status(400).json({ status: 0, msg: 'El mensaje no puede estar vacío' });
        }

        // construir contexto desde la BD y pasamos el mensaje para filtrar lo que necesitamos
        const systemPrompt = await contextService.buildContext(message);
        // llamar a la IA
        const response = await aiService.getResponse(systemPrompt, message);

        res.json({ status: 1, msg: 'success', data: response });

    } catch (error) {
        console.error('Error en chat:', error);
        res.status(500).json({ status: 0, msg: 'Error al procesar el mensaje' });
    }
};

module.exports = chatCtrl;