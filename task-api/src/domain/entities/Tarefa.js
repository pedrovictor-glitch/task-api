/**
 * Entidade de domínio Tarefa.
 * Objeto puro de negócio: não importa nada de frameworks, ORM ou HTTP.
 */

const STATUS = Object.freeze({
  PENDENTE: 'PENDENTE',
  EM_ANDAMENTO: 'EM_ANDAMENTO',
  CONCLUIDA: 'CONCLUIDA',
});

class Tarefa {
  /**
   * @param {Object} params
   * @param {number|null} params.id
   * @param {string} params.titulo
   * @param {string} [params.status]
   * @param {number} params.usuarioId
   */
  constructor({ id = null, titulo, status = STATUS.PENDENTE, usuarioId }) {
    if (!titulo || typeof titulo !== 'string' || titulo.trim().length === 0) {
      throw new Error('O título da tarefa é obrigatório.');
    }

    if (!usuarioId) {
      throw new Error('A tarefa precisa estar vinculada a um usuário.');
    }

    this.id = id;
    this.titulo = titulo.trim();
    this.status = status;
    this.usuarioId = usuarioId;
  }

  /**
   * Transiciona a tarefa de PENDENTE para EM_ANDAMENTO.
   */
  iniciar() {
    if (this.status !== STATUS.PENDENTE) {
      throw new Error(
        `Não é possível iniciar uma tarefa com status "${this.status}". ` +
          `Apenas tarefas "${STATUS.PENDENTE}" podem ser iniciadas.`,
      );
    }
    this.status = STATUS.EM_ANDAMENTO;
  }

  /**
   * Transiciona a tarefa de EM_ANDAMENTO para CONCLUIDA.
   */
  concluir() {
    if (this.status !== STATUS.EM_ANDAMENTO) {
      throw new Error(
        `Não é possível concluir uma tarefa com status "${this.status}". ` +
          `Apenas tarefas "${STATUS.EM_ANDAMENTO}" podem ser concluídas.`,
      );
    }
    this.status = STATUS.CONCLUIDA;
  }

  atualizarTitulo(novoTitulo) {
    if (!novoTitulo || typeof novoTitulo !== 'string' || novoTitulo.trim().length === 0) {
      throw new Error('O novo título da tarefa é obrigatório.');
    }
    this.titulo = novoTitulo.trim();
  }

  toJSON() {
    return {
      id: this.id,
      titulo: this.titulo,
      status: this.status,
      usuarioId: this.usuarioId,
    };
  }
}

module.exports = { Tarefa, STATUS };
