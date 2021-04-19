const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const upload = require("../libs/storage");
const createFoto = require("../libs/createFoto");

router.post(
  "/",
  // auth,
  createFoto,
  [
    check("nombre", "El Nombre es Obligatorio").not().isEmpty(),
    check("tipoIdentificacion", "El tipo de identificacion es Obligatorio")
      .not()
      .isEmpty(),
    check("identificacion", "El número de identificacion es Obligatorio")
      .not()
      .isEmpty(),
    check("email", "Agrega un email válido").isEmail(),
    check("perfil", "El perfil es Obligatorio").not().isEmpty(),
    check("dependencia", "La dependencia es Obligatorio").not().isEmpty(),
    check(
      "password",
      "El password debe ser de al menos 6 caracteres"
    ).isLength({ min: 6 }),
  ],
  usuarioController.nuevoUsuario
);

//DEVUELVE TODOS LOS USUARIOS
router.get("/", auth, usuarioController.traerUsuario);

//ACTUALIZAR USUARIO POR ID
router.put("/", auth, createFoto, usuarioController.actualizarUsuario);

module.exports = router;
