const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BodegaSchema = Schema({
    titulo: String,
    descripcion: String
});

module.exports = mongoose.model('bodega',BodegaSchema);
