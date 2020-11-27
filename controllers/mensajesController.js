const Mensajes = require("../models/Mensajes");
const { validationResult, body } = require("express-validator");

//***************CREAR NUEVO MENSAJE***************
const NuevoMensaje = async (req, res) => {
  console.log("POST - CREAR NUEVA CATEGORIA ");

  //***************MOSTRAR ERRORES DE VALIDACION***************
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //***************CREAR NUEVO MENSAJE***************
  mensaje = new Mensajes(req.body);
  console.log("usuario autenticado ", req.usuario);
  try {
    await mensaje.save();
    res.json({ msg: "Mensaje Creado Correctamente" });
    console.log(
      "ultimo mensaje creado",
      coleccion.Find().SetSortOrder(SortBy.Descending("_id")).SetLimit(1)
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

// //***************TRAER MENSAJES POR TICKET***************
// const traerMensajesPorTicket = async (req, res) => {
//   const ticket = req.params.ticket;

//   console.log("GET - TRAER TICKETS POR ESTADO ");
//   try {
//     const ticket = await Tickets.find({ estado: estado });
//     res.status(200).json(ticket);
//   } catch (error) {
//     return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
//   }
// };

module.exports = {
  NuevoMensaje
}