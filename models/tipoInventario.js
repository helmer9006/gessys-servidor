const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tipoInventarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  dependencia: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dependencias",
  },
  creacion: {
    type: Date,
    default: Date.now,
  },
  actualizacion: {
    type: Date
  },
});

module.exports = mongoose.model("TipoInventario", tipoInventarioSchema);
