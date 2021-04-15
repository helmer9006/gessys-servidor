const Dependencias = require("../models/dependencias");
const Usuarios = require("../models/Usuario");
const Inventarios = require("../models/Inventario");
const Tickets = require("../models/Ticket");

const { validationResult, body } = require("express-validator");

//***************TRAER TODAS LAS DEPENDENCIAS***************
const traerDependencias = async (req, res) => {
  console.log("GET - DATOS ESTADISTICOS DASHBOARD ");
  try {
    const ticketsNuevos = await Tickets.count({ estado: "nuevo" });
    const ticketsProceso = await Tickets.count({ estado: "proceso" });
    const ticketsResueltos = await Tickets.count({
      estado: "resuelto",
    });
    const ticketsCancelados = await Tickets.count({ estado: "cancelado" });

    const usuarios = await Usuarios.count({});
    const dependencias = await Dependencias.count({});
    const inventarios = await Inventarios.count({});
    const tickets = await Tickets.count({});

    const resultado = {
      cantTickets: tickets,
      cantInventarios: inventarios,
      cantDependencias: dependencias,
      cantUsuarios: usuarios,
      ticketsNuevos: ticketsNuevos,
      ticketsProceso: ticketsProceso,
      ticketsResueltos: ticketsResueltos,
      ticketsCancelados: ticketsCancelados,
    };

    res.status(200).json(resultado);
  } catch (error) {
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

module.exports = {
  traerDependencias,
};
