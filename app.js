const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 4201;


const app = express();
//ROUTES
const user_routes = require('./routes/user')
const bodega_routes = require('./routes/bodega')
const producto_routes = require('./routes/producto')
const cliente_routes = require('./routes/cliente')
const venta_routes = require('./routes/venta')

mongoose.connect('mongodb://127.0.0.1:27017/sistemaDB', { useUnifiedTopology: true, useNewUrlParser: true }, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('Corriendo servidor');
        app.listen(port, function() {
            console.log("Servidor conectado " + port);

        })

    }
});




app.use(bodyparser.urlencoded({ extended: true })); //datos codificados en la url
app.use(bodyparser.json());

app.use((req, res, next) => {
    res.header('Content-Type: application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api', user_routes);
app.use('/api', bodega_routes);
app.use('/api', producto_routes);
app.use('/api', cliente_routes);
app.use('/api', venta_routes);

module.exports = app;