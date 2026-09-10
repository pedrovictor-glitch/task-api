const { STATUS } = require('../../domain/entities/Tarefa');

const LIMITE_TAREFAS_EM_ANDAMENTO = 5;

class IniciarTarefaService {
  constructor(tarefaRepository) {
    this.tarefaRepository = tarefaRepository;
  }

  async executar(id) {
    const tarefa = await this.tarefaRepository.buscarPorId(id);
    if (!tarefa) {
      throw new Error(`Tarefa com id ${id} não encontrada.`);
    }

    const quantidadeEmAndamento = await this.tarefaRepository.contarPorUsuarioEStatus(
      tarefa.usuarioId,
      STATUS.EM_ANDAMENTO,
    );

    if (quantidadeEmAndamento >= LIMITE_TAREFAS_EM_ANDAMENTO) {
      throw new Error(
        `Limite de ${LIMITE_TAREFAS_EM_ANDAMENTO} tarefas em andamento atingido para este usuário.`,
      );
    }

    // Regra de transição de estado fica encapsulada na entidade.
    tarefa.iniciar();
    const tarefaAtualizada = await this.tarefaRepository.salvar(tarefa);
    return tarefaAtualizada.toJSON();
  }
}

module.exports = IniciarTarefaService;
