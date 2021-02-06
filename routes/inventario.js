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
    check("codigo", "El codigo es Obligatorio").not().isEmpty(),
    check("piso", "El piso es Obligatorio").not().isEmpty(),
    check("categoria", "La categoria es Obligatoria").not().isEmpty(),
    check("proveedor", "El proveedor es Obligatorio").not().isEmpty(),
    check("fechaFactura", "La fecha de la factura es Obligatoria").not().isEmpty(),
    check("responsable", "El responsable es Obligatorio").not().isEmpty(),
  ],
  inventarioController.nuevoInventario
);

//TRAER TODOS LOS INVENTARIO
 router.get("/", auth, inventarioController.traerInventario);

// //TRAER INVENTARIO POR ESTADO
// router.get("/:estado", auth, inventarioController.traerTicketsPorEstado);

// //ACTUALIZAR ESTADO DE INVENTARIO POR ID
// router.put("/:idTicket/:estado", auth, inventarioController.actualizarEstadoPorId);

// //ACTUALIZAR INVENTARIO POR ID
// router.put("/", auth, inventarioController.actualizarTicket);

// //ELIMINAR TICKET
// router.delete("/:idTicket", auth, inventarioController.eliminarTicket);


module.exports = router;
