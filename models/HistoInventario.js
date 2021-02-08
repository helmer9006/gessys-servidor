const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historialSchema = new Schema({
  observacion: {
    //text area con observacion para el registro del historial
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },
  inventario: {
    //id del registro de inventario
    type: mongoose.Schema.Types.ObjectId,
    ref: "Inventario",
    require: true,
  },
  usuario: {
    //usuario que realiza registro de historial
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuarios",
    require: true,
  },
  anexo: [
    {
      titulo: {
        type: String,
        lowercase: true,
        trim: true,
      },
      url: {
        type: String,
        lowercase: true,
        trim: true,
      },
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

module.exports = mongoose.model("HistoInventario", historialSchema);
