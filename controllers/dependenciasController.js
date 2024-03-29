const Dependencias = require("../models/dependencias");
const { validationResult, body } = require("express-validator");
const moment = require("moment");

//***************CREAR NUEVA DEPENDENCIA***************
const nuevaDependencia = async (req, res) => {
  console.log("POST - CREAR NUEVA DEPENDENCIA");

  //***************MOSTRAR ERRORES DE VALIDACION***************
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //***************CREAR NUEVA DEPENDENCIA***************
  dependencia = new Dependencias(req.body);  
  try {
    await dependencia.save();
    res.json({ msg: "Dependencia Creada Correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

//***************TRAER TODAS LAS DEPENDENCIAS***************
const traerDependencias = async (req, res) => {
  console.log("GET - TRAER TODAS LA DEPENDENCIAS ");
  try {
    const dependencia = await Dependencias.find({});
    res.status(200).json(dependencia);
  } catch (error) {
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

//***************MODIFICAR DEPENDENCIA***************
const actualizarDependencia = (req, res) => {
  console.log("PUT - ACTUALIZAR DEPENDENCIA POR ID");
  const dependencia = req.body;
  const idDependencia = req.body._id;
  dependencia.actualizacion = Date.now();
  try {
    Dependencias.findByIdAndUpdate(
      idDependencia,
      dependencia,
      (error, dependenciaActualizada) => {
        if (error) {
          return res
            .status(500)
            .json({ msg: `Error al actualizar la dependencia:`, error: error });
        }
        if (!dependenciaActualizada) {
          return res
            .status(500)
            .json({ msg: `No se retornó ningún objeto actualizado` });
        }
        return res.status(200).json({
          msg: `Dependencia actualizada correctamente`,
          dependencia: dependenciaActualizada,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

//ELIMINAR DEPENDENCIA
const eliminarDependencia = (req, res) => {
  console.log("DELETE - ELIMINAR DEPENDENCIA POR ID");
  const id = req.params.idDependencia;
  try {
    Dependencias.findByIdAndDelete(id, function (error, doc) {
      if (error) {
        return res
          .status(500)
          .json({ msg: "Ha ocurrido un error", error: error });
      } else {
        if (!doc)
          return res
            .status(500)
            .json({ msg: `No existe la dependencia a eliminar ` });
        return res
          .status(200)
          .json({ msg: `Dependencia eliminada correctamente`, dependencia: doc });
      }
    });
  } catch (error) {
    return res.status(500).json({ msg: "Ha ocurrido un error", error: error });
  }
};

module.exports = {
  nuevaDependencia,
  traerDependencias,
  actualizarDependencia,
  eliminarDependencia,
};
