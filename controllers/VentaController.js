const Venta = require('../models/venta');
const Producto = require('../models/producto')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function parseId(id) {
    return mongoose.Types.ObjectId(id);
}

//const mongoose = require('mongoose');

function registrar(req, res) {
    const data = req.body;
    const venta = new Venta();


    venta.fecha = data.fecha
    venta.idcliente = data.idcliente;
    venta.iduser = data.iduser;

    //console.log(data)

    venta.save((err, venta_save) => {
        if (venta_save) {
            //const det = JSON.parse(data.detalleventa);
            const det = data.detalleventa;
            var detprod = [];
            var result = [];


            //console.log(det)
            det.forEach((d) => {
                //console.log(parseInt(d.cantidad * d.cantref))
                //this.contidad += parseInt(d.cantidad * d.cantref)
                //await 
                Venta.updateOne({ _id: venta_save._id }, {
                    $push: {
                        detalleventa: {
                            idproducto: d._id,
                            idDetProd: d.idDetProd,
                            precio: d.precio_venta,
                            cantidad: d.cantidad
                        }
                    }
                }, (err, det_save) => {
                    // console.log(err)
                    if (det_save) {
                        /* Producto.findById({ _id: d._id }, (err, producto_data) => {
                            if (producto_data) {
                                Producto.findByIdAndUpdate({ _id: producto_data._id }, {
                                    $set: { stock: parseInt(producto_data.stock) - parseInt(d.cantidad * d.cantref) }
                                }, (err, producto_edit) => {
                                    if (producto_edit) {
                                        console.log('prod ', producto_data._id, " ", d.idDetProd, "  ", producto_data.stock, "  ", producto_edit.stock)
                                    } else {
                                        console.log('err prod ' + err)
                                        res.end;
                                    }

                                });
                            } else {
                                res.send(err);
                            }
                        });
                    } else {
                        res.status(403).send({
                            success: false,
                            msj: 'No se pudo grabar el detalle',
                            err
                        })*/
                        res.end;
                    }
                })
            })

            detprod = det.reduce((anterior, actual) => {
                let clave = actual._id
                if (!anterior[clave]) {
                    anterior[clave] = {
                        Id: actual._id,
                        cantidad: 0
                    }
                    result.push(anterior[clave])
                }
                anterior[clave].cantidad += actual.cantidad * actual.cantref
                return anterior
            }, {})

            /* detprod = det.reduce(function(anterior, actual) {
                 if (!anterior[actual._id]) {
                     anterior[actual._id] = { Id: actual._id, cantidad: 0 };
                     result.push(anterior[actual._id])
                 }
                 anterior[actual._id].cantidad += actual.cantidad * actual.cantref;
                 return anterior;
             }, {});*/

            // console.log(Object.values(detprod))
            Object.values(detprod).forEach((p) => {
                Producto.findById({ _id: p.Id }, (err, producto_data) => {
                    if (producto_data) {
                        Producto.findByIdAndUpdate({ _id: producto_data._id }, {
                            $set: { stock: parseInt(producto_data.stock) - parseInt(p.cantidad) }
                        }, (err, producto_edit) => {
                            if (producto_edit) {
                                res.end;
                            } else {
                                res.send(err);
                            }
                        });
                    } else {
                        res.send(err);
                    }
                })
            })
            res.status(200).send({ message: "Venta registrada correctmente" });
        } else {
            console.log("Errro ", err);
            res.send(err);
        }
    })
}
/*
       Venta.update({ _id: venta_save._id }), {
                    $push: {
                        detalleventa: {
                            idproducto: element._id,
                            precio: element.precio_venta,
                            cantidad: element.cantidad
                        }
                    }
                }, (err) => {
                    if (err) {
                        console.log(err)
                        res.send(err);
                    }
                }
*/


/*function registrar(req, res) {
    const data = req.body;
    const venta = new Venta();
    venta.fecha = data.fecha
    venta.idcliente = data.idcliente;
    venta.iduser = data.iduser;

    //    console.log(data)

    venta.save((err, venta_save) => {
        if (venta_save) {
            const detalles = data.detalles;

            detalles.forEach((element, index) => {
                const detalleventa = new DetalleVenta();
                detalleventa.idproducto = element._id;
                detalleventa.precio = element.precio_venta;
                detalleventa.cantidad = element.cantidad;
                detalleventa.idventa = venta_save._id;

                detalleventa.save((err, detalle_save) => {
                    if (detalle_save) {
                        Producto.findById({ _id: element._id }, (err, producto_data) => {
                            if (producto_data) {
                                Producto.findByIdAndUpdate({ _id: producto_data._id }, { stock: parseInt(producto_data.stock) - parseInt(element.cantidad) }, (err, producto_edit) => {
                                    res.status(200).send({ message: "Venta registrada correctmente" });
                                    //res.end;
                                });
                            } else {
                                res.send(err);
                            }
                        });
                    } else {
                        res.send(err);
                    }
                });
            });
        } else {
            res.send(err);
        }
    })
}*/

