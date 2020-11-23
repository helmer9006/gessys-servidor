const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mensajesSchema = new Schema({
  descripcion: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuarios",
  },
  ticket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tickets",
  },
  creacion: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Mensajes", mensajesSchema);
