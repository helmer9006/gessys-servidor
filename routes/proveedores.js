const express = require("express");
const router = express.Router();
const proveedoresController = require("../controllers/proveedoresController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");

//CREAR NUEVO PROVEEDOR
router.post(
  "/",
  auth,
  [
    check("identificacion", "La identificacion es Obligatoria").not().isEmpty(),
    check("nombre", "El nobmre es Obligatorio").not().isEmpty(),
    check("representanteLegal", "El representante es Obligatorio").not().isEmpty(),
    check("tipoIdentificacion", "El tipo de documento es Obligatorio").not().isEmpty(),
  ],
  proveedoresController.nuevoProveedor
);

//TRAER TODOS LOS PROVEEDORES
 router.get("/", auth, proveedoresController.traerProveedores);

 
module.exports = router;
