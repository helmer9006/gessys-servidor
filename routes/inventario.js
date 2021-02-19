const express = require("express");
const router = express.Router();
const inventarioController = require("../controllers/inventarioController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");


/*--------------------------------------------------
              CREAR NUEVO INVENTARIO
---------------------------------------------------*/
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

/*--------------------------------------------------
            TRAER TODOS LOS INVENTARIO
 ---------------------------------------------------*/
 router.get("/", auth, inventarioController.traerInventario);


 /*--------------------------------------------------
          TRAER ULTIMO REGISTRO DE INVENTARIO POR CATEGORIA
 ---------------------------------------------------*/
 router.get("/:idCategoria", auth, inventarioController.ultimoRegistroInventario);

  /*--------------------------------------------------
          TRAER REGISTRO DE INVENTARIO POR ID
 ---------------------------------------------------*/
 router.get("/id/:idInventario", auth, inventarioController.traerRegistroInventario);


 /*--------------------------------------------------
        ACTUALIZAR REGISTRO DE INVENTARIO POR ID
 ---------------------------------------------------*/
router.put("/", auth, inventarioController.actualizarInventario);

 /*--------------------------------------------------
        ELIMINAR REGISTRO DE INVENTARIO POR ID
 ---------------------------------------------------*/
 router.delete("/:idInventario", auth, inventarioController.eliminarInventario);


module.exports = router;
