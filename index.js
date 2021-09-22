const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");

// crear el servidor
const app = express();

// Conectar a la base de datos
conectarDB();

// Habilitar Cors
// const opcionesCors = {
//   origin: process.env.FRONTEND_URL,
// };
// app.use(cors(opcionesCors));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Puerto de la app
const port = process.env.PORT || 4000;

// Habilitar leer los valores de un body
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

// Rutas de la app
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/categorias", require("./routes/categorias"));
app.use("/api/dependencias", require("./routes/dependencias"));
app.use("/api/tickets", require("./routes/tickets"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/mensajes", require("./routes/mensajes"));
app.use("/api/inventario", require("./routes/inventario"));
app.use("/api/proveedores", require("./routes/proveedores"));
app.use("/api/historial-inventario", require("./routes/HistoInventario"));
app.use("/api/tipo-inventario", require("./routes/tipoInventario"));
app.use("/api/nuevos-campos", require("./routes/nuevosCampos"));
app.use("/api/archivos", require("./routes/archivos"));
app.use("/public", express.static(`${__dirname}/uploads`)); // Habilitar carpeta publica
app.use("/api/dashboard", require("./routes/dashboard"));

// Arrancar la app
app.listen(port, "0.0.0.0", () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
