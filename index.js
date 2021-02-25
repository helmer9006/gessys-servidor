const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// crear el servidor
const app = express();


// Conectar a la base de datos
conectarDB();

// Habilitar Cors
const opcionesCors = {
    origin: process.env.FRONTEND_URL
}
app.use( cors(opcionesCors) );

// Puerto de la app
const port = process.env.PORT || 4000;

// Habilitar leer los valores de un body
app.use( express.json() );

// Habilitar carpeta publica
app.use( express.static('uploads') );


// Rutas de la app
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/categorias', require('./routes/categorias'));
app.use('/api/dependencias', require('./routes/dependencias'));
app.use('/api/tickets', require('./routes/tickets'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/mensajes', require('./routes/mensajes'));
app.use('/api/inventario', require('./routes/inventario'));
app.use('/api/proveedores', require('./routes/proveedores'));
app.use('/api/historial-inventario', require('./routes/HistoInventario'));
app.use('/api/tipo-inventario', require('./routes/tipoInventario'));
app.use('/api/nuevos-campos', require('./routes/nuevosCampos'));
app.use('/api/archivos', require('./routes/archivos'));

// Arrancar la app
app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})