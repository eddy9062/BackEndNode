const Cliente = require('../models/cliente');

function registrar(req, res) {
    const data = req.body;

    const cliente = new Cliente();
    cliente.nombres = data.nombres;
    cliente.dpi = data.dpi;
    cliente.correo = data.correo;
    cliente.telefono = data.telefono;

    cliente.save((err, cliente_save) => {
        if (err) {
            res.status(500).send({ error: 'Error en el servidor' });
        } else {
            if (cliente_save) {
                res.status(200).send({ cliente: cliente_save });
            } else {
                res.status(403), send({ message: 'no se pudo registrar el cliente' })
            }
        }
    })
}

function listar(req, res) {
    var titulo = req.params['nombres'];

    Cliente.find({ nombres: new RegExp(titulo, 'i') }, (err, clientes_data) => {
        if (clientes_data) {
            res.status(200).send({ clientes: clientes_data });
        } else {
            res.status(403).send({ message: 'No hay clientes en la bd' });
        }
    })
}

function get_cliente(req, res) {
    var id = req.params['id'];

    Cliente.findById(id, (err, cliente_data) => {
        if (cliente_data) {
            res.status(200).send({ cliente: cliente_data });
        }
    })
}


function editar(req, res) {
    let id = req.params['id'];
    let data = req.body;

    Cliente.findOneAndUpdate(id, { nombres: data.nombres, dni: data.dni, correo: data.correo, telefono: data.telefono }, (err, cliente_edit) => {
        if (cliente_edit) {
            res.status(200).send({ cliente: cliente_edit });
        } else {
            res.status(500).send(err);
        }
    })
}

function eliminar(req, res) {
    let id = req.params['id'];

    Cliente.findByIdAndRemove(id, (err, cliente_delete) => {
        if (cliente_delete) {
            res.status(200).send({ cliente: cliente_delete });
        } else {
            res.status(500).send(err);
        }
    })
}

module.exports = {
    registrar,
    editar,
    eliminar,
    listar,
    get_cliente
}