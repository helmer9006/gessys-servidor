const Inventario = require("../models/Inventario");
const { validationResult, body } = require("express-validator");

//***************CREAR NUEVO INVENTARIO***************
const nuevoInventario = async (req, res) => {
  console.log("POST - CREAR NUEVO INVENTARIO");

  //***************MOSTRAR ERRORES DE VALIDACION***************
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    console.log(errores);
    return res.status(405).json({ errores: errores.array() });
  }

  //***************CREAR NUEVO INVENTARIO***************

  const nuevoInventario = req.body;
  nuevoInventario.usuario = req.usuario.id;
  nuevoInventario.dependencia = req.usuario.dependencia;
  //consultar ultimo registro

  inventario = new Inventario(nuevoInventario);
  try {
    await inventario.save();
    res.json({ msg: "Registro de Inventario Creado Correctamente" });
  } catch (error) {
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

//****************TRAER ULTIMO REGISTRO DE INVENTARIO CREADO***********/

const ultimoRegistroInventario = async (req, res) => {
  try {
    const reg = await Inventario.findOne()
      .sort({ field: "asc", _id: -1 })
      .limit(1);
    res.status(200).json(reg);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

//#region
// //***************TRAER TODOS LOS INVENTARIO***************
const traerInventario = async (req, res) => {
  console.log("GET - TRAER TODOS LOS REGISTROS DE INVENTARIO ");
  const { perfil, dependencia, id:idUsuario } = req.usuario;

  try {
    // const invenario = await Inventario.find();
    if (perfil === "especial") {
      const inventario = await Inventario.find({ dependencia: dependencia })
        .populate("dependencia")
        .populate("categoria")
        .populate("usuario")
        .populate("responsable")
        .populate("Proveedores")
        .sort("-_id");
      res.status(200).json(inventario);
    } else if (perfil === "administrador") {
      const inventario = await Inventario.find({})
        .populate("dependencia")
        .populate("categoria")
        .populate("usuario")
        .populate("responsable")
        .populate("proveedor")
        .sort("-_id");
      res.status(200).json(inventario);
    } else {
      return res.status(403).json({ msg: `Acceso no autorizado` });
    }
  } catch (error) {
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

// //***************TRAER INVENTARIO POR ESTADO***************
// const traerTicketsPorEstado = async (req, res) => {
//   console.log("GET - TRAER TICKETS POR ESTADO ");
//   const estado = req.params.estado;
//   const perfil = req.usuario.perfil;
//   const dependencia = req.usuario.dependencia;
//   const idUsuario = req.usuario.id;

//   try {
//     if (perfil === "estandar") {
//       const ticket = await Inventario.find({ estado: estado, usuario: idUsuario });
//       res.status(200).json(ticket);
//     }
//     if (perfil === "especial") {
//       const ticket = await Inventario.find({
//         estado: estado,
//         dependencia: dependencia,
//       });
//       res.status(200).json(ticket);
//     }
//     if (perfil === "administrador") {
//       const ticket = await Inventario.find({
//         estado: estado,
//       });
//       res.status(200).json(ticket);
//     }
//   } catch (error) {
//     return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
//   }
// };

// //***************MODIFICAR ESTADO DE INVENTARIO POR ID***************
// const actualizarEstadoPorId = async (req, res) => {
//   const id = req.params.idTicket;
//   const estadoParm = req.params.estado;

//   console.log("GET - MODIFICAR ESTADO DE TICKET POR ID ");
//   try {
//     const filter = { _id: id }; // parametro para busqueda de registro a modificar
//     const update = { estado: estadoParm }; // valor de estado a modificar
//     const ticket = await Inventario.findOneAndUpdate(filter, update);
//     res.status(200).json(ticket);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
//   }
// };

// //***************MODIFICAR INVENTARIO***************
// const actualizarTicket = (req, res) => {
//   console.log("PUT - ACTUALIZAR TICKET POR ID");
//   const ticket = req.body;
//   const idTicket = req.body._id;
//   ticket.actualizacion = Date.now();
//   try {
//     Inventario.findByIdAndUpdate(idTicket, ticket, (error, ticketActualizado) => {
//       if (error) {
//         return res
//           .status(500)
//           .json({ msg: `Error al actualizar la ticket:`, error: error });
//       }
//       if (!ticketActualizado) {
//         return res
//           .status(500)
//           .json({ msg: `No se retornó ningún objeto actualizado` });
//       }
//       return res.status(200).json({
//         msg: `Ticket actualizado correctamente`,
//         ticket: ticketActualizado,
//       });
//     });
//   } catch (error) {
//     return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
//   }
// };

// //ELIMINAR INVENTARIO
// const eliminarTicket = (req, res) => {
//   console.log("DELETE - ELIMINAR TICKET POR ID");
//   const id = req.params.idTicket;
//   try {
//     Inventario.findByIdAndDelete(id, function (error, doc) {
//       if (error) {
//         return res
//           .status(500)
//           .json({ msg: "Ha ocurrido un error", error: error });
//       } else {
//         if (!doc)
//           return res
//             .status(500)
//             .json({ msg: `No existe el ticket a eliminar ` });
//         return res
//           .status(200)
//           .json({ msg: `Ticket eliminado correctamente`, area: doc });
//       }
//     });
//   } catch (error) {
//     return res.status(500).json({ msg: "Ha ocurrido un error", error: error });
//   }
// };

// const ultimoTicket = async () => {
//   try {
//     const ultimo = await Tickets.find().sort({ $codigo: -1 }).limit(1);
//     console.log(ultimo);
//   } catch (error) {
//     console.log(error);
//     return;
//   }
// };

//#endregion

module.exports = {
  nuevoInventario,
  ultimoRegistroInventario,
  traerInventario,
  // traerTickets,
  // traerTicketsPorEstado,
  // actualizarEstadoPorId,
  // actualizarTicket,
  // eliminarTicket,
};
