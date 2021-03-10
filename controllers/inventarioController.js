const Inventario = require("../models/Inventario");
const NuevosCampos = require("../models/NuevosCampos");
const { validationResult, body } = require("express-validator");

//#region CREAR
/*--------------------------------------------------
              CREAR NUEVO INVENTARIO
---------------------------------------------------*/
const nuevoInventario = async (req, res) => {
  console.log("POST - CREAR NUEVO INVENTARIO");

  /*--------------------------------------------------
          MOSTRAR ERRORES DE VALIDACION
---------------------------------------------------*/
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    console.log(errores);
    return res.status(405).json({ errores: errores.array() });
  }
  const { id: idusuario, dependencia, perfil } = req.usuario;

  const nuevoInventario = req.body;
  nuevoInventario.usuario = idusuario;
  nuevoInventario.estado = "por asignar";
  const { nuevosCampos, categoria } = req.body;
  guardarNuevosCampos(nuevosCampos, categoria);
  inventario = new Inventario(nuevoInventario);
  if (perfil === "especial" || perfil === "administrador") {
    try {
      await inventario.save();
      res.json({ msg: "Registro de Inventario Creado Correctamente" });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: `Ha ocurrido un error`, error: error });
    }
  } else {
    return res.status(403).json({ msg: `Acceso no autorizado` });
  }
};

//#endregion

//#region TRAER ULTIMO REGISTRO POR CATEGORIA

/*-----------------------------------------------------------
      TRAER ULTIMO REGISTRO DE INVENTARIO CREADO X CATEGORIA
-------------------------------------------------------------*/

