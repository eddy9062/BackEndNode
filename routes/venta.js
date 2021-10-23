const express = require('express');
const ventaContorller = require('../controllers/VentaController')

const api = express.Router();

api.post('/venta/registrar', ventaContorller.registrar);
//api.get('/venta/:id', ventaContorller.datos_venta);
api.get('/ventas/:idUser/:fecha', ventaContorller.listadoVenta);
api.get('/ventas_dia/:fecha', ventaContorller.listadoVentaDia);
//api.get('/totventas/:idUser/:fecha', ventaContorller.totalVenta);
//api.get('/venta/data/:id', ventaContorller.detalleVentas);

module.exports = api;