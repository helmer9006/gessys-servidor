const Tickets = require("../models/Ticket");
const { validationResult, body } = require("express-validator");
const Ticket = require("../models/Ticket");

//***************CREAR NUEVO TICKET***************
const nuevoTicket = async (req, res) => {
  console.log("POST - CREAR NUEVO TICKET");

  //***************MOSTRAR ERRORES DE VALIDACION***************
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //***************CREAR NUEVO TICKETS***************
  ticket = new Tickets(req.body);
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
  try {
    const ticket = await Tickets.find({});
    res.status(200).json(ticket);
  } catch (error) {
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

//***************TRAER TICKETS POR ESTADO***************
const traerTicketsPorEstado = async (req, res) => {
  const estado = req.params.estado;

  console.log("GET - TRAER TICKETS POR ESTADO ");
  try {
    const ticket = await Tickets.find({ estado: estado });
    res.status(200).json(ticket);
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
          .json({ msg: `Ticket eliminado correctamente`, area: doc });
      }
    });
  } catch (error) {
    return res.status(500).json({ msg: "Ha ocurrido un error", error: error });
  }
};

module.exports = {
  nuevoTicket,
  traerTickets,
  traerTicketsPorEstado,
  actualizarEstadoPorId,
  actualizarTicket,
  eliminarTicket,
};
