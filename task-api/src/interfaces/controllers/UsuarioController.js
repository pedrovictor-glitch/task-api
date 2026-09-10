class UsuarioController {
  constructor(criarUsuarioService) {
    this.criarUsuarioService = criarUsuarioService;
  }

  criar = async (req, res) => {
    try {
      const { nome, email } = req.body;
      const usuario = await this.criarUsuarioService.executar({ nome, email });
      return res.status(201).json(usuario);
    } catch (erro) {
      return res.status(400).json({ erro: erro.message });
    }
  };
}

module.exports = UsuarioController;
