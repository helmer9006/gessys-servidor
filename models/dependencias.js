const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dependenciasSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },
  descripcion: {
    type: String,
    lowercase: true,
    trim: true,
  },
  soporte: {
    //define si la dependencia ofrece soporte
    type: Boolean,
    required: true,
  },
  creacion: {
    type: Date,
    default: Date.now,
  },
  actualizacion: {
    type: Date,
  },
});

module.exports = mongoose.model("Dependencias", dependenciasSchema);
