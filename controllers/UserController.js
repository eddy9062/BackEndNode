const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../helpers/jwt');

function registrar(req, res) {
    const params = req.body;
    const user = new User();

    //console.log(params);
    if (params.password) {
        bcrypt.hash(params.password, null, null, (err, hash) => {
            if (hash) {
                user.password = hash;
                user.nombre = params.nombre;
                user.usuario = params.usuario;
                user.role = params.role;

                user.save((err, user_save) => {
                    if (err) {
                        res.status(500).send({ error: 'No se ingreso el usuario' })
                    } else {
                        res.status(200).send({ user: user_save });
                    }
                })

            }
        })
    } else {
        res.status(403).send({ error: 'No Ingreso la constraseña' })
    }
}

function login(req, res) {
    var data = req.body;

    //console.log('usuario ' + data.usuario);

    User.findOne({ usuario: data.usuario }, (err, user_data) => {
        if (err) {
            res.status(500).send({ error: 'Error en el servidor' });
        } else {
            if (user_data) {
                //res.status(200).send({user: user_data})
                bcrypt.compare(data.password, user_data.password, (err, check) => {
                    if (check) {
                        if (data.gettoken) {
                            res.status(200).send({
                                jwt: jwt.createToken(user_data),
                                user: user_data
                            });
                        } else {
                            res.status(200).send({
                                user: user_data,
                                message: 'no token',
                                jwt: jwt.createToken(user_data),
                            });
                        }

                    } else {
                        res.status(403).send({ message: 'El usuario o ontraseña no coinciden' });
                    }
                });
            } else {
                //console.log(user_data);
                res.status(403).send({ message: 'El usuario no existe' });
            }
        }
    })
}

function listarUsuarios(req, res) {
    User.find((err, user_data) => {
        if (user_data) {
            res.status(200).send({ usuarios: user_data });
        } else {
            res.status(403).send({ message: 'No hay usuarios en la bd' });
        }
    });
}

function editarUsuario(req, res) {
    var id = req.params['id'];
    var data = req.body;
    //console.log(data);
    if (data.password) {
        bcrypt.hash(data.password, null, null, (err, hash) => {
            if (hash) {
                User.findByIdAndUpdate(id, {
                    password: hash,
                    nombre: data.nombre,
                    usuario: data.usuario,
                    role: data.role,

                }, (err, user_edit) => {
                    if (user_edit) {
                        res.status(200).send({ usuario: user_edit });
                    } else {
                        res.status(500).send({ error: 'El usuario no se pudo editar' })
                    }
                });
            }
        });
    } else {
        User.findByIdAndUpdate(id, {
            nombre: data.nombre,
            usuario: data.usuario,
            role: data.role,

        }, (err, user_edit) => {
            if (user_edit) {
                res.status(200).send({ usuario: user_edit });
            } else {
                res.status(500).send({ error: 'El usuario no se pudo editar' })
            }
        });
    }
}

function getUser(req, res) {
    var id = req.params['id'];
    User.findById(id, (err, user_data) => {
        if (user_data) {
            res.status(200).send({ usuario: user_data });
        } else {
            res.status(500).send({ error: 'El usuario no encontrado' })
        }
    })
}

module.exports = {
    registrar,
    login,
    listarUsuarios,
    editarUsuario,
    getUser
}