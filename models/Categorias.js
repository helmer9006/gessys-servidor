const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoriasSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  creacion: {
    type: Date(),
    default: new Date(),
    required: true,
    trim: true,
  },
  area: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Areas",
  },
});

module.exports = mongoose.model("Categorias", categoriasSchema);
