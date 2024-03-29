const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { appConfig } = require("../config");

const historialSchema = new Schema({
  observacion: {
    //text area con observacion para el registro del historial
    type: String,
    required: true,
    uppercase: true,
    trim: true,
    unique: false,
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
        unique: false,
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

//metodo para guardar automaticamente los archivos
historialSchema.methods.setArchivoUrl = function setArchivoUrl(filename) {
  const { host, port } = appConfig;
  this.anexo[0].url = `${host}:${port}/public/${filename}`;
};

module.exports = mongoose.model("HistoInventario", historialSchema);
