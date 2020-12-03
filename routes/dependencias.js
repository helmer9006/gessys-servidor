const express = require("express");
const router = express.Router();
const dependenciasController = require("../controllers/dependenciasController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

//CREAR DEPENDENCIA
router.post(
  "/",
  auth,
  [
    check("nombre", "Nombre es obligatorio").not().isEmpty(),
    check("soporte", "Se defe definir si el usuario brindará soporte")
      .not()
      .isEmpty(),
  ],
  dependenciasController.nuevaDependencia
);

//TRAER TODAS LAS DEPENDENCIAS
router.get("/", auth, dependenciasController.traerDependencias);

//ACTUALIZAR DEPENDENCIA
router.put("/", auth, dependenciasController.actualizarDependencia);

//ELIMINAR DEPENDENCIA
router.delete(
  "/:idDependencia",
  auth,
  dependenciasController.eliminarDependencia
);

module.exports = router;
