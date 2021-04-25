const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");

// crear el servidor
const app = express();

// Conectar a la base de datos
conectarDB();

// Habilitar Cors
app.use(cors());

var whitelist = ['https://gessys.netlify.app']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


//app.get('/', cors(corsOptions), (req, res) =>{


// app.use(cors());
// const opcionesCors = {
//   origin: process.env.FRONTEND_URL,
// };
// app.use(cors(opcionesCors));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
//   next();
// });

// Puerto de la app
const port = process.env.PORT || 4000;

// Habilitar leer los valores de un body
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

// Rutas de la app
app.use("/api/usuarios", cors(corsOptions), require("./routes/usuarios"));
app.use("/api/categorias",cors(corsOptions), require("./routes/categorias"));
app.use("/api/dependencias", cors(corsOptions),require("./routes/dependencias"));
app.use("/api/tickets", cors(corsOptions),  require("./routes/tickets"));
app.use("/api/auth", cors(corsOptions), require("./routes/auth"));
app.use("/api/mensajes", cors(corsOptions), require("./routes/mensajes"));
app.use("/api/inventario",cors(corsOptions), require("./routes/inventario"));
app.use("/api/proveedores", cors(corsOptions), require("./routes/proveedores"));
app.use("/api/historial-inventario",cors(corsOptions), require("./routes/HistoInventario"));
app.use("/api/tipo-inventario", cors(corsOptions), require("./routes/tipoInventario"));
app.use("/api/nuevos-campos", cors(corsOptions), require("./routes/nuevosCampos"));
app.use("/api/archivos", cors(corsOptions), require("./routes/archivos"));
app.use("/public", cors(corsOptions), express.static(`${__dirname}/uploads`)); // Habilitar carpeta publica
app.use("/api/dashboard", cors(corsOptions), require("./routes/dashboard"));

// Arrancar la app
app.listen(port, "0.0.0.0", () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});
