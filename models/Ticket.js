const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketsSchema = new Schema({
  codigo: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  titulo: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  descripcion: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  creacion: {
    type: Date,
    default: Date.now,
  },
  actualizacion: {
    type: Date,
  },
  tipo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tipos",
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuarios",
  },
  area: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Areas",
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categorias",
  },
  prioridad: {
    type: String,
    required: true,
    trim: true,
  },
  estado: {
    type: String,
    required: true,
    trim: true,
  },
  mensaje: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mensajes",
    },
  ],
});

module.exports = mongoose.model("Tickets", ticketsSchema);