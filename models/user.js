const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = Schema({
    nombre: String,
    usuario: String,
    password: String,
    role: String,
});

module.exports = mongoose.model('user', UserSchema);