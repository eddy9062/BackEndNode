const res = require('express/lib/response');
const Bodega = require('../models/bodega');

function registrar(req, res) {
    const data = req.body;
    const bodega = new Bodega();

    bodega.titulo = data.titulo;
    bodega.descripcion = data.descripcion;

    bodega.save((err, bodega_save) => {
        if (err) {
            res.status(500).send({ error: 'Error en el servidor' });
        } else {
            if (bodega_save) {
                res.status(200).send({ bodega: bodega_save });
            } else {
                res.status(403), send({ message: 'no se pudo registrar la bodega' })
            }
        }
    });

}

function obtener_bodega(req, res) {
    const id = req.params['id'];

    Bodega.findById({ _id: id }, (err, bodega_data) => {
        if (err) {
            res.status(500).send({ error: 'Error en el servidor' });
        } else {
            if (bodega_data) {
                res.status(200).send({ bodega: bodega_data });
            } else {
                res.status(403).send({ message: 'La Bodega no fue encontrada' });
            }

        }

    })
}

function editar(req, res) {
    const id = req.params['id'];
    const data = req.body;

    Bodega.findByIdAndUpdate({ _id: id },
        {
            titulo: data.titulo,
            descripcion: data.descripcion
        }, (err, bodega_edit) => {
            if (err) {
                res.status(500).send({ error: 'Error en el servidor' });
            } else {
                if (bodega_edit) {
                    res.status(200).send({ bodega: bodega_edit });
                } else {
                    res.status(403).send({ message: 'La Bodega no pudo actualizar' });
                }
            }
        })

}

function eliminar(req, res) {
    const id = req.params['id'];

    Bodega.findByIdAndRemove({ _id: id }, (err, bodega_eliminada) => {
        if (err) {
            res.status(500).send({ error: 'Error en el servidor' });
        } else {
            if (bodega_eliminada) {
                res.status(200).send({ bodega: bodega_eliminada });
            } else {
                res.status(403).send({ message: 'La Bodega no pudo eliminar' });
            }

        }
    })
}

function listar(req, res) {
    const nombre = req.params['nombre'];

    Bodega.find({ titulo: new RegExp(nombre, 'i') }, (err, bodega_listado) => {
        if (err) {
            res.status(500).send({ error: 'Error en el servidor' });
        } else {
            if (bodega_listado) {
                res.status(200).send({ bodega: bodega_listado });
            } else {
                res.status(403).send({ message: 'No existen bodegas con ese titulo' });
            }
        }


    })
}

module.exports = {
    registrar,
    obtener_bodega,
    editar,
    eliminar,
    listar
}