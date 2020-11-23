const Tickets = require("../models/Ticket");
const { validationResult, body } = require("express-validator");

//***************CREAR NUEVA CATEGORIA***************
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
    console.log(error);
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};
