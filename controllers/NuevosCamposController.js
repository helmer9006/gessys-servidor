const nuevoCampos = require("../models/NuevosCampos");
const { validationResult, body } = require("express-validator");

//***************CREAR NUEVOS CAMPOS***************
const nuevoCampo = async (req, res) => {
  console.log("POST - CREAR NUEVOS CAMPOS ");

  //***************MOSTRAR ERRORES DE VALIDACION***************
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //***************CREAR NUEVOS CAMPOS***************
  registro = new nuevoCampos(req.body);
  try {
    await registro.save();
    res.json({ msg: "Nuevo Campo Creado Correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

//***************TRAER TODAS LAS CATEGORIAS***************
const traerNuevosCampos = async (req, res) => {
  console.log("GET - TRAER TODOS LOS CAMPOS POR CATEGORIA ");
  const idCategoria = req.params.idCategoria;
  try {
    const reg = await nuevoCampos.find({ categoria: idCategoria });
    res.status(200).json(reg);
  } catch (error) {
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

module.exports = {
  nuevoCampo,
  traerNuevosCampos,
};
