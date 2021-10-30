const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const empresaSchema = new Schema({
  razonsocial: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },
  tipoIdentificacion: {
    //tipo documento empresa
    type: String,
    required: true,
    trim: false,
  },
  representanteLegal: {
    type: String,
    uppercase: true,
    trim: true,
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
  logo: {
    //correo de contacto
    type: String,
    required: true,
    trim: false,
  },
  usuario: {
    //usauiro que realiza registro
    type: Schema.Types.ObjectId,
    ref: "Usuarios",
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

module.exports = mongoose.model("Empresa", empresaSchema);
