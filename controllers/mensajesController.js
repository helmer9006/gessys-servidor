const Mensajes = require("../models/Mensajes");
const { validationResult, body } = require("express-validator");

//***************CREAR NUEVO MENSAJE***************
const crearMensaje = async (req, res) => {
  console.log("POST - CREAR NUEVA CATEGORIA ");

  //***************MOSTRAR ERRORES DE VALIDACION***************
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { id: idUsuario, perfil } = req.usuario;

  //***************CREAR NUEVO MENSAJE***************
  mensaje = new Mensajes(req.body);
  mensaje.usuario = idUsuario;
  console.log(mensaje);
  try {
    await mensaje.save();
    res.json({ msg: "Mensaje Creado Correctamente." });
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
const traerMensajesPorTicket = async (req, res) => {
  const idTicket = req.params.idTicket;
  console.log("GET - TRAER MENSAJES POR TICKETS ");
  try {
    const mensajes = await Mensajes.find({ ticket: idTicket })
      .populate("usuario")
      .sort("_id");
    res.status(200).json(mensajes);
  } catch (error) {
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

module.exports = {
  crearMensaje,
  traerMensajesPorTicket,
};
