const express = require("express");
const router = express.Router();
const categoriasController = require("../controllers/categoriasController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

//CREAR NUEVO TICKETS
router.post(
  "/",
  auth,
  [
    check("titulo", "El Nombre es Obligatorio").not().isEmpty(),
    check("codigo", "El area es Obligatoria").not().isEmpty(),
    check("descripcion", "El area es Obligatoria").not().isEmpty(),
    check("tipo", "El area es Obligatoria").not().isEmpty(),
    check("usuario", "El usuario es Obligatorio").not().isEmpty(),
    check("area", "El area es Obligatoria").not().isEmpty(),
    check("categoria", "La categoria es Obligatoria").not().isEmpty(),
    check("prioridad", "La prioridad es Obligatoria").not().isEmpty(),
    check("estado", "El estado es Obligatorio").not().isEmpty(),
  ],
  categoriasController.nuevaCategoria
);
