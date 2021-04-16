const separarCadenas = require("./separarCadenas");
const fs = require("fs");
module.exports = (req, res, next) => {
  const anexo = req.body.anexo;

  if (!anexo) {
    return next();
  }
  const espacio = " ";
  const coma = ",";
  //console.log(authHeader)
  const result = separarCadenas(anexo, coma);
  const nombreArchivo = Math.random().toString(36) + `.${result.extension}`;

  //crear archivo

  fs.writeFile(`./uploads/` + nombreArchivo, result.file, "base64", (error) => {
    if (error) console.log(error);
  });
  req.filename = nombreArchivo;
  return next();
};
