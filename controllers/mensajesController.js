const Mensajes = require("../models/Mensajes");
const { validationResult, body } = require("express-validator");

//***************CREAR NUEVO MENSAJE***************
const nuevaCategoria = async (req, res) => {
  console.log("POST - CREAR NUEVA CATEGORIA ");

  //***************MOSTRAR ERRORES DE VALIDACION***************
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //***************CREAR NUEVO MENSAJE***************
  mensaje = new Mensajes(req.body);
  try {
    await mensaje.save();
    res.json({ msg: "Mensaje Creado Correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};
