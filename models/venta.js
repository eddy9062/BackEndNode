const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var VentaSchema = Schema({
    idcliente: { type: Schema.ObjectId, ref: 'cliente' },
    iduser: { type: Schema.ObjectId, ref: 'user' },
    fecha: { type: String },
    detalleventa: [{
        idproducto: { type: Schema.ObjectId, ref: 'producto' },
        precio: { type: Number },
        cantidad: { type: Number },
    }]
});

module.exports = mongoose.model('venta', VentaSchema);