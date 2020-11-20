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
  area: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Areas",
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

module.exports = mongoose.model("Categorias", categoriasSchema);
