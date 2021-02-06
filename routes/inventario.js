const express = require("express");
const router = express.Router();
const inventarioController = require("../controllers/inventarioController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

//CREAR NUEVO INVENTARIO
router.post(
  "/",
  auth,
  [
    check("titulo", "El Nombre es Obligatorio").not().isEmpty(),
    //check("codigo", "El area es Obligatoria").not().isEmpty(),
    check("descripcion", "El area es Obligatoria").not().isEmpty(),
    check("tipo", "El tipo es Obligatorio").not().isEmpty(),
    check("dependencia", "La dependencia es Obligatoria").not().isEmpty(),
    check("categoria", "La categoria es Obligatoria").not().isEmpty(),
    check("prioridad", "La prioridad es Obligatoria").not().isEmpty(),
  ],
  inventarioController.nuevoTicket
);

// //TRAER TODOS LOS INVENTARIO
// router.get("/", auth, inventarioController.traerTickets);

// //TRAER INVENTARIO POR ESTADO
// router.get("/:estado", auth, inventarioController.traerTicketsPorEstado);

// //ACTUALIZAR ESTADO DE INVENTARIO POR ID
// router.put("/:idTicket/:estado", auth, inventarioController.actualizarEstadoPorId);

// //ACTUALIZAR INVENTARIO POR ID
// router.put("/", auth, inventarioController.actualizarTicket);

// //ELIMINAR TICKET
// router.delete("/:idTicket", auth, inventarioController.eliminarTicket);


module.exports = router;
