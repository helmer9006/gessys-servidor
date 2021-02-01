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
    check("descripcion", "El Mensaje es Obligatorio").not().isEmpty(),
    check("ticket", "El Ticket es Obligatoria").not().isEmpty(),
  ],
  mensajesController.crearMensaje
);

//TRAER MENSAJE POR TICKET

router.get("/:idTicket", auth, mensajesController.traerMensajesPorTicket);

module.exports = router;