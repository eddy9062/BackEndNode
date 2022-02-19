const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ProducotSchema = Schema({
    titulo: String,
    descripcion: String,
    precio_compra: Number,
    stock: Number,
    idbodega: { type: Schema.ObjectId, ref: 'bodega' },
    detproducto: [{
        descripcion: { type: String },
        precio_venta: { type: Number },
        cantidad: { type: Number },
    }]
});

module.exports = mongoose.model('producto', ProducotSchema);