const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

module.exports = (req, res, next) => {
  console.log('POST - AUTENTICACIÓN')
  const authHeader = req.get("Authorization");
  console.log(authHeader)
  if (authHeader) {
    // Obtener el Token
    const token = authHeader.split(" ")[1];

    // console.log(token)
    if (token) {
      // comprobar el JWT
      console.log('comprobar el JWT')
      try {
        const usuario = jwt.verify(token, process.env.SECRETA);
        req.usuario = usuario;
      } catch (error) {
        console.log('por aca')
        return res
          .status(403)
          .json({ msg: "Acceso no autorizado, JWT no valido o Expirado." });
      }
    } else {
      return res.status(403).json({ msg: "Acceso no autorizado, sin token." });
    }
  } else {
    console.log("Acceso no autorizado")
    return res.status(403).json({ msg: "Acceso no autorizado." });
  }
  return next();
};
