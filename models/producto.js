const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ProducotSchema = Schema({
    titulo: String,
    descripcion: String,
    imagen: String,
    precio_compra: Number,
    precio_venta: Number,
    stock: Number,
    idbodega: { type: Schema.ObjectId, ref: 'bodega' }
});

module.exports = mongoose.model('producto', ProducotSchema);