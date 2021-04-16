const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { appConfig } = require("../config");
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
    require: true,
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
    require: true,
  },
  categoria: {
    //categoria a la que pertenece el equipo y accesorio
    type: Schema.Types.ObjectId,
    ref: "Categorias",
    require: true,
  },
  tipoInventario: {
    //tipo de inventario(portatil o all in one, etc)
    type: Schema.Types.ObjectId,
    ref: "TipoInventario",
    require: true,
  },
  proveedor: {
    //proveedor o empresa que vende equipo
    type: Schema.Types.ObjectId,
    ref: "Proveedores",
    require: true,
  },
  observacion: {
    type: String,
    lowercase: true,
    trim: true,
  },
  nuevosCampos: [
    //objeto con nombre y valor del nuevo campo
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
        trim: true,
      },
    },
  ],
  //archivo pdf o word de factura u otro documento
  anexo: { type: String },
  fechaFactura: {
    type: Date,
    require: true,
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
  estado: { type: String, lowercase: true, trim: true },
});

//metodo para guardar automaticamente los archivos
inventarioSchema.methods.setArchivoUrl = function setArchivoUrl(filename) {
  const { host, port } = appConfig;
  this.anexo = `${host}:${port}/public/${filename}`;
};

module.exports = mongoose.model("Inventario", inventarioSchema);
