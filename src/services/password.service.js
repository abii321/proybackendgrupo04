const bcrypt = require('bcrypt');

const passwordService = {};

passwordService.hashPassword = async (password) => {
    const saltRounds = 10; // aplica 2^10 iteraciones del algoritmo
    return await bcrypt.hash(password, saltRounds);
}

passwordService.comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}

module.exports = passwordService;
//14