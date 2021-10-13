const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ClienteSchema = Schema({
    nombres: String,
    dpi: String,
    correo: String,
    telefono: String,
    createAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('cliente', ClienteSchema);