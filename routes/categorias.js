const express = require("express");
const router = express.Router();
const categoriasController = require("../controllers/categoriasController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

//CREAR NUEVA CATEGORIA
router.post(
  "/",
  auth,
  [
    check("nombre", "El Nombre es Obligatorio").not().isEmpty(),
    check("dependencia", "El area es Obligatoria").not().isEmpty(),
    check("soporte", "Se defe definir si el usuario brindará soporte").not().isEmpty(),
  ],
  categoriasController.nuevaCategoria
);

//TRAER TODAS LAS CATEGORIAS
router.get("/", auth, categoriasController.traerCategorias);

//ACTUALIZAR CATEGORIA
router.put("/", auth, categoriasController.actualizarCategoria);

//ELIMINAR CATEGORIA
router.delete("/:idCategoria", auth, categoriasController.eliminarCategoria);

module.exports = router;