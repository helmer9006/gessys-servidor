const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const proveedoressSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },
  representanteLegal: {
    type: String,
    uppercase: true,
    trim: true,
  },
  tipoIdentificacion: {
    //tipo documento empresa
    type: String,
    required: true,
    trim: false,
  },
  identificacion: {
    //identificacion de la empresa
    type: String,
    required: true,
    trim: false,
  },
  direccion: {
    //direccion de la empresa
    type: String,
    required: true,
    trim: false,
  },
  telefono: {
    //telefono o celular de contacto de la empresa
    type: Number,
    required: true,
    trim: false,
  },

  email: {
    //correo de contacto
    type: String,
    required: true,
    trim: false,
  },

  creacion: {
    type: Date,
    default: Date.now,
  },
  actualizacion: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Proveedores", proveedoresSchema);
