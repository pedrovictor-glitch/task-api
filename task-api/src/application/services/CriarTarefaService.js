const { Tarefa } = require('../../domain/entities/Tarefa');

class CriarTarefaService {
  constructor(tarefaRepository) {
    this.tarefaRepository = tarefaRepository;
  }

  async executar({ titulo, usuarioId }) {
    // A validação de obrigatoriedade do título acontece na própria entidade.
    const tarefa = new Tarefa({ titulo, usuarioId });
    const tarefaCriada = await this.tarefaRepository.criar(tarefa.toJSON());
    return tarefaCriada.toJSON();
  }
}

module.exports = CriarTarefaService;
