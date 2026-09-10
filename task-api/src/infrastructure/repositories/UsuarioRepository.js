const UsuarioModel = require('../database/models/UsuarioModel');

class UsuarioRepository {
  async criar({ nome, email }) {
    const usuario = await UsuarioModel.create({ nome, email });
    return usuario.toJSON();
  }

  async buscarPorId(id) {
    const usuario = await UsuarioModel.findByPk(id);
    return usuario ? usuario.toJSON() : null;
  }

  async listarTodos() {
    const usuarios = await UsuarioModel.findAll();
    return usuarios.map((u) => u.toJSON());
  }
}

module.exports = UsuarioRepository;
