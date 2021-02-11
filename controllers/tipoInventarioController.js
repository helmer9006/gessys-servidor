const TipoInvenario = require("../models/tipoInventario");
const { validationResult, body } = require("express-validator");

//***************CREAR NUEVA CATEGORIA***************
const nuevoTipoInventario = async (req, res) => {
  console.log("POST - CREAR NUEVO TIPO INVENTARIO");

  //***************MOSTRAR ERRORES DE VALIDACION***************
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //***************CREAR NUEVO TIPO IVENTARIO***************
  tipoInventario = new TipoInvenario(req.body);
  const perfil = req.usuario.perfil;

  if (perfil === "especial" || perfil === "administrador") {
    try {
      await tipoInventario.save();
      res.json({ msg: "Tipo Inventario Creado Correctamente" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ msg: `Ha ocurrido un error`, error: error });
    }
  } else {
    return res.status(403).json({ msg: "Acceso no permitido." });
  }
};

//#region
//***************TRAER TODOS LOS TIPOS POR DEPENDENCIA***************
const traerTipoInventario = async (req, res) => {
  console.log("GET - TRAER TODOS LOS TIPOS DE INVENTARIO ");
  const dependencia = req.params.idDependencia
  try {
    const tipoInventario = await TipoInvenario.find({dependencia:dependencia})
    .sort("nombre");
    res.status(200).json(tipoInventario);
  } catch (error) {
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

//***************MODIFICAR TIPO INVENTARIO***************
const actualizarTipoInventaro = (req, res) => {
  console.log("PUT - ACTUALIZAR TIPO DE INVENTARIO POR ID");
  const tipoInventario = req.body;
  const idTipoInventario = req.body._id;
  tipoInventario.actualizacion = Date.now();
  try {
    TipoInvenario.findByIdAndUpdate(
      idTipoInventario,
      tipoInventario,
      (error, registroActualizado) => {
        if (error) {
          return res
            .status(500)
            .json({ msg: `Error al actualizar el registro:`, error: error });
        }
        if (!registroActualizado) {
          return res
            .status(500)
            .json({ msg: `No se retornó ningún objeto actualizado` });
        }
        return res.status(200).json({
          msg: `registro actualizado correctamente`,
          tipoInvenario: registroActualizado,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

//ELIMINAR TIPO INVENTARIO
const eliminarTipoInventario = (req, res) => {
  console.log("DELETE - ELIMINAR TIPO INVENTARIO POR ID");
  const id = req.params.idTipo;
  try {
    TipoInvenario.findByIdAndDelete(id, function (err, doc) {
      if (err) {
        return res
          .status(500)
          .json({ msg: "Ha ocurrido un error", error: error });
      } else {
        if (!doc)
          return res
            .status(500)
            .json({ msg: `No existe la registro a eliminar ` });
        return res
          .status(200)
          .json({ msg: `Registro eliminado correctamente`, registro: doc });
      }
    });
  } catch (error) {
    return res.status(500).json({ msg: "Ha ocurrido un error", error: error });
  }
};

//#endregion

module.exports = {
  nuevoTipoInventario,
  traerTipoInventario,
  actualizarTipoInventaro,
  eliminarTipoInventario,
};
