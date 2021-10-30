const Empresa = require("../models/Empresa");
const { validationResult } = require("express-validator");

//***************CREAR NUEVO PROVEEDOR***************
const nuevaEmpresa = async (req, res) => {
  console.log("POST - CREAR NUEVO EMPRESA");

  //***************MOSTRAR ERRORES DE VALIDACION***************
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    console.log(errores);
    return res.status(405).json({ errores: errores.array() });
  }

  //***************CREAR NUEVO INVENTARIO***************
  const { perfil, dependencia, id: idUsuario } = req.usuario;

  const nuevaEmpresa = req.body;
  nuevaEmpresa.usuario = req.usuario.id;

  inventario = new Empresa(nuevaEmpresa);
  try {
    if (perfil === "estandar" || perfil === "empleado") {
      return res.status(403).json({ msg: `Acceso no autorizado` });
    }
    await inventario.save();
    res.json({ msg: "Registro de Inventario Creado Correctamente" });
  } catch (error) {
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

//#region
// //***************TRAER LA EMPRESA***************
const traerEmpresa = async (req, res) => {
  console.log("GET - TRAER DATOS EMPRESA");
  const { perfil, dependencia, id: idUsuario } = req.usuario;

  try {
    // const invenario = await Inventario.find();
    if (perfil === "estandar" || perfil === "empleado") {
      return res.status(403).json({ msg: `Acceso no autorizado` });
    }
    const inventario = await Empresa.find({})
      .populate("usuario")
      .sort("-_id");
    res.status(200).json(inventario);
  } catch (error) {
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

module.exports = {
  nuevaEmpresa,
  traerEmpresa,
};
