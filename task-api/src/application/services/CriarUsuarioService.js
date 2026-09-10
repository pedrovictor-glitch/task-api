class CriarUsuarioService {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async executar({ nome, email }) {
    if (!nome || !email) {
      throw new Error('Nome e e-mail são obrigatórios para criar um usuário.');
    }
    return this.usuarioRepository.criar({ nome, email });
  }
}

module.exports = CriarUsuarioService;
