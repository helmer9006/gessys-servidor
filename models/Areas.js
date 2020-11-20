const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const areasSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },
  creacion: {
    type: Date,
    default: Date.now,
  },
  actualizacion: {
    type: Date,
  },
});

module.exports = mongoose.model("Areas", areasSchema);