const ultimoRegistroInventario = async (req, res) => {
  console.log("POST - TRAER ULTIMO REGISTRO DE INVENTARIO POR CATEGORIA");
  try {
    const categoria = req.params.idCategoria;
    const reg = await Inventario.findOne({}, { codigo: 1 })
      .sort({ field: "asc", _id: -1 })
      .limit(1);
    res.status(200).json(reg);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

//#endregion

//#region TRAER REGISTRO POR ID INVENTARIO

/*-----------------------------------------------------------
      TRAER  REGISTRO DE INVENTARIO X ID
-------------------------------------------------------------*/

const traerRegistroInventario = async (req, res) => {
  console.log("POST - TRAER  REGISTRO DE INVENTARIO POR ID INVENTARIO");
  try {
    const idInventario = req.params.idInventario;
    const reg = await Inventario.findOne({ _id: idInventario }).limit(1);
    res.status(200).json(reg);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

//#endregion

//#region TRAER TODOS LOS REGISTROS

/*-----------------------------------------------------------
           TRAER TODOS LOS REGISTROS DE INVENTARIO
-------------------------------------------------------------*/

const traerInventario = async (req, res) => {
  console.log("GET - TRAER TODOS LOS REGISTROS DE INVENTARIO ");
  const { perfil, dependencia, id: idUsuario } = req.usuario;

  try {
    // const invenario = await Inventario.find();
    if (perfil === "especial") {
      const inventario = await Inventario.find({ dependencia: dependencia })
        .populate("dependencia")
        .populate("categoria")
        .populate("usuario")
        .populate("responsable")
        .populate("Proveedores")
        .sort("-_id");
      res.status(200).json(inventario);
    } else if (perfil === "administrador") {
      const inventario = await Inventario.find({})
        .populate("dependencia")
        .populate("categoria")
        .populate("usuario")
        .populate("responsable")
        .populate("proveedor")
        .populate("tipoInventario")
        .sort("-_id");
      res.status(200).json(inventario);
    } else {
      return res.status(403).json({ msg: `Acceso no autorizado` });
    }
  } catch (error) {
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

//#endregion

//#region TRAER TODOS LOS REGISTROS

/*----------------------------------------------------------------------
  TRAER REGISTROS DE INVENTARIO POR CATEGORIA Y POR USUARIO RESPONSABLE
-----------------------------------------------------------------------*/

const traerInventarioPorCategoria = async (req, res) => {
  console.log(
    "GET - TRAER REGISTROS DE INVENTARIO POR CATEGORIA Y POR USUARIO RESPONSABLE"
  );
  const { perfil, dependencia, id: idUsuario } = req.usuario;
  const idCategoria = req.params.idCategoria;

  try {
    if (perfil === "estandar") {
      const inventario = await Inventario.find({
        responsable: idUsuario,
        categoria: idCategoria,
        estado: "asignado",
      })
        // .populate("dependencia")
        // .populate("categoria")
        // .populate("usuario")
        // .populate("responsable")
        // .populate("Proveedores")
        .sort("-_id");
      res.status(200).json(inventario);
    } else if (perfil === "especial") {
      const inventario = await Inventario.find({
        categoria: idCategoria,
        estado: "asignado",
      })
        // .populate("dependencia")
        // .populate("categoria")
        // .populate("usuario")
        // .populate("responsable")
        // .populate("Proveedores")
        .sort("-_id");
      res.status(200).json(inventario);
    } else if (perfil === "administrador") {
      const inventario = await Inventario.find({
        categoria: idCategoria,
        estado: "asignado",
      })
        // .populate("dependencia")
        // .populate("categoria")
        // .populate("usuario")
        // .populate("responsable")
        // .populate("proveedor")
        // .populate("tipoInventario")
        .sort("-_id");
      res.status(200).json(inventario);
    } else {
      return res.status(403).json({ msg: `Acceso no autorizado` });
    }
  } catch (error) {
    return res.status(500).json({ msg: `Ha ocurrido un error`, error: error });
  }
};

//#endregion

//#region MODIFICAR

/*-----------------------------------------------------------
             MODIFICAR  REGISTRO DE INVENTARIO POR ID
-------------------------------------------------------------*/

const actualizarInventario = (req, res) => {
  console.log("PUT - ACTUALIZAR REGISTRO DE INVENTARIO POR ID");
  const inventario = req.body;
  const idInventario = req.body._id;
  inventario.actualizacion = Date.now();
  const perfil = req.usuario.perfil;

  if (perfil === "administrador") {
    try {
      Inventario.findByIdAndUpdate(
        idInventario,
        inventario,
        (error, inventarioActualizado) => {
          if (error) {
            return res.status(500).json({
              msg: `Error al actualizar el registro de  inventario:`,
              error: error,
            });
          }
          if (!inventarioActualizado) {
            return res
              .status(500)
              .json({ msg: `No se retornó ningún objeto actualizado` });
          }
          return res.status(200).json({
            msg: `Registro de Inventario actualizado correctamente`,
            inventario: inventarioActualizado,
          });
        }
      );
    } catch (error) {
      return res
        .status(500)
        .json({ msg: `Ha ocurrido un error`, error: error });
    }
  } else {
    return res.status(403).json({ msg: `Acceso no autorizado` });
  }
};
//#endregion

//#region ELIMINAR

/*-----------------------------------------------------------
             ELIMINAR REGISTRO DE INVENTARIO POR ID
-------------------------------------------------------------*/

const eliminarInventario = (req, res) => {
  console.log("DELETE - ELIMINAR INVENTARIO POR ID");
  const perfil = req.usuario.perfil;
  const id = req.params.idInventario;

  if (perfil === "administrador") {
    try {
      Inventario.findByIdAndDelete(id, function (error, doc) {
        if (error) {
          return res
            .status(500)
            .json({ msg: "Ha ocurrido un error", error: error });
        } else {
          if (!doc)
            return res
              .status(404)
              .json({ msg: `No existe el registro a eliminar ` });
          return res.status(200).json({
            msg: `Registro de inventario eliminado correctamente`,
            regitro: doc,
          });
        }
      });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Ha ocurrido un error", error: error });
    }
  } else {
    return res.status(403).json({ msg: `Acceso no autorizado` });
  }
};

const guardarNuevosCampos = async (nuevosCampos, categoria) => {
  const campos = await NuevosCampos.find({ categoria: categoria }).sort("-_id");
  const diferente = [];

  nuevosCampos.map((item) => {
    let isdiferente = false;
    campos.map((elemento) => {
      if (elemento.clave === item.clave) {
        isdiferente = true;
      }
    });
    if (!isdiferente) {
      diferente.push(item);
    }
  });
  //si existen campos diferentes guardardos en diccionarios nuevosCampos
  if (diferente.length > 0) {
    diferente.map(async (element) => {
      console.log("POST - CREAR NUEVOS CAMPOS ");
      element.categoria = categoria;
      registro = new NuevosCampos(element);
      try {
        await registro.save();
      } catch (error) {
        console.log(error);
        return { msg: `Ha ocurrido un error`, error: error };
      }
    });
  }
};

//#endregion

module.exports = {
  nuevoInventario,
  ultimoRegistroInventario,
  traerInventario,
  actualizarInventario,
  eliminarInventario,
  traerRegistroInventario,
  traerInventarioPorCategoria,
};
