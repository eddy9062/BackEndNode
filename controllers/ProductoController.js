const Producto = require('../models/producto');
const fs = require('fs');
const mongoose = require('mongoose')

var path = require('path');

//https: //www.youtube.com/watch?v=CH_xdXXQZ5w
//https://www.youtube.com/watch?v=szEHxlvEY0U

function parseId(id) {
    return mongoose.Types.ObjectId(id);
}

function registrar(req, res) {

    //console.log(req);
    const data = req.body;

    //console.log(data);

    const producto = new Producto();
    producto.titulo = data.titulo.toUpperCase();
    producto.descripcion = data.descripcion.toUpperCase();
    producto.imagen = null;
    producto.precio_compra = data.precio_compra;
    producto.stock = data.stock;
    producto.idbodega = data.idbodega;

    producto.save((err, producto_save) => {
        if (producto_save) {
            //const det = JSON.parse(data.detproducto);
            const det = data.detproducto;
            console.log(det)
            det.forEach(d => {
                Producto.updateOne({ _id: producto_save._id }, {
                    $push: {
                        detproducto: {
                            descripcion: d.descripcion.toUpperCase(),
                            precio_venta: d.precio_venta,
                            cantidad: d.cantidad
                        }
                    }
                }, (err, det_save) => {
                    if (err) {
                        res.status(403).send({
                            success: false,
                            msj: 'No se pudo grabar el detalle',
                            err
                        })
                    }
                })
            })
            res.status(200).send({ message: "Producto registrado correctmente" });
        } else {
            if (err) {
                res.status(403).send({
                    success: false,
                    msj: 'No se pudo grabar el Producto',
                    err
                })
            }
        }
    })
}

/*
function listar(req, res) {
    var descripcion = req.params['descripcion'];

    //console.log(req);
    console.log(descripcion);

    Producto.find({ descripcion: new RegExp(descripcion, 'i') }).populate('idbodega').exec((err, producto_listado) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' })
        } else {
            if (producto_listado) {
                console.log("------ " + producto_listado)
                res.status(200).send({ productos: producto_listado })
            } else {
                res.status(403).send({ message: 'No existe registros con ese nombre' })
            }
        }
    })
}*/

function listar(req, res) {
    var titulo = req.params['descripcion'];

    // console.log(titulo);

    Producto.find({ titulo: new RegExp(titulo, 'i') }, (err, productos_listado) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else {
            if (productos_listado) {
                res.status(200).send({ productos: productos_listado });
            } else {
                res.status(403).send({ message: 'No hay ningun registro con ese titulo' });
            }
        }
    })
}

/*function listar(req, res) {
    var titulo = req.params['descripcion'];

    // console.log(titulo);

    Producto.find({ titulo: new RegExp(titulo, 'i') }).populate('idbodega').exec((err, productos_listado) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' });
        } else {
            if (productos_listado) {
                res.status(200).send({ productos: productos_listado });
            } else {
                res.status(403).send({ message: 'No hay ningun registro con ese titulo' });
            }
        }
    });
}*/
function editar(req, res) {
    const data = req.body;
    const id = req.params['id'];

    console.log(data);

    Producto.findByIdAndUpdate({ _id: id }, {
        $set: data
    }, (err, info) => {
        if (err) {
            console.log(err);
            res.status(403).send({
                success: false,
                msj: 'No se pudo grabar el detalle',
                err
            })
        } else {
            console.log(info);
            res.status(200).send({ message: "Producto registrado correctmente" });
        }
    })
}
/*
function editar(req, res) {
    const data = req.body;
    const id = req.params['id'];

    //console.log(req);
    console.log(data);

    Producto.findByIdAndUpdate({ _id: id }, {
        titulo: data.titulo,
        descripcion: data.descripcion,
        precio_compra: data.precio_compra,
        idbodega: data.idbodega,
        stock: data.stock
    }, (err, producto_edit) => {
        if (producto_edit) {
            //const det = JSON.parse(data.detproducto);
            const det = data.detproducto;
            console.log(det)
            det.forEach(d => {
                Producto.detproducto.update({ _id: parseId(producto_edit.detproducto._id) }, {
                    descripcion: d.descripcion,
                    precio_venta: d.precio_venta,
                    cantidad: d.cantidad
                }, (err) => {
                    if (err) {
                        res.status(403).send({
                            success: false,
                            msj: 'No se pudo grabar el detalle',
                            err
                        })
                    }
                })
            })
            res.status(200).send({ message: "Producto registrado correctmente" });
        } else {
            if (err) {
                res.status(403).send({
                    success: false,
                    msj: 'No se pudo grabar el Producto',
                    err
                })
            }
        }
    })
}*/




