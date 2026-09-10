const express = require('express');

// Infraestrutura
const UsuarioRepository = require('./infrastructure/repositories/UsuarioRepository');
const TarefaRepository = require('./infrastructure/repositories/TarefaRepository');

// Casos de uso
const CriarUsuarioService = require('./application/services/CriarUsuarioService');
const CriarTarefaService = require('./application/services/CriarTarefaService');
const ListarTarefasService = require('./application/services/ListarTarefasService');
const AtualizarTarefaService = require('./application/services/AtualizarTarefaService');
const ExcluirTarefaService = require('./application/services/ExcluirTarefaService');
const IniciarTarefaService = require('./application/services/IniciarTarefaService');
const ConcluirTarefaService = require('./application/services/ConcluirTarefaService');

// Interfaces
const UsuarioController = require('./interfaces/controllers/UsuarioController');
const TarefaController = require('./interfaces/controllers/TarefaController');
const criarRotasDeUsuario = require('./interfaces/routes/usuarioRoutes');
const criarRotasDeTarefa = require('./interfaces/routes/tarefaRoutes');

// ----- Injeção de dependência manual -----

// Repositórios
const usuarioRepository = new UsuarioRepository();
const tarefaRepository = new TarefaRepository();

// Services de Usuário
const criarUsuarioService = new CriarUsuarioService(usuarioRepository);

// Services de Tarefa
const criarTarefaService = new CriarTarefaService(tarefaRepository);
const listarTarefasService = new ListarTarefasService(tarefaRepository);
const atualizarTarefaService = new AtualizarTarefaService(tarefaRepository);
const excluirTarefaService = new ExcluirTarefaService(tarefaRepository);
const iniciarTarefaService = new IniciarTarefaService(tarefaRepository);
const concluirTarefaService = new ConcluirTarefaService(tarefaRepository);

// Controllers
const usuarioController = new UsuarioController(criarUsuarioService);
const tarefaController = new TarefaController({
  criarTarefaService,
  listarTarefasService,
  atualizarTarefaService,
  excluirTarefaService,
  iniciarTarefaService,
  concluirTarefaService,
});

// ----- Express -----

const app = express();
app.use(express.json());

app.use(criarRotasDeUsuario(usuarioController));
app.use(criarRotasDeTarefa(tarefaController));

app.get('/', (_req, res) => {
  res.json({ status: 'ok', mensagem: 'Task API rodando.' });
});

// Handler simples de erros não tratados
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ erro: 'Erro interno do servidor.' });
});

module.exports = app;
