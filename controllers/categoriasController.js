const Categorias = require("../models/Categorias");
const { validationResult, body } = require("express-validator");

//***************CREAR NUEVA CATEGORIA***************
const nuevaCategoria = async (req, res) => {
  console.log("POST - CREAR NUEVA CATEGORIA ");

  //***************MOSTRAR ERRORES DE VALIDACION***************
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  //***************CREAR NUEVA CATEGORIA***************
  categoria = new Categorias(req.body);
  try {
    await categoria.save();
    res.json({ msg: "Categoria Creada Correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

//***************TRAER TODAS LAS CATEGORIAS***************
const traerCategorias = async (req, res) => {
  console.log("GET - TRAER TODAS LA CATEGORIAS ");
  try {
    const categorias = await Categorias.find({});
    res.status(200).json(categorias);
  } catch (error) {
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

//***************MODIFICAR CATEGORIA***************
const actualizarCategoria = (req, res) => {
  console.log("PUT - ACTUALIZAR CATEGORIA POR ID");
  const categoria = req.body;
  const idCategoria = req.body._id;
  categoria.actualizacion = Date.now();
  try {
    Categorias.findByIdAndUpdate(
      idCategoria,
      categoria,
      (error, CategoriaActualizada) => {
        if (error) {
          return res
            .status(500)
            .json({ msg: `Error al actualizar la Categoria:`, error: error });
        }
        if (!CategoriaActualizada) {
          return res
            .status(500)
            .json({ msg: `No se retornó ningún objeto actualizado` });
        }
        return res.status(200).json({
          msg: `Categoria actualizada correctamente`,
          categoria: CategoriaActualizada,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

//ELIMINAR CATEGORIA
const eliminarCategoria = (req, res) => {
  console.log("DELETE - ELIMINAR CATEGORIAS POR ID");
  const id = req.params.idCategoria;
  try {
    Categorias.findByIdAndDelete(id, function (err, doc) {
      if (err) {
        return res
          .status(500)
          .json({ msg: "Ha ocurrido un error", error: error });
      } else {
        if (!doc)
          return res
            .status(500)
            .json({ msg: `No existe la categoria a eliminar ` });
        return res
          .status(200)
          .json({ msg: `categoria eliminada correctamente`, categoria: doc });
      }
    });
  } catch (error) {
    return res.status(500).json({ msg: "Ha ocurrido un error", error: error });
  }
};

module.exports = {
  nuevaCategoria,
  traerCategorias,
  actualizarCategoria,
  eliminarCategoria,
};
