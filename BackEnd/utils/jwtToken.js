const jwt = require('jsonwebtoken');

const jwtToken = (userId) => {
    //toda informacao aqui estara disponivel para leitura, geralmente colocar mesmo o ID
    return jwt.sign({id:userId}, process.env.JWT_SECRET_KEY, {
        expiresIn: '30d',
    });
};

module.exports = jwtToken;