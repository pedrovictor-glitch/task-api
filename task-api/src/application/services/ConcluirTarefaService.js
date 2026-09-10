class ConcluirTarefaService {
  constructor(tarefaRepository) {
    this.tarefaRepository = tarefaRepository;
  }

  async executar(id) {
    const tarefa = await this.tarefaRepository.buscarPorId(id);
    if (!tarefa) {
      throw new Error(`Tarefa com id ${id} não encontrada.`);
    }

    tarefa.concluir();
    const tarefaAtualizada = await this.tarefaRepository.salvar(tarefa);
    return tarefaAtualizada.toJSON();
  }
}

module.exports = ConcluirTarefaService;
