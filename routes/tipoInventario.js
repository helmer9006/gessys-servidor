const express = require("express");
const router = express.Router();
const tipoInventarioController = require("../controllers/tipoInventarioController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

//CREAR NUEVO TIPO INVENTARIO
router.post(
  "/",
  auth,
  [check("nombre", "El Nombre es Obligatorio").not().isEmpty()],
  [check("dependencia", "La dependencia es Obligatoria").not().isEmpty()],
  tipoInventarioController.nuevoTipoInventario
);

//TRAER TODOS LOS TIPOS
router.get(
  "/:idDependencia",
  auth,
  tipoInventarioController.traerTipoInventario
);

//ACTUALIZAR EL TIPO
router.put("/", auth, tipoInventarioController.actualizarTipoInventaro);

//ELIMINAR TIPO
router.delete(
  "/:idTipo",
  auth,
  tipoInventarioController.eliminarTipoInventario
);

module.exports = router;