/*
function datos_venta(req, res) {
    const idUser = req.params['idUser'];

    Venta.find({ iduser: idUser }, (err, data_venta) => {
        if (data_venta) {
            data_venta.forEach((element, index) => {
                console.log(element._id)
                DetalleVenta.find({ idventa: element._id }, (err, data_detalle) => {
                    if (data_detalle) {
                        const ventas = {
                            ...data_venta[index],
                            data_detalle
                        }

                    } else {
                        res.status(403).send({ 'error': 'No se encontraron datos' })
                    }
                });
            })
        } else {
            res.status(200).send({
                data: {
                    ventas
                }
            })
        }
    })
}*/
/*
function listadoVenta(req, res) {
    const idUser = req.params['idUser'];
    ventas = [];
    Venta.find({ iduser: idUser }, (err, data_venta) => {
        if (data_venta) {
            data_venta.forEach((element, index) => {
                //console.log(element._id)
                DetalleVenta.find({ idventa: element._id }, (err, data_detalle) => {
                    if (data_detalle) {

                        data_venta.push(data_detalle),


                            console.log(data_venta);
                    } else {
                        res.status(403).send({ 'error': 'No se encontraron datos' })
                    }
                });
            })
            res.status(200).send({
                data_venta
            })
        } else {

        }
    })
}

*/
/*
function listadoVenta(req, res) {
    const idUser = req.params['idUser'];
    const pfecha = req.params['fecha'];

    Venta.find({ iduser: idUser, fecha: pfecha }).populate('iduser').exec((err, data_venta) => {
        if (data_venta) {
            res.status(200).send({ data_venta });
        } else {
            res.status(404).send({ message: 'No hay registro de ventas' });
        }
    });
}*/



function listadoVenta(req, res) {
    const idUser = mongoose.Types.ObjectId(req.params['idUser']);
    const pfecha = req.params['fecha'];
    //console.log(idUser)
    //console.log(pfecha)

    Venta.aggregate([
        { $match: { iduser: idUser, fecha: pfecha } },
        { $unwind: "$detalleventa" },
        {
            $lookup: {
                from: 'productos',
                localField: 'detalleventa.idproducto',
                foreignField: '_id',
                as: 'prod'
            },
        },
        { $unwind: "$prod" },
        {
            $lookup: {
                from: 'bodegas',
                localField: 'prod.idbodega',
                foreignField: '_id',
                as: 'bodega'
            },
        },
        { $unwind: "$bodega" },
        { $group: { _id: { iduser: '$iduser', fecha: '$fecha', bodega: '$bodega.titulo' }, total: { $sum: { $multiply: ["$detalleventa.precio", "$detalleventa.cantidad"] } } } },
    ]).exec((err, data_venta) => {
        if (data_venta) {
            res.status(200).send({ data_venta });
        } else {
            res.status(404).send({ message: 'No hay registro de ventas' });
        }
    });
}

function listadoVentaDia(req, res) {
    //const idUser = mongoose.Types.ObjectId(req.params['idUser']);
    const pfecha = req.params['fecha'];

    Venta.aggregate([
        { $match: { fecha: pfecha } },
        { $unwind: "$detalleventa" },
        {
            $lookup: {
                from: 'productos',
                localField: 'detalleventa.idproducto',
                foreignField: '_id',
                as: 'prod'
            },
        },
        { $unwind: "$prod" },
        {
            $lookup: {
                from: 'bodegas',
                localField: 'prod.idbodega',
                foreignField: '_id',
                as: 'bodega'
            },
        },
        { $unwind: "$bodega" },
        { $group: { _id: { fecha: '$fecha', bodega: '$bodega.titulo' }, total: { $sum: { $multiply: ["$detalleventa.precio", "$detalleventa.cantidad"] } } } },
    ]).exec((err, data_venta) => {
        if (data_venta) {
            res.status(200).send({ data_venta });
        } else {
            res.status(404).send({ message: 'No hay registro de ventas' });
        }
    });
}



/*
function listadoVenta(req, res) {
    const id = req.params['idUser'];
    DetalleVenta.find({}).populate('idventa').exec((err, data_venta) => {
        if (data_venta) {

            //res.status(200).send({ ventas: data_venta });

            //console.log(data_venta.find(resp => resp.cantidad == 1))
            //console.log(data_venta.filter(resp => resp.idventa.iduser(id)))
            //const data = data_venta => data_venta.idventa.iduser == id;
            //console.log(data)
               res.status(200).send({ ventas: data_venta.find(resp => resp.idventa.iduser === id) });

        } else {
            res.status(404).send({ message: 'No hay registro de ventas' });
        }
    });
}*/



