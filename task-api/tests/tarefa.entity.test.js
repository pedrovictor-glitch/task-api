const { Tarefa, STATUS } = require('../src/domain/entities/Tarefa');

describe('Entidade de domínio Tarefa', () => {
  test('lança erro se o título não for informado', () => {
    expect(() => new Tarefa({ usuarioId: 1 })).toThrow('título');
  });

  test('lança erro se o usuarioId não for informado', () => {
    expect(() => new Tarefa({ titulo: 'Estudar' })).toThrow('usuário');
  });

  test('inicia com status PENDENTE por padrão', () => {
    const tarefa = new Tarefa({ titulo: 'Estudar', usuarioId: 1 });
    expect(tarefa.status).toBe(STATUS.PENDENTE);
  });

  test('iniciar() transiciona de PENDENTE para EM_ANDAMENTO', () => {
    const tarefa = new Tarefa({ titulo: 'Estudar', usuarioId: 1 });
    tarefa.iniciar();
    expect(tarefa.status).toBe(STATUS.EM_ANDAMENTO);
  });

  test('iniciar() lança erro se a tarefa não estiver PENDENTE', () => {
    const tarefa = new Tarefa({ titulo: 'Estudar', usuarioId: 1, status: STATUS.CONCLUIDA });
    expect(() => tarefa.iniciar()).toThrow();
  });

  test('concluir() transiciona de EM_ANDAMENTO para CONCLUIDA', () => {
    const tarefa = new Tarefa({ titulo: 'Estudar', usuarioId: 1, status: STATUS.EM_ANDAMENTO });
    tarefa.concluir();
    expect(tarefa.status).toBe(STATUS.CONCLUIDA);
  });

  test('concluir() lança erro se a tarefa não estiver EM_ANDAMENTO', () => {
    const tarefa = new Tarefa({ titulo: 'Estudar', usuarioId: 1 });
    expect(() => tarefa.concluir()).toThrow();
  });
});
