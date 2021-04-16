const separarCadenas = require("./separarCadenas");
const fs = require("fs");
module.exports = (req, res, next) => {
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
  console.log("nombre", nombreArchivo);
  console.log("req.file", req.filename);
  return next();
};