/*
function totalVenta(req, res) {
    const idUser = req.params['idUser'];
    const pfecha = req.params['fecha'];
    //console.log(idUser);

    Venta.find({ iduser: idUser, fecha: pfecha }, (err, data_venta) => {
        //var valor = 0;
        if (data_venta) {
            data_venta.forEach((element, index) => {
                //ventas = data_venta[index];
                valor = DetalleVenta.aggregate([{
                        $match: { idventa: element._id }
                    },
                    {
                        $group: {
                            _id: "$idventa",
                            total: {
                                $sum: { $multiply: ["$precio", "$cantidad"] }
                            }
                        }
                    }
                ]).exec((err, data_detalle) => {
                    return data_detalle;
                });

            });
            res.status(200).send({ valor })
        } else {
            res.status(403).send({ message: 'No Existen datos de ventas' })
        }
    })
}
*/



/* .aggregate([{
         $match: { idventa: ObjectId("6154cde4454183ea7de9192a") }
     },
     {
         $group: {
             _id: "$idventa",
             TotalSum: {
                 $sum: { $multiply: ["$precio", "$cantidad"] }
             }
         }
     }
 ]);*/

/* esta bueno
function listadoVenta(req, res) {
    const idUser = req.params['idUser'];
    //console.log(idUser);
    Venta.find({ iduser: idUser }, (err, data_venta) => {
        if (data_venta) {
            console.log(data_venta)
            data_venta.forEach((element, index) => {
                    DetalleVenta.find({ idventa: element._id }, (err, data_detalle) => {
                        if (data_detalle) {
                            console.log(data_detalle);
                        } else {
                            console.log('error 403')
                            res.status(403).send({ 'error': 'No se encontraron detalle' })
                        }
                    })
                })
                //console.log(mongoose.Types.ObjectId(data_venta._id))

            //            console.log(data_venta.keys(['_id']).value);

            // res.status(200).send({ ventas: data_venta });
        } else {
            res.status(404).send({ message: 'No hay registro de ventas' });
        }
    });
}*/


const pipeline = [{
    '$march': {
        idventa: "6154cde4454183ea7de9192a"
    },
    "$group": {
        idventa: "$idventa",
        "Total": {
            $sum: { $multiply: ["$precio", "$cantidad"] }
        }
    }
}];

/*function listadoVenta(req, res) {
    const idUser = req.params['idUser'];
    DetalleVenta.aggregate([
        { $match: { idventa: "6153623461cb85a574da7ea9" } },
        {
            $group: {
                _id: '$idventa',
                Total: {
                    $sum: { $multiply: ["$precio", "$cantidad"] }
                }
            }
        }
    ]).exec((err, data_venta) => {
        console.log(data_venta);
    })
}*/

/*function listadoVenta(req, res) {
    const idUser = req.params['idUser'];
    DetalleVenta.aggregate([
        { $match: { iduser: idUser } },
        {
            $group: {
                _id: '$idventa',
                Total: {
                    $sum: { $multiply: ["$precio", "$cantidad"] }
                }
            }
        }
    ]).exec((err, data_venta) => {
        console.log(data_venta);
    })
}*/

/*function listadoVenta(req, res) {
    const idUser = req.params['idUser'];
    DetalleVenta.aggregate([
        { $match: { iduser: idUser } },
        {
            $group: {
                _id: '$idventa',
                Total: {
                    $sum: { $multiply: ["$precio", "$cantidad"] }
                }
            }
        },
        {
            $lookup: {
                from: 'venta',
                localField: 'fecha',
                foreignField: 'id',
                as: 'idventa'
            }
        },
        {
            $unwind: '$venta'
        }
    ]).exec((err, data_venta) => {
        console.log(data_venta);
    })
}*/






/*function detalleVentas(req, res) {
    var id = req.params['id'];
    //console.log(id);
    DetalleVenta.find({ idventa: id }, (err, data_detalle) => {
        if (data_detalle) {
            res.status(200).send({ detalles: data_detalle });
        } else {
            res.status(404).send({ message: 'No hay registro de detalle de venta' });
        }
    })
1};*/
/*
function detalleVentas(req, res) {
    var id = req.params['id'];

    DetalleVenta.find({ idventa: id }).populate('idproducto').exec((err, data_detalle) => {
        if (data_detalle) {
            res.status(200).send({ detalles: data_detalle });
        } else {
            res.status(404).send({ message: "No hay ningun registro de venta" });
            console.log(err);
        }
    });
}*/
//bueno ejempleo de agregacion
//https://www.adictosaltrabajo.com/2013/12/16/mongodb-agregatte/

module.exports = {
    registrar,
    //datos_venta,
    listadoVenta,
    listadoVentaDia,
    //detalleVentas,
    //totalVenta
}