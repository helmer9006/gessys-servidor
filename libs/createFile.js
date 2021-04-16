const separarCadenas = require("./../libs/separarCadenas");
const fs = require("fs");
module.exports = (req, res, next) => {
  // const foto =  req.body.foto;
  // const anexo = req.body.anexo;
  const url = req.body.anexo.url;

  if (!url) {
    return next();
  }
  const espacio = " ";
  const coma = ",";
  //console.log(authHeader)
  const result = separarCadenas(url, coma);
  const nombreArchivo = Math.random().toString(36) + `.${result.extension}`;

  //crear archivo

  fs.writeFile(`./uploads/` + nombreArchivo, result.file, "base64", (error) => {
    if (error) console.log(error);
  });
  req.filename = nombreArchivo;
  return next();
};
