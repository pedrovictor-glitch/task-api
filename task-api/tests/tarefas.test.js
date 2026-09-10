process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/infrastructure/database/connection');

// Garante que os modelos estejam registrados antes do sync.
require('../src/infrastructure/database/models/UsuarioModel');
require('../src/infrastructure/database/models/TarefaModel');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Roteiro de validação - Fase 7', () => {
  let usuarioId;
  let primeiraTarefaId;
  const idsDasTarefas = [];

  test('1. POST /usuarios - cria um usuário válido', async () => {
    const resposta = await request(app)
      .post('/usuarios')
      .send({ nome: 'Ana Souza', email: 'ana.souza@example.com' });

    expect(resposta.status).toBe(201);
    expect(resposta.body).toHaveProperty('id');
    expect(resposta.body.nome).toBe('Ana Souza');

    usuarioId = resposta.body.id;
  });

  test('2. POST /tarefas - cria seis tarefas vinculadas ao usuário', async () => {
    for (let i = 1; i <= 6; i += 1) {
      const resposta = await request(app)
        .post('/tarefas')
        .send({ titulo: `Tarefa ${i}`, usuarioId });

      expect(resposta.status).toBe(201);
      expect(resposta.body.status).toBe('PENDENTE');
      expect(resposta.body.usuarioId).toBe(usuarioId);

      idsDasTarefas.push(resposta.body.id);
    }

    primeiraTarefaId = idsDasTarefas[0];
    expect(idsDasTarefas).toHaveLength(6);
  });

  test('3. GET /tarefas - lista todas as tarefas cadastradas', async () => {
    const resposta = await request(app).get('/tarefas');

    expect(resposta.status).toBe(200);
    expect(Array.isArray(resposta.body)).toBe(true);
    expect(resposta.body.length).toBeGreaterThanOrEqual(6);
  });

  test('4. POST /tarefas/:id/iniciar - inicia até o limite e bloqueia a sexta', async () => {
    // Inicia as 5 primeiras tarefas com sucesso.
    for (let i = 0; i < 5; i += 1) {
      const resposta = await request(app).post(`/tarefas/${idsDasTarefas[i]}/iniciar`);

      expect(resposta.status).toBe(200);
      expect(resposta.body.status).toBe('EM_ANDAMENTO');
    }

    // A sexta tarefa deve ser bloqueada pela regra de limite.
    const respostaBloqueada = await request(app).post(`/tarefas/${idsDasTarefas[5]}/iniciar`);

    expect(respostaBloqueada.status).toBe(422);
    expect(respostaBloqueada.body).toHaveProperty('erro');
    expect(respostaBloqueada.body.erro).toMatch(/limite/i);
  });

  test('5. PUT /tarefas/:id - altera o título de uma tarefa', async () => {
    const resposta = await request(app)
      .put(`/tarefas/${primeiraTarefaId}`)
      .send({ titulo: 'Tarefa 1 atualizada' });

    expect(resposta.status).toBe(200);
    expect(resposta.body.titulo).toBe('Tarefa 1 atualizada');
  });

  test('5. DELETE /tarefas/:id - apaga a tarefa do banco de forma segura', async () => {
    const respostaExclusao = await request(app).delete(`/tarefas/${primeiraTarefaId}`);
    expect(respostaExclusao.status).toBe(204);

    const respostaBusca = await request(app).get('/tarefas');
    const idsRestantes = respostaBusca.body.map((t) => t.id);
    expect(idsRestantes).not.toContain(primeiraTarefaId);
  });

  test('Excluir/atualizar tarefa inexistente retorna 404', async () => {
    const respostaAtualizar = await request(app)
      .put('/tarefas/999999')
      .send({ titulo: 'Não existe' });
    expect(respostaAtualizar.status).toBe(404);

    const respostaExcluir = await request(app).delete('/tarefas/999999');
    expect(respostaExcluir.status).toBe(404);
  });
});
