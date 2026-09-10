class AtualizarTarefaService {
  constructor(tarefaRepository) {
    this.tarefaRepository = tarefaRepository;
  }

  async executar(id, { titulo }) {
    const tarefaExistente = await this.tarefaRepository.buscarPorId(id);
    if (!tarefaExistente) {
      throw new Error(`Tarefa com id ${id} não encontrada.`);
    }

    tarefaExistente.atualizarTitulo(titulo);
    const tarefaAtualizada = await this.tarefaRepository.salvar(tarefaExistente);
    return tarefaAtualizada.toJSON();
  }
}

module.exports = AtualizarTarefaService;
