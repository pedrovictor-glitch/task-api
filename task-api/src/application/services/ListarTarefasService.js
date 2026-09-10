class ListarTarefasService {
  constructor(tarefaRepository) {
    this.tarefaRepository = tarefaRepository;
  }

  async executar() {
    const tarefas = await this.tarefaRepository.listarTodas();
    return tarefas.map((t) => t.toJSON());
  }
}

module.exports = ListarTarefasService;
