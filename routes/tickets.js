const express = require("express");
const router = express.Router();
const ticketsController = require("../controllers/ticketsController");
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
    check("tipo", "El tipo es Obligatorio").not().isEmpty(),
    check("usuario", "El usuario es Obligatorio").not().isEmpty(),
    check("dependencia", "La dependencia es Obligatoria").not().isEmpty(),
    check("categoria", "La categoria es Obligatoria").not().isEmpty(),
    check("prioridad", "La prioridad es Obligatoria").not().isEmpty(),
  ],
  ticketsController.nuevoTicket
);

//TRAER TODOS LOS TICKETS
router.get("/", auth, ticketsController.traerTickets);

//TRAER TICKETS POR ESTADO
router.get("/:estado", auth, ticketsController.traerTicketsPorEstado);

//ACTUALIZAR ESTADO DE TICKETS POR ID
router.put("/:idTicket/:estado", auth, ticketsController.actualizarEstadoPorId);

//ACTUALIZAR TICKETS POR ID
router.put("/", auth, ticketsController.actualizarTicket);

//ELIMINAR TICKET
router.delete("/:idTicket", auth, ticketsController.eliminarTicket);


module.exports = router;
