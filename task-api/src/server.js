const app = require('./app');
const sequelize = require('./infrastructure/database/connection');

// Garante que os modelos sejam registrados no Sequelize antes do sync.
require('./infrastructure/database/models/UsuarioModel');
require('./infrastructure/database/models/TarefaModel');

const PORTA = process.env.PORT || 3000;

async function iniciar() {
  try {
    await sequelize.sync();
    console.log('Banco de dados sincronizado com sucesso.');

    app.listen(PORTA, () => {
      console.log(`Task API rodando em http://localhost:${PORTA}`);
    });
  } catch (erro) {
    console.error('Falha ao iniciar a aplicação:', erro);
    process.exit(1);
  }
}

iniciar();
