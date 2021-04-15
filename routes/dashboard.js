const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const { check } = require("express-validator");
const auth = require("../middleware/auth");


//TRAER DATOS ESTADISTICOS PARA DASHBOARD
router.get("/", auth, dashboardController.traerDependencias);

module.exports = router; 
