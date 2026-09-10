class TarefaController {
  constructor({
    criarTarefaService,
    listarTarefasService,
    atualizarTarefaService,
    excluirTarefaService,
    iniciarTarefaService,
    concluirTarefaService,
  }) {
    this.criarTarefaService = criarTarefaService;
    this.listarTarefasService = listarTarefasService;
    this.atualizarTarefaService = atualizarTarefaService;
    this.excluirTarefaService = excluirTarefaService;
    this.iniciarTarefaService = iniciarTarefaService;
    this.concluirTarefaService = concluirTarefaService;
  }

  criar = async (req, res) => {
    try {
      const { titulo, usuarioId } = req.body;
      const tarefa = await this.criarTarefaService.executar({ titulo, usuarioId });
      return res.status(201).json(tarefa);
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  };

  listar = async (_req, res) => {
    const tarefas = await this.listarTarefasService.executar();
    return res.status(200).json(tarefas);
  };

  atualizar = async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo } = req.body;
      const tarefa = await this.atualizarTarefaService.executar(id, { titulo });
      return res.status(200).json(tarefa);
    } catch (erro) {
      const status = /não encontrada/.test(erro.message) ? 404 : 400;
      return res.status(status).json({ erro: erro.message });
    }
  };

  excluir = async (req, res) => {
    try {
      const { id } = req.params;
      await this.excluirTarefaService.executar(id);
      return res.status(204).send();
    } catch (erro) {
      const status = /não encontrada/.test(erro.message) ? 404 : 400;
      return res.status(status).json({ erro: erro.message });
    }
  };

  iniciar = async (req, res) => {
    try {
      const { id } = req.params;
      const tarefa = await this.iniciarTarefaService.executar(id);
      return res.status(200).json(tarefa);
    } catch (erro) {
      const status = /não encontrada/.test(erro.message) ? 404 : 422;
      return res.status(status).json({ erro: erro.message });
    }
  };

  concluir = async (req, res) => {
    try {
      const { id } = req.params;
      const tarefa = await this.concluirTarefaService.executar(id);
      return res.status(200).json(tarefa);
    } catch (erro) {
      const status = /não encontrada/.test(erro.message) ? 404 : 422;
      return res.status(status).json({ erro: erro.message });
    }
  };
}

module.exports = TarefaController;
