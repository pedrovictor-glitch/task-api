const TarefaModel = require('../database/models/TarefaModel');
const { Tarefa } = require('../../domain/entities/Tarefa');

class TarefaRepository {
  _paraEntidade(registro) {
    if (!registro) return null;
    const dados = registro.toJSON ? registro.toJSON() : registro;
    const tarefa = new Tarefa({
      id: dados.id,
      titulo: dados.titulo,
      status: dados.status,
      usuarioId: dados.usuarioId,
    });
    return tarefa;
  }

  // ----- CRUD -----

  async criar({ titulo, status, usuarioId }) {
    const registro = await TarefaModel.create({ titulo, status, usuarioId });
    return this._paraEntidade(registro);
  }

  async buscarPorId(id) {
    const registro = await TarefaModel.findByPk(id);
    return this._paraEntidade(registro);
  }

  async listarTodas() {
    const registros = await TarefaModel.findAll({ order: [['id', 'ASC']] });
    return registros.map((r) => this._paraEntidade(r));
  }

  async atualizar(id, dados) {
    await TarefaModel.update(dados, { where: { id } });
    return this.buscarPorId(id);
  }

  async excluir(id) {
    const linhasApagadas = await TarefaModel.destroy({ where: { id } });
    return linhasApagadas > 0;
  }

  // ----- Buscas específicas -----

  async listarPorUsuario(usuarioId) {
    const registros = await TarefaModel.findAll({ where: { usuarioId } });
    return registros.map((r) => this._paraEntidade(r));
  }

  async contarPorUsuarioEStatus(usuarioId, status) {
    return TarefaModel.count({ where: { usuarioId, status } });
  }

  /** Persiste o estado atual de uma entidade Tarefa já modificada em memória. */
  async salvar(tarefa) {
    await TarefaModel.update(
      { titulo: tarefa.titulo, status: tarefa.status },
      { where: { id: tarefa.id } },
    );
    return this.buscarPorId(tarefa.id);
  }
}

module.exports = TarefaRepository;
