const express = require("express");
const router = express.Router();
const nuevosCamposController = require("../controllers/NuevosCamposController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

//CREAR NUEVOS CAMPO
router.post(
  "/",
  auth,
  [
    check("categoria", "La categoria es Obligatorio").not().isEmpty(),
    check("clave", "La clave es Obligatoria").not().isEmpty(),
    check("valor", "el Valor de la para el campo es Obligatorio")
      .not()
      .isEmpty(),
    check("tipoCampo", "El tipo de campo es Obligatorio").not().isEmpty(),
  ],
  nuevosCamposController.nuevoCampo
);

//TRAER TODAS LAS CATEGORIAS
router.get("/:idCategoria", auth, nuevosCamposController.traerNuevosCampos);

module.exports = router;
