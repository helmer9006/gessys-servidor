const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoriasSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
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

module.exports = mongoose.model("Categorias", categoriasSchema);
