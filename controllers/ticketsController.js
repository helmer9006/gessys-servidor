const Tickets = require("../models/Ticket");
const { validationResult, body } = require("express-validator");
const Moment = require('moment');
const mongoose = require("mongoose");
Moment.locale("es"); //idioma español de moment 

//***************CREAR NUEVO TICKET***************
const nuevoTicket = async (req, res) => {
  console.log("POST - CREAR NUEVO TICKET");

  //***************MOSTRAR ERRORES DE VALIDACION***************
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    console.log(errores);
    return res.status(405).json({ errores: errores.array() });
  }

  //***************CREAR NUEVO TICKETS***************

  const nuevoTicket = req.body;
  nuevoTicket.usuario = req.usuario.id;

  //consultar ultimo ticket
  const ultimoTicket = await Tickets.findOne()
    .sort({ field: "asc", _id: -1 })
    .limit(1);

  ultimoTicket === null
    ? (nuevoTicket.codigo = 1)
    : (nuevoTicket.codigo = ultimoTicket.codigo + 1);

  ticket = new Tickets(nuevoTicket);
  try {
    await ticket.save();
    res.json({ msg: "Ticket Creado Correctamente" });
  } catch (error) {
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

//***************TRAER TODOS LOS TICKETS***************
const traerTickets = async (req, res) => {
  console.log("GET - TRAER TODOS LOS TICKETS ");
  const perfil = req.usuario.perfil;
  const dependencia = req.usuario.dependencia;
  const idUsuario = req.usuario.id;
  try {
    if (perfil === "estandar") {
      const ticket = await Tickets.find({
        // estado: { $ne: "cancelado" }, //se habilitará en un futuro cuando se afecte el rendimiento
        usuario: idUsuario,
      })
        .populate({ path: "dependencia", select: "nombre" })
        .populate({ path: "usuario", select: "nombre" })
        .populate({ path: "categoria", select: "nombre" })
        .sort("-_id");
      res.status(200).json(ticket);
    } else if (perfil === "especial") {
      const ticket = await Tickets.find({
        // estado: { $ne: "cancelado" }, //se habilitará en un futuro cuando se afecte el rendimiento
        dependencia: dependencia,
        usuario: idUsuario,
      })
        .populate({ path: "dependencia", select: "nombre" })
        .populate({ path: "usuario", select: "nombre" })
        .populate({ path: "categoria", select: "nombre" })
        .sort("-_id");
      res.status(200).json(ticket);
    } else if (perfil === "administrador") {
      //*****opcion 1 */
      const ticket = await Tickets.find({
        // estado: { $ne: "cancelado" }, //se habilitará en un futuro cuando se afecte el rendimiento
      })
        .populate({ path: "dependencia", select: "nombre" })
        .populate({ path: "usuario", select: "nombre" })
        .populate({ path: "categoria", select: "nombre" })
        .sort("-_id");

      res.status(200).json(ticket);
    } else {
      return res.status(403).json({ msg: `Acceso no autorizado` });
    }
  } catch (error) {
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

//***************TRAER TICKETS POR ESTADO***************
const traerTicketsPorEstado = async (req, res) => {
  console.log("GET - TRAER TICKETS POR ESTADO ");
  const estado = req.params.estado;
  const perfil = req.usuario.perfil;
  const dependencia = req.usuario.dependencia;
  const idUsuario = req.usuario.id;

  try {
    if (perfil === "estandar") {
      const ticket = await Tickets.find({ estado: estado, usuario: idUsuario });
      res.status(200).json(ticket);
    }
    if (perfil === "especial") {
      const ticket = await Tickets.find({
        estado: estado,
        dependencia: dependencia,
      });
      res.status(200).json(ticket);
    }
    if (perfil === "administrador") {
      const ticket = await Tickets.find({
        estado: estado,
      });
      res.status(200).json(ticket);
    }
  } catch (error) {
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

//***************MODIFICAR ESTADO DE TICKETS POR ID***************
const actualizarEstadoPorId = async (req, res) => {
  const id = req.params.idTicket;
  const estadoParm = req.params.estado;

  console.log("GET - MODIFICAR ESTADO DE TICKET POR ID ");
  try {
    const filter = { _id: id }; // parametro para busqueda de registro a modificar
    const update = { estado: estadoParm }; // valor de estado a modificar
    const ticket = await Tickets.findOneAndUpdate(filter, update);
    res.status(200).json(ticket);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

//***************MODIFICAR TICKET***************
const actualizarTicket = (req, res) => {
  console.log("PUT - ACTUALIZAR TICKET POR ID");
  const ticket = req.body;
  const idTicket = req.body._id;
  ticket.actualizacion = Date.now();
  try {
    Tickets.findByIdAndUpdate(idTicket, ticket, (error, ticketActualizado) => {
      if (error) {
        return res
          .status(500)
          .json({ msg: `Error al actualizar la ticket:`, error: error });
      }
      if (!ticketActualizado) {
        return res
          .status(500)
          .json({ msg: `No se retornó ningún objeto actualizado` });
      }
      return res.status(200).json({
        msg: `Ticket actualizado correctamente`,
        ticket: ticketActualizado,
      });
    });
  } catch (error) {
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

//ELIMINAR TICKET
const eliminarTicket = (req, res) => {
  console.log("DELETE - ELIMINAR TICKET POR ID");
  const id = req.params.idTicket;
  try {
    Tickets.findByIdAndDelete(id, function (error, doc) {
      if (error) {
        return res
          .status(500)
          .json({ msg: "Ha ocurrido un error", error: error });
      } else {
        if (!doc)
          return res
            .status(500)
            .json({ msg: `No existe el ticket a eliminar ` });
        return res
          .status(200)
          .json({ msg: `Ticket eliminado correctamente`, regitro: doc });
      }
    });
  } catch (error) {
    return res.status(500).json({ msg: "Ha ocurrido un error", error: error });
  }
};

<<<<<<< HEAD
//***************TRAER TICKETS POR ESTADO - DASHBOARD***************
const traerTicketsPorFecha = async (req, res) => {
  console.log("GET - TRAER TICKETS POR FECHA");
  const perfil = req.usuario.perfil;
  const dependencia = req.usuario.dependencia;
  const idUsuario = req.usuario.id;

  var dt = new Date();
  fechaActual = Moment(dt).format("YYYY-MM-DD");
  fechaActual = Moment(dt).add(1, "days")
  fechaFinal = Moment(dt).subtract(30, "days");
  fechaFinal = fechaFinal.format("YYYY-MM-DD");

  let arrayEstadistica = []

  try {
    if (perfil == "estandar") {
      Tickets.aggregate(
        [
          {
            "$match": {
              "creacion": {
                "$gte": new Date(fechaFinal), "$lt": new Date(fechaActual),
              },
              "usuario": new mongoose.Types.ObjectId(idUsuario),
            }
          },
          {
            "$group": {
              "_id": {
                "año": { "$year": "$creacion" },
                "mes": { "$month": "$creacion" },
                "dia": { "$dayOfMonth": "$creacion" },
              },
              "cantidad": { "$sum": 1 },
            }
          },
          { "$sort": { mes: 1 } }
        ],
        function (err, result) {
          if (err) {
            return res.status(500).json({ msg: "Ha ocurrido un error", error: err });
          }
          result.forEach(element => {
            {
              const fechaFormato = Moment(`${element._id.año}-${element._id.mes}-${element._id.dia}`, 'YYYY-M-D H:mm', 'America/Bogota');
              const cantidad = element.cantidad;
              const fecha = Moment(fechaFormato).utc().format("MMM DD")
              arrayEstadistica.push({ fecha, cantidad })
            }
          });
          arrayEstadistica.sort(function (a, b) {
            if (a.fecha > b.fecha) {
              return 1;
            }
            if (a.fecha < b.fecha) {
              return -1;
            }
            return 0;
          })
          res.status(200).json(arrayEstadistica);
        }
      );
    } else if (perfil === "especial") {
      Tickets.aggregate(
        [
          {
            "$match": {
              "creacion": {
                "$gte": new Date(fechaFinal), "$lt": new Date(fechaActual),
              },
              "dependencia": new mongoose.Types.ObjectId(dependencia),
            }
          },
          {
            "$group": {
              "_id": {
                "año": { "$year": "$creacion" },
                "mes": { "$month": "$creacion" },
                "dia": { "$dayOfMonth": "$creacion" },
              },
              "cantidad": { "$sum": 1 },
            }
          },
          { "$sort": { mes: 1 } }
        ],
        function (err, result) {
          if (err) {
            return res.status(500).json({ msg: "Ha ocurrido un error", error: err });
          }
          console.log(result)
          result.forEach(element => {
            {
              const fechaFormato = Moment(`${element._id.año}-${element._id.mes}-${element._id.dia}`, 'YYYY-M-D H:mm', 'America/Bogota');
              const cantidad = element.cantidad;
              const fecha = Moment(fechaFormato).utc().format("MMM DD")
              arrayEstadistica.push({ fecha, cantidad })
            }
          });
          arrayEstadistica.sort(function (a, b) {
            if (a.fecha > b.fecha) {
              return 1;
            }
            if (a.fecha < b.fecha) {
              return -1;
            }
            // a must be equal to b
            return 0;
          })
          res.status(200).json(arrayEstadistica);
        }
      );
    } else if (perfil === "administrador") {
      Tickets.aggregate(
        [
          {
            "$match": {
              "creacion": {
                "$gte": new Date(fechaFinal), "$lt": new Date(fechaActual),
              },
            }
          },
          {
            "$group": {
              "_id": {
                "año": { "$year": "$creacion" },
                "mes": { "$month": "$creacion" },
                "dia": { "$dayOfMonth": "$creacion" },
              },
              "cantidad": { "$sum": 1 },
            }
          },
          { "$sort": { mes: 1 } }
        ],
        function (err, result) {
          if (err) {
            return res.status(500).json({ msg: "Ha ocurrido un error", error: err });
          }
          console.log(result)
          result.forEach(element => {
            {
              const fechaFormato = Moment(`${element._id.año}-${element._id.mes}-${element._id.dia}`, 'YYYY-M-D H:mm', 'America/Bogota');
              const cantidad = element.cantidad;
              const fecha = Moment(fechaFormato).utc().format("MMM DD")
              arrayEstadistica.push({ fecha, cantidad })
            }
          });
          arrayEstadistica.sort(function (a, b) {
            if (a.fecha > b.fecha) {
              return 1;
            }
            if (a.fecha < b.fecha) {
              return -1;
            }
            // a must be equal to b
            return 0;
          })
          res.status(200).json(arrayEstadistica);
        }
      );
    }
  } catch (error) {
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
}




=======
>>>>>>> 35410010d220ff85b64f79ba4f3d5bed0be1e134
module.exports = {
  nuevoTicket,
  traerTickets,
  traerTicketsPorEstado,
  traerTicketsPorFecha,
  actualizarEstadoPorId,
  actualizarTicket,
  eliminarTicket,
};
