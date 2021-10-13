const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var DetalleVentaSchema = Schema({
    idproducto: { type: Schema.ObjectId, ref: 'producto' },
    precio: Number,
    cantidad: Number,
    idventa: { type: Schema.ObjectId, ref: 'venta' }
});

module.exports = mongoose.model('detalleventa', DetalleVentaSchema);