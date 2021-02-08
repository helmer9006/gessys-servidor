const Inventario = require("../models/Inventario");
const { validationResult, body } = require("express-validator");

//#region CREAR

/*--------------------------------------------------
              CREAR NUEVO INVENTARIO
---------------------------------------------------*/
const nuevoInventario = async (req, res) => {
  console.log("POST - CREAR NUEVO INVENTARIO");

  /*--------------------------------------------------
          MOSTRAR ERRORES DE VALIDACION
---------------------------------------------------*/
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    console.log(errores);
    return res.status(405).json({ errores: errores.array() });
  }
  const { id: idusuario, dependencia, perfil } = req.usuario;

  const nuevoInventario = req.body;
  nuevoInventario.usuario = idusuario;
  nuevoInventario.dependencia = dependencia;


  inventario = new Inventario(nuevoInventario);
  if (perfil === "especial" || perfil === "administrador") {
    try {
      await inventario.save();
      res.json({ msg: "Registro de Inventario Creado Correctamente" });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: `Ha ocurrido un error`, error: error });
    }
  } else {
    return res.status(403).json({ msg: `Acceso no autorizado` });
  }
};

//#endregion

//#region TRAER ULTIMO

/*-----------------------------------------------------------
      TRAER ULTIMO REGISTRO DE INVENTARIO CREADO X CATEGORIA
-------------------------------------------------------------*/

const ultimoRegistroInventario = async (req, res) => {
  console.log("POST - TRAER ULTIMO REGISTRO DE INVENTARIO POR CATEGORIA");
  try {
    const categoria = req.params.idCategoria;
    const reg = await Inventario.findOne({ categoria: categoria }).limit(1);
    res.status(200).json(reg);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

//#endregion

//#region TRAER

/*-----------------------------------------------------------
           TRAER TODOS LOS REGISTROS DE INVENTARIO
-------------------------------------------------------------*/

const traerInventario = async (req, res) => {
  console.log("GET - TRAER TODOS LOS REGISTROS DE INVENTARIO ");
  const { perfil, dependencia, id: idUsuario } = req.usuario;

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

//#endregion

//#region MODIFICAR

/*-----------------------------------------------------------
             MODIFICAR  REGISTRO DE INVENTARIO POR ID
-------------------------------------------------------------*/

const actualizarInventario = (req, res) => {
  console.log("PUT - ACTUALIZAR REGISTRO DE INVENTARIO POR ID");
  const inventario = req.body;
  const idInventario = req.body._id;
  inventario.actualizacion = Date.now();
  const perfil = req.usuario.perfil;

  if (perfil === "administrador") {
    try {
      Inventario.findByIdAndUpdate(
        idInventario,
        inventario,
        (error, inventarioActualizado) => {
          if (error) {
            return res.status(500).json({
              msg: `Error al actualizar el registro de  inventario:`,
              error: error,
            });
          }
          if (!inventarioActualizado) {
            return res
              .status(500)
              .json({ msg: `No se retornó ningún objeto actualizado` });
          }
          return res.status(200).json({
            msg: `Registro de Inventario actualizado correctamente`,
            inventario: inventarioActualizado,
          });
        }
      );
    } catch (error) {
      return res
        .status(500)
        .json({ msg: `Ha ocurrido un error`, error: error });
    }
  } else {
    return res.status(403).json({ msg: `Acceso no autorizado` });
  }
};
//#endregion

//#region ELIMINAR

/*-----------------------------------------------------------
             ELIMINAR REGISTRO DE INVENTARIO POR ID
-------------------------------------------------------------*/

const eliminarInventario = (req, res) => {
  console.log("DELETE - ELIMINAR INVENTARIO POR ID");
  const perfil = req.usuario.perfil;
  const id = req.params.idInventario;

  if (perfil === "administrador") {
    try {
      Inventario.findByIdAndDelete(id, function (error, doc) {
        if (error) {
          return res
            .status(500)
            .json({ msg: "Ha ocurrido un error", error: error });
        } else {
          if (!doc)
            return res
              .status(404)
              .json({ msg: `No existe el registro a eliminar ` });
          return res.status(200).json({
            msg: `Registro de inventario eliminado correctamente`,
            regitro: doc,
          });
        }
      });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Ha ocurrido un error", error: error });
    }
  } else {
    return res.status(403).json({ msg: `Acceso no autorizado` });
  }
};

//#endregion

module.exports = {
  nuevoInventario,
  ultimoRegistroInventario,
  traerInventario,
  actualizarInventario,
  eliminarInventario,
};
