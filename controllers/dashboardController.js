const Mensajes = require("../models/Mensajes");
const Usuarios = require("../models/Usuario");
const Inventarios = require("../models/Inventario");
const Tickets = require("../models/Ticket");

const { validationResult, body } = require("express-validator");

//***************TRAER TODAS LAS DEPENDENCIAS***************
const traerDependencias = async (req, res) => {
  console.log("GET - DATOS ESTADISTICOS DASHBOARD ");
  const idUsuario = req.usuario.id;
  const perfil = req.usuario.perfil;
  const dependencia = req.usuario.dependencia;
  let ticketsNuevos;
  let ticketsProceso;
  let ticketsResueltos;
  let ticketsCancelados;
  let usuarios;
  let mensajes;
  let inventarios;
  let tickets;
  try {
    switch (perfil) {
      case "estandar":
        ticketsNuevos = await Tickets.count({
          estado: "nuevo",
          usuario: idUsuario,
        });
        ticketsProceso = await Tickets.count({
          estado: "proceso",
          usuario: idUsuario,
        });
        ticketsResueltos = await Tickets.count({
          estado: "resuelto",
          usuario: idUsuario,
        });
        ticketsCancelados = await Tickets.count({
          estado: "cancelado",
          usuario: idUsuario,
        });
        usuarios = await Usuarios.count({ dependencia: dependencia });
        mensajes = await Mensajes.count({ usuario: idUsuario });
        inventarios = await Inventarios.count({ responsable: idUsuario });
        tickets = await Tickets.count({ usuario: idUsuario });

        break;
      case "especial":
        ticketsNuevos = await Tickets.count({
          estado: "nuevo",
          dependencia: dependencia,
        });
        ticketsProceso = await Tickets.count({
          estado: "proceso",
          dependencia: dependencia,
        });
        ticketsResueltos = await Tickets.count({
          estado: "resuelto",
          dependencia: dependencia,
        });
        ticketsCancelados = await Tickets.count({
          estado: "cancelado",
          dependencia: dependencia,
        });
        usuarios = await Usuarios.count({ dependencia: dependencia });
        mensajes = await Mensajes.count({ usuario: idUsuario });
        inventarios = await Inventarios.count({ responsable: idUsuario });
        tickets = await Tickets.count({ dependencia: dependencia });

        break;
      case "administrador":
        ticketsNuevos = await Tickets.count({ estado: "nuevo" });
        ticketsProceso = await Tickets.count({ estado: "proceso" });
        ticketsResueltos = await Tickets.count({ estado: "resuelto" });
        ticketsCancelados = await Tickets.count({ estado: "cancelado" });
        usuarios = await Usuarios.count({});
        mensajes = await Mensajes.count({});
        inventarios = await Inventarios.count({});
        tickets = await Tickets.count({});

        break;

      default:
        return res.status(403).json({ msg: `Acceso no autorizado` });
        break;
    }

    const resultado = {
      cantTickets: tickets,
      cantInventarios: inventarios,
      cantMensajes: mensajes,
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
