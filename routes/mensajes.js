const express = require("express");
const router = express.Router();
const mensajesController = require("../controllers/mensajesController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

//CREAR NUEVO MENSAJE
router.post(
  "/",
  auth,
  [
    check("descripcion", "El Nombre es Obligatorio").not().isEmpty(),
    check("usuario", "El area es Obligatoria").not().isEmpty(),
    check("ticket", "El area es Obligatoria").not().isEmpty(),
  ],
  mensajesController.NuevoMensaje
);

//TRAER MENSAJE POR TICKET


module.exports = router;