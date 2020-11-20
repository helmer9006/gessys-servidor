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
  creacion: {
    type: Date,  
  },
  actualizacion: {
    type: Date,
  },
});

module.exports = mongoose.model("Dependencias", dependenciasSchema);
