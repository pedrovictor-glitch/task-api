class ExcluirTarefaService {
  constructor(tarefaRepository) {
    this.tarefaRepository = tarefaRepository;
  }

  async executar(id) {
    const tarefaExistente = await this.tarefaRepository.buscarPorId(id);
    if (!tarefaExistente) {
      throw new Error(`Tarefa com id ${id} não encontrada.`);
    }

    await this.tarefaRepository.excluir(id);
    return true;
  }
}

module.exports = ExcluirTarefaService;
