const express = require('express');
const clienteContorller = require('../controllers/ClienteControler')

const api = express.Router();

api.get('/clientes/:nombres?', clienteContorller.listar);
api.post('/cliente/registrar', clienteContorller.registrar);
api.put('/cliente/editar/:id', clienteContorller.editar);
api.delete('/cliente/eliminar/:id', clienteContorller.eliminar);
api.get('/cliente/:id', clienteContorller.get_cliente)

module.exports = api;