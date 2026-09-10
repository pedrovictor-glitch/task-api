# Task API — Clean Architecture

API RESTful de tarefas construída com Node.js, Express e Sequelize (SQLite), seguindo os
princípios da Clean Architecture (Regra de Dependência: as camadas internas não conhecem as
externas).

## Estrutura de pastas

```
src/
├── domain/entities/          # Regras de negócio puras (sem framework, sem ORM)
│   └── Tarefa.js
├── application/services/     # Casos de uso (1 classe por ação, SRP)
│   ├── CriarUsuarioService.js
│   ├── CriarTarefaService.js
│   ├── ListarTarefasService.js
│   ├── AtualizarTarefaService.js
│   ├── ExcluirTarefaService.js
│   ├── IniciarTarefaService.js   # Regra: máx. 5 tarefas EM_ANDAMENTO por usuário
│   └── ConcluirTarefaService.js
├── infrastructure/
│   ├── database/
│   │   ├── connection.js         # Configuração do Sequelize (SQLite)
│   │   └── models/                # UsuarioModel, TarefaModel (com FK)
│   └── repositories/             # Escondem o Sequelize do resto da app
│       ├── UsuarioRepository.js
│       └── TarefaRepository.js
├── interfaces/
│   ├── controllers/              # Ponte HTTP ↔ casos de uso
│   └── routes/
├── app.js                        # Monta o Express e faz a injeção de dependência manual
└── server.js                     # Sincroniza o banco e sobe o servidor
tests/
├── tarefa.entity.test.js         # Teste unitário puro da entidade de domínio
└── tarefas.test.js               # Testes de integração (Supertest) — roteiro da Fase 7
```

## Como rodar

```bash
npm install
npm run dev      # sobe com nodemon em http://localhost:3000
# ou
npm start
```

## Testes

```bash
npm test
```

Os testes usam SQLite em memória (`NODE_ENV=test`) e cobrem, na ordem:

1. Criação de um usuário válido.
2. Criação de tarefas vinculadas a esse usuário.
3. Listagem geral das tarefas.
4. Regra de negócio: início de até 5 tarefas simultâneas e bloqueio da 6ª com erro `422`.
5. Atualização (`PUT`) e exclusão segura (`DELETE`) de uma tarefa.

## Endpoints

| Método | Rota                     | Descrição                                   |
|--------|--------------------------|----------------------------------------------|
| POST   | `/usuarios`              | Cria um usuário                               |
| POST   | `/tarefas`                | Cria uma tarefa (`titulo`, `usuarioId`)       |
| GET    | `/tarefas`                | Lista todas as tarefas                        |
| PUT    | `/tarefas/:id`             | Atualiza o título de uma tarefa               |
| DELETE | `/tarefas/:id`             | Remove uma tarefa                             |
| POST   | `/tarefas/:id/iniciar`     | Inicia a tarefa (bloqueia acima de 5/usuário) |
| POST   | `/tarefas/:id/concluir`    | Conclui uma tarefa em andamento               |

## Modelagem de dados

- **Usuario**: `id`, `nome`, `email` (único).
- **Tarefa**: `id`, `titulo`, `status` (padrão `PENDENTE`), `usuarioId` (FK).
