const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventarioSchema = new Schema({
  codigo: {
    //codigo para identificar el equipo, accesorio u herramienta, tres inicial de la categoria relacionada seguido de numero incremental de 4 digitos ejemplo: TEL-0001
    type: String,
    required: true,
    unique: true,
    trim: true,
    default: 1,
  },
  marca: {
    //marca del equipo o accesorio
    type: String,
    uppercase: true,
    trim: true,
  },
  modelo: {
    //modelo del equipo o accesorio
    type: String,
    lowercase: true,
    trim: true,
  },
  serial: {
    //Serial del equipo o accesorio
    type: String,
    lowercase: true,
    trim: true,
  },
  responsable: {
    //usuario responsable(diccionario usuarios)
    type: Schema.Types.ObjectId,
    ref: "Usuarios",
  },
  piso: {
    type: String,
    lowercase: true,
    trim: true,
  },
  dependencia: {
    //dependencia que crea el ticket
    type: Schema.Types.ObjectId,
    ref: "Dependencias",
  },
  categoria: {
    //categoria a la que pertenece el equipo y accesorio
    type: Schema.Types.ObjectId,
    ref: "Categorias",
  },
  proveedor: {
    //proveedor o empresa que vende equipo
    type: Schema.Types.ObjectId,
    ref: "Proveedores",
  },
  observacion: {
    type: String,
    lowercase: true,
    trim: true,
  },
  nuevosCampos: [
    {
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
        lowercase: true,
        trim: true,
      },
    },
  ],
  //archivo pdf o word de factura u otro documento
  anexo: { type: String },
  fechaFactura: {
    type: Date,
  },
  usuario: {
    //usuario que realiza el registro(diccionario usuarios)
    type: Schema.Types.ObjectId,
    ref: "Usuarios",
  },
  creacion: {
    type: Date,
    default: Date.now,
  },
  actualizacion: {
    type: Date,
  },
});

module.exports = mongoose.model("Inventario", inventarioSchema);
