const express = require('express');
const userController = require('../controllers/UserController');

const api = express.Router();

api.post('/registrar', userController.registrar);
api.post('/login', userController.login);
api.get('/usuarios', userController.listarUsuarios);
api.put('/usuario/editar/:id', userController.editarUsuario);
api.get('/usuario/:id', userController.getUser);

module.exports = api;