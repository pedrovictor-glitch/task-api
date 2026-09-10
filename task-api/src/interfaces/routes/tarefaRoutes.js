const { Router } = require('express');

function criarRotasDeTarefa(tarefaController) {
  const router = Router();

  router.post('/tarefas', tarefaController.criar);
  router.get('/tarefas', tarefaController.listar);
  router.put('/tarefas/:id', tarefaController.atualizar);
  router.delete('/tarefas/:id', tarefaController.excluir);
  router.post('/tarefas/:id/iniciar', tarefaController.iniciar);
  router.post('/tarefas/:id/concluir', tarefaController.concluir);

  return router;
}

module.exports = criarRotasDeTarefa;
