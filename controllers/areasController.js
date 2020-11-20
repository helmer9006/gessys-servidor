const Areas = require("../models/Areas");
const { validationResult, body } = require("express-validator");

const nuevaArea = async (req, res) => {
  // Mostrar mensajes de error de express validator
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  // Crear una nueva area
  area = new Areas(req.body);
  try {
    await area.save();
    res.json({ msg: "Area Creada Correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

const traerAreas = async (req, res) => {
  try {
    const areas = await Areas.find({});
    res.status(200).json(areas);
  } catch (error) {
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

const actualizarArea = (req, res) => {
  const area = req.body;
  const idArea = req.body._id;
  area.actualizacion = Date.now();
  try {
    Areas.findByIdAndUpdate(idArea, area, (error, areaActualizada) => {
      if (error) {
        return res
          .status(500)
          .json({ msg: `Error al actualizar el Área:`, error: error });
      }
      if (!areaActualizada) {
        return res
          .status(500)
          .json({ msg: `No se retornó ningún objeto actualizado` });
      }
      return res
        .status(200)
        .json({ msg: `Área actualizada correctamente`, area: areaActualizada });
    });
  } catch (error) {
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

const eliminarArea = (req, res) => {
  const id = req.params.idArea;
  try {
    Areas.findByIdAndDelete(id, function (err, doc) {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: `Ha ocurrido un error, ${err} ` });
      } else {
        if (!doc)
          return res
            .status(500)
            .json({ msg: `No existe el documento a eliminar ` });
        return res
          .status(200)
          .json({ msg: `Área eliminada correctamente`, area: doc });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: `Ha ocurrido un error, ${error} ` });
  }
};

module.exports = {
  nuevaArea,
  traerAreas,
  eliminarArea,
  actualizarArea,
};
