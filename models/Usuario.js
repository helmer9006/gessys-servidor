const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  dependencia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dependencias",
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  //administrador, estandar, gestor
  perfil: {
    type: String,
    required: true,
    trim: true,
  },
  estado: {
    type: Boolean,
    required: true,
    default: true
  },
  creacion: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Usuarios", usuariosSchema);
