const express = require("express");
const router = express.Router();
const areasController = require("../controllers/areasController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

router.post(
  "/",
  auth,
  [check("nombre", "El Nombre es Obligatorio").not().isEmpty()],
  areasController.nuevaArea
);

router.get("/", auth, areasController.traerAreas);
router.put("/", auth, areasController.actualizarArea);
router.delete("/:idArea", auth, areasController.eliminarArea);

module.exports = router;
