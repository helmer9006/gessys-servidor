const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mensajesSchema = new Schema({
  descripcion: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuarios",
  },
  ticket: {
    type: Schema.Types.ObjectId,
    ref: "Tickets",
  },
  creacion: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Mensajes", mensajesSchema);
