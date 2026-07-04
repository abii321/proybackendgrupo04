const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const aiService = {};

aiService.getResponse = async (systemPrompt, userMessage) => {
    const response = await groq.chat.completions.create({
        model: 'openai/gpt-oss-20b',
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user',   content: userMessage }
        ],
        max_tokens: 500
    });
    return response.choices[0].message.content;
};

module.exports = aiService;