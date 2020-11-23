const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');
const auth = require("../middleware/auth");

router.post('/', auth,
    [
        check('nombre', 'El Nombre es Obligatorio').not().isEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check('perfil', 'El perfil es Obligatorio').not().isEmpty(),
        check('dependencia', 'La dependencia es Obligatorio').not().isEmpty(),
        check('password', 'El password debe ser de al menos 6 caracteres').isLength({min: 6}),
    ],
    usuarioController.nuevoUsuario
);

router.get('/',auth, usuarioController.traerUsuario);

module.exports = router;