const HistoInventario = require("../models/HistoInventario");
const { validationResult } = require("express-validator");

//***************CREAR NUEVO REGISTRO DE HISTORIAL DE INVENTARIO***************
const nuevoHistoInventario = async (req, res) => {
  console.log("POST - CREAR NUEVO REGISTRO DE HISTORIAL DE INVENTARIO ");

  //***************MOSTRAR ERRORES DE VALIDACION***************
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //***************CREAR NUEVO HISTORIAL***************
  const { anexo } = req.body;

  historial = new HistoInventario(req.body);
 console.log("req",req.filename)
  if (anexo.url !== "") {
    console.log("validacion");
    historial.setArchivoUrl(req.filename);
  }

  const perfil = req.usuario.perfil;
  historial.usuario = req.usuario.id;
  if (perfil === "especial" || perfil === "administrador") {
    try {
      await historial.save();
      res.json({ msg: "Registo  Historial Inventario Creado Correctamente" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ msg: `Ha ocurrido un error`, error: error });
    }
  } else {
    return res.status(403).json({ msg: `Acceso no autorizado` });
  }
};

//***************TRAER TODOS LOS REGISTROS DE HISTORIAL DE INVENTARIO***************

const traerHistoInventario = async (req, res) => {
  console.log("GET - TRAER TODOS LOS REGISTROS DE HISTORIAL DE INVENTARIO");
  const id = req.params.idInventario;
  try {
    const historial = await HistoInventario.find({ inventario: id })
      .populate("inventario")
      .populate("usuario")
      .sort("-_id");
    res.status(200).json(historial);
  } catch (error) {
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

//***************MODIFICAR HISTORIAL DE INVENTARIO POR ID***************
const actualizarHistoInventario = (req, res) => {
  console.log("PUT - HISTORIAL DE INVENTARIO POR ID");
  const registro = req.body;
  const id = req.body._id;
  const perfil = req.usuario.perfil;
  registro.actualizacion = Date.now();
  if (perfil === "especial" || perfil === "administrador") {
    try {
      HistoInventario.findByIdAndUpdate(
        id,
        registro,
        (error, registroActualizado) => {
          if (error) {
            return res
              .status(500)
              .json({ msg: `Error al actualizar registro:`, error: error });
          }
          if (!registroActualizado) {
            return res
              .status(500)
              .json({ msg: `No se retornó ningún objeto actualizado` });
          }
          return res.status(200).json({
            msg: `Registro actualizado correctamente`,
            categoria: registroActualizado,
          });
        }
      );
    } catch (error) {
      return res
        .status(500)
        .json({ msg: `Ha ocurrido un error`, error: error });
    }
  } else {
    return res.status(403).json({ msg: "Acceso no Autorizado" });
  }
};

//ELIMINAR HISTORIAL DE INVENTARIO POR ID
const eliminarHistoInventario = (req, res) => {
  console.log("DELETE - ELIMINAR HISTORIAL DE INVENTARIO POR ID");
  const id = req.params.idHistoInventario;
  try {
    HistoInventario.findByIdAndDelete(id, function (err, reg) {
      if (err) {
        return res
          .status(500)
          .json({ msg: "Ha ocurrido un error", error: error });
      } else {
        if (!reg)
          return res
            .status(500)
            .json({ msg: `No existe el registro a eliminar ` });
        return res
          .status(200)
          .json({ msg: `Registro eliminado correctamente`, registro: reg });
      }
    });
  } catch (error) {
    return res.status(500).json({ msg: "Ha ocurrido un error", error: error });
  }
};

module.exports = {
  nuevoHistoInventario,
  traerHistoInventario,
  actualizarHistoInventario,
  eliminarHistoInventario,
};
