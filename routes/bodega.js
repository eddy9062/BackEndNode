const express = require('express');
const bodegaContorller = require('../controllers/BodegaController')

const api = express.Router();

api.post('/bodega/registrar',bodegaContorller.registrar);
api.get('/bodega/:id',bodegaContorller.obtener_bodega);
api.put('/bodega/editar/:id',bodegaContorller.editar);
api.delete('/bodega/eliminar/:id',bodegaContorller.eliminar);
api.get('/bodegas/:nombre?',bodegaContorller.listar);


module.exports = api;