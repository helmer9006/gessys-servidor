const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketsSchema = new Schema({
  codigo: {
    //codigo para identificar el ticket, tres inicial de la dependencia a quien se solicita seguido de numero autoincremental
    type: Number,
    //required: true,
    unique: true,
    trim: true,
    default: 1,
  },
  titulo: {
    //descripcion corta de la solicitud
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  descripcion: {
    //descripcion general o amplia de la solicitud
    type: String,
    // required: true,
    lowercase: true,
    trim: true,
  },
  tipo: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuarios",
  },
  dependencia: {
    //dependencia a la que se dirige el ticket
    type: Schema.Types.ObjectId,
    ref: "Dependencias",
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Categorias",
  },
  prioridad: {
    //alta, media, baja
    type: String,
    required: true,
    trim: true,
  },
  estado: { // nuevo, proceso, resuelto, cancelado
    type: String,
    required: true,
    trim: true,
    default: 'nuevo'
  },
  mensaje: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mensajes",
    },
  ],
  creacion: {
    type: Date,
    default: Date.now,
  },
  actualizacion: {
    type: Date,
  },
});

module.exports = mongoose.model("Tickets", ticketsSchema);
