const express = require("express");
const router = express.Router();
const HistoInventarioController = require("../controllers/HistoInventarioController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");
const upload = require("../libs/storage");

//CREAR NUEVA HISTORIAL DE INVENTARIO
router.post(
  "/",
  auth,
  upload.single("anexo"),
  [
    check("observacion", "La observacion es Obligatoria").not().isEmpty(),
    check("inventario", "El inventario es Obligatorio").not().isEmpty(),
  ],
  HistoInventarioController.nuevoHistoInventario
);

//TRAER TODAS LAS HISTORIAL DE INVENTARIO POR ID DE INVENTARIO
router.get(
  "/:idInventario",
  auth,
  HistoInventarioController.traerHistoInventario
);

//ACTUALIZAR HISTORIAL DE INVENTARIO
router.put("/", auth, HistoInventarioController.actualizarHistoInventario);

//ELIMINAR HISTORIAL DE INVENTARIO
router.delete(
  "/:idHistoInventario",
  auth,
  HistoInventarioController.eliminarHistoInventario
);

module.exports = router;
