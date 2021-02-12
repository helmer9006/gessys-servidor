const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NuevosCamposSchema = new Schema({
  categoria: {
    //categoria a la que pertenece el equipo y accesorio
    type: Schema.Types.ObjectId,
    ref: "Categorias",
    require: true,
  },
  clave: {
    type: String,
    lowercase: true,
    trim: true,
  },
  valor: {
    type: String,
    lowercase: true,
    trim: true,
  },
  tipoCampo: {
    type: String,
    trim: true,
  },
  creacion: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("NuevosCampos", NuevosCamposSchema);
