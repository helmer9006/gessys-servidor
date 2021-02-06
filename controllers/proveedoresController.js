const Proveedores = require("../models/Proveedores");
const { validationResult } = require("express-validator");

//***************CREAR NUEVO PROVEEDOR***************
const nuevoProveedor = async (req, res) => {
  console.log("POST - CREAR NUEVO PROVEEDOR");

  //***************MOSTRAR ERRORES DE VALIDACION***************
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    console.log(errores);
    return res.status(405).json({ errores: errores.array() });
  }

  //***************CREAR NUEVO INVENTARIO***************
  const { perfil, dependencia, id: idUsuario } = req.usuario;

  const nuevoProveedor = req.body;
  nuevoProveedor.usuario = req.usuario.id;
  nuevoProveedor.dependencia = req.usuario.dependencia;
  //consultar ultimo registro

  inventario = new Proveedores(nuevoProveedor);
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
// //***************TRAER TODOS LOS PROVEEDORES***************
const traerProveedores = async (req, res) => {
  console.log("GET - TRAER TODOS LOS PROVEEDORES");
  const { perfil, dependencia, id: idUsuario } = req.usuario;

  try {
    // const invenario = await Inventario.find();
    if (perfil === "estandar" || perfil === "empleado") {
      return res.status(403).json({ msg: `Acceso no autorizado` });
    }
    const inventario = await Proveedores.find({})
      .populate("usuario")
      .sort("-_id");
    res.status(200).json(inventario);
  } catch (error) {
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

module.exports = {
  nuevoProveedor,
  traerProveedores,
};
