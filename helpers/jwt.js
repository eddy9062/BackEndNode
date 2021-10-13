const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'eddy';

exports.createToken = function(user){
    const payload = {
        sub: user.id,
        nombre: user.nombre,
        apellidos: user.apellidos,
        usuario: user.usuario,
        password: user.password,
        role: user.role,
        iat: moment().unix(),
        exp: moment().add(30,'days').unix(),
    };

    return jwt.encode(payload,secret);
}