/*if (err) {
    res.status(500).send({ message: 'Error en el servidor' })
} else {
    if (producto_edit) {
        res.status(200).send({ producto: producto_edit })
    } else {
        res.status(403).send({ message: 'No se pudo editar el producto' })
    }
}*/
/*
function editar(req, res) {
    const data = req.body;
    const id = req.params['id'];
    const img = req.params['img']

    //console.log(req);
    //    console.log(data);

    if (req.files.imagen) {
        // esto se encarga de eliminar la imagen anterior antes de agregar la nueva
        if (img || img != null || img != undefined) {
            fs.unlink('./uploads/productos/' + img, (err) => {
                if (err) throw err;
            });
        }


        const imagen_path = req.files.imagen.path;
        const name = imagen_path.split('\\');
        const imagen_name = name[2];

        Producto.findByIdAndUpdate({ _id: id }, {
            titulo: data.titulo,
            descripcion: data.descripcion,
            imagen: imagen_name,
            precio_compra: data.precio_compra,
            precio_venta: data.precio_venta,
            idbodega: data.idbodega,
            stock: data.stock
        }, (err, producto_edit) => {
            if (err) {
                res.status(500).send({ message: 'Error en el servidor' })
            } else {
                if (producto_edit) {
                    res.status(200).send({ producto: producto_edit })
                } else {
                    res.status(403).send({ message: 'No se pudo editar el producto' })
                }
            }
        })
    } else {
        Producto.findByIdAndUpdate({ _id: id }, {
            titulo: data.titulo,
            descripcion: data.descripcion,
            precio_compra: data.precio_compra,
            precio_venta: data.precio_venta,
            idbodega: data.idbodega,
            stock: data.stock
        }, (err, producto_edit) => {
            if (err) {
                res.status(500).send({ message: 'Error en el servidor' })
            } else {
                if (producto_edit) {
                    res.status(200).send({ producto: producto_edit })
                } else {
                    res.status(403).send({ message: 'No se pudo editar el producto' })
                }
            }
        })
    }
}*/

function obtener_producto(req, res) {
    const id = req.params['id'];

    Producto.findById({ _id: id }, (err, producto_data) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' })
        } else {
            if (producto_data) {
                res.status(200).send({ producto: producto_data })
            } else {
                res.status(403).send({ message: 'No se encontro el producto' })
            }

        }
    })
}

function eliminar(req, res) {
    const id = req.params['id'];

    Producto.findByIdAndRemove({ _id: id }, (err, producto_delete) => {
        if (err) {
            res.status(500).send({ message: 'Error en el servidor' })
        } else {
            if (producto_delete) {
                if (producto_delete.imagen != null) {
                    fs.unlink('./uploads/productos/' + producto_delete.imagen, (err) => {
                        if (err) throw err;
                    });
                }
                res.status(200).send({ producto: producto_delete })
            } else {
                res.status(403).send({ message: 'No se encontro el producto' })
            }
        }
    })
}

function update_stock(req, res) {
    let id = req.params['id'];
    let data = req.body;

    Producto.findById(id, (err, producto_data) => {
        if (producto_data) {
            Producto.findByIdAndUpdate(id, { stock: parseInt(producto_data.stock) + parseInt(data.stock) }, (err, producto_edit) => {
                if (producto_edit) {
                    res.status(200).send({ producto: producto_edit });
                }
            })
        } else {
            res.status(500).send(err);
        }
    })
}

function get_img(req, res) {
    const img = req.params['img'];
    //console.log(img);
    if (img != "null") {
        const path_img = './uploads/productos/' + img;
        res.status(200).sendFile(path.resolve(path_img));
    } else {
        const path_img = './uploads/productos/default.jpg';
        res.status(200).sendFile(path.resolve(path_img));
    }
}


module.exports = {
    registrar,
    listar,
    editar,
    obtener_producto,
    eliminar,
    update_stock,
    get_img
}