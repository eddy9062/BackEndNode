const express = require('express');
const productoContorller = require('../controllers/ProductoController')
const multipart = require('connect-multiparty');
const path = multipart({ uploadDir: './uploads/productos' });



const api = express.Router();

api.post('/producto/registrar', path, productoContorller.registrar);
api.get('/productos/:descripcion?', productoContorller.listar);
//api.put('/producto/editar/:id/:img?', path, productoContorller.editar);
api.post('/producto/editar/:id', productoContorller.editar);
api.get('/producto/:id', productoContorller.obtener_producto);
api.delete('/producto/:id', productoContorller.eliminar);
api.put('/producto/stock/:id', productoContorller.update_stock);
api.get('/producto/img/:img', productoContorller.get_img);

/*api.get('/producto/:id',productoContorller.obtener_bodega);
api.put('/producto/editar/:id',productoContorller.editar);
api.delete('/producto/eliminar/:id',productoContorller.eliminar);
api.get('/producto/:nombre?',productoContorller.listar);*/


module.exports = api;