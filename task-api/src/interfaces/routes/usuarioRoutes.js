const { Router } = require('express');

function criarRotasDeUsuario(usuarioController) {
  const router = Router();

  router.post('/usuarios', usuarioController.criar);

  return router;
}

module.exports = criarRotasDeUsuario;